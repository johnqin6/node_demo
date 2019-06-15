const http = require('http');
const path = require('path');
const fs = require('fs');
const util = require('./www/utils/util')

//创建一个服务器实例
const server = http.createServer();

//监听请求
server.on('request', (req, res) => {
    let url = req.url;
    //获取当前文件路径 
    let pathname = path.resolve(__dirname);
    //拼接路径
    let filePath = path.join(pathname,'/www/', url);
    let netPath = path.join(pathname, '/www/');
    if(url === '/') {
        replaceIndexData(pathname, filePath, netPath, res);
    }else{
        fs.readFile(filePath, (err, data) => {
            if(err) {
                res.end('404');
            }
            if(url === '/favicon.ico'){
                res.end();
            }else{
                let stat = fs.statSync(filePath);
                let nextPath = path.join(netPath,url);
                if(stat.isDirectory(filePath)){
                    replaceIndexData(pathname, filePath, nextPath, res)
                }else{
                    res.end(data);
                }
            }
            
        });
    }
});

//绑定端口，开启服务器
server.listen(3000, () => {
    console.log('服务器开启，访问http://localhost:3000');
});

/**
 * 替换index.html的数据
 * @param {*} pathname 默认路径
 * @param {*} filePath 文件路径
 * @param {*} cpathname 当前路径
 * @param {*} res 响应对象
 */
function replaceIndexData(pathname, filePath, cpathname, res){
    console.log(pathname,11);
    let indexPath = path.join(pathname, '/www/index.html');
    //读取index.html文件
    fs.readFile(indexPath, (err, data) => {
        if(err) {
            res.end('文件不存在');
        }
        //读取www文件夹下的目录和文件
        getDir(cpathname, filePath, res, data);
    });
}
/**
 * 读取www文件夹
 * @param {*} cpathname 当前路径
 * @param {*} filePath 文件路径
 * @param {*} res 响应对象
 * @param {*} data 文件数据
 */
function getDir(cpathname, filePath, res, data) {
    //读取www文件夹下的目录和文件
    fs.readdir(filePath, (err, files) => {
        if(err) {
            return res.end(err);
        }
        //生成替换的内容
        let content = '';
        files.forEach(item => {
            //获取文件或目录的信息
            let dfPath = path.join(cpathname, item);
            let stat = fs.statSync(dfPath);
            var type = 'file',
                name = item,
                size = stat.size,
                updateTime = util.formatime(stat.mtime,'/');
            //判断是否是文件
            if(stat.isFile(item)){
                type = 'file';
            }else{
                type = 'dir';
            }
            content += `
                <li class="dir-item ${type}">
                    <a href="${name}" class="info">
                        <span>${name}</span>
                    </a>
                    <span class="info">${size}</span>
                    <span class="info">${updateTime}</span>
                </li>
            `;
        });
        console.log(content);
        //将二进制转换为字符串
        data = data.toString();
        //匹配替换，将文件夹数据替换进入
        data = data.replace('^_^', content);
        res.end(data);
    });
}