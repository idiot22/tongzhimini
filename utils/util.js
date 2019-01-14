function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function regexConfig() {
  var reg = {
    // userid: /^[A-Za-z0-9]+$/,  //邮箱正则验证
    userid: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,//邮箱正则验证
    phone: /^1(3|4|5|7|8)\d{9}$/,  //手机号正则验证
    cards: /^[\u4e00-\u9fa5]{2,4}$/, //姓名汉字正则验证
    passworda: /^[0-9a-zA-Z_-]{6,16}$///密码正则表达式
  }
  return reg;
}

module.exports = {
  formatTime: formatTime,
  regexConfig: regexConfig
}