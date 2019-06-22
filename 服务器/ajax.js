/**
 * get请求
 * @param {请求地址} url 
 * @param {请求参数} data
 * @param {回调函数} callback 
 */
function get (url, data, callback) {
    // 创建异步对象
    let xhr = new XMLHttpRequest()
    // 判断是否有参
    if(data) {
        url += '?';
        for (let key in data) {
            url += key + '=' + data[key] + '&'
        }
        url = url.slice(0, -1)
    }
    // 设置请求的url参数，参1：请求类型，参2：请求地址
    xhr.open('get', url)
    // 发送请求
    xhr.send()
    // 注册事件，监听请求状态
    xhr.onreadystartchange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            // 返回响应的内容 
            callback(xhr.responseText)
        }
    }
}

get('http://localhost:3000/','', function (data) {
    console.log(data)
})

/**
 * post 请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 */
function post (url, data, callback) {
  // 创建异步对象
  let xhr = new XMLHttpRequest()
  // 设置请求的url参数，参1：请求类型，参2：请求地址
  xhr.open('post', url)
  // 设置请求头部
  xhr.setRequsetHeader('Content-type', "application/x-www-form-urlencoded")
  let paramStr = ''
  if(data) {
      for (let key in data) {
          paramStr += key + '=' + data[key] + '&'
      }
      paramStr = paramStr.slice(0, -1)
  }
  // 发送请求
  xhr.send(paramStr)
  // 监听请求事件
  xhr.onreadystartchange = function () {
      if(xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseText)
      }
  }
}
