let fs = require('fs');
let path = require('path');

let pathname = __dirname;

fs.readdir(pathname, (err, files) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(files);
    files.forEach(item => {
        //获取文件状态
        let stat = fs.statSync(item);
        console.log(stat.size);
        //判断是否是文件
        if(stat.isFile(item)){
            console.log('true');
        }else{
            console.log('false');
        }
    })
})