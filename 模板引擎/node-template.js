var template = require('art-template');
var tplStr = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
</head>
<body>
    <p>大家好，我是{{ name }}。</p>
    <p>今年{{ age }} 岁</p>
    <p>我来自{{ province }}</p>
    <p>我喜欢  {{ each hobbies}} {{ $value }} {{ /each }}</p>
    <script>
        var tpl = {{title}}
    </script>
</body>
</html>
`  
var ret = template.render(tplStr, {
    name: 'Jack',
    age: 18,
    province: '河南省',
    hobbies: ['看书','看电影'],
    title: '浏览器中使用模板引擎'
});
console.log(ret); 

var fs = require('fs');

fs.readFile('./tpl.html', (err, data) => {
    if (err) {
        return console.log('读取文件失败');
    }
    //默认读取到的 data 是二进制数据
    var data = data.toString();
    var ret = template.render(data, {
        name: 'Jack',
        age: 18,
        province: '河南省',
        hobbies: ['看书','看电影']
    });
    console.log(ret);
})