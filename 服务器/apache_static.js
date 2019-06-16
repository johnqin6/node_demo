var http = require('http')
var fs = require('fs')
var template = require('art-template')
var path = require('path')
const util = require('./www/utils/util');

var server = http.createServer()

var wwwDir = __dirname + '/www';

server.on('request', function (req, res) {
  var url = req.url
  // 1. 如果是文件，直接读取响应
  // 2. 如果是目录，读取渲染目录列表
  // 3. 如果目录并且有该目录中有 index.html 则直接渲染目录中的 index.html

  var urlPath = path.join(wwwDir, url)

  fs.stat(urlPath, function (err, stats) {
    if (err) {
      return res.end('404 Not Found.')
    }
    if (stats.isFile()) {
      fs.readFile(urlPath, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (stats.isDirectory()) {
      var templateStr = fs.readFileSync('./www/template.html').toString()
      var files = fs.readdirSync(urlPath)
      var tempList = [];
      files.forEach(function (item) {
        let dpath = path.join(wwwDir,item);
        let stat = fs.statSync(dpath);
        var type = 'file',
            name = item,
            size = stat.size,
            updateTime = util.formatime(stat.mtime,'/');
            if(stat.isFile(item)){
                type = 'file';
            }else {
                type = 'dir';
            }
            tempList.push({
                type: type,
                name: name,
                size: size,
                updateTime: updateTime
            });
      })
      var htmlStr = template.render(templateStr, {
        tempList: tempList
      })
      console.log(files)
      res.end(htmlStr)
    }
  })
})

server.listen(3001, function () {
  console.log('running...')
})
