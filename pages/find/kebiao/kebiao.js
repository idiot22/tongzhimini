//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#ff9e9e", "#ffdf62", "#61e7f0", "#c2b4f6", "#0A9A84", "#FF99CC", "#FF9966", "#99CCCC"],
    wlist: [
      { "xqj": 1, "skjc": 1, "skcd": 2, "kcmc": "高数@丽泽B301" },
      { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "大学英语@丽泽C401" },
      { "xqj": 2, "skjc": 3, "skcd": 2, "kcmc": "线性代数@木铎B301" },
      { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "c语言@木铎C404" },
      { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "Java@木铎C401" },
      { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "交互设计@木铎C601" },
      { "xqj": 4, "skjc": 5, "skcd": 3, "kcmc": "动画基础@木铎D503" },
      { "xqj": 5, "skjc": 8, "skcd": 2, "kcmc": "ps@木铎A203" },
      { "xqj": 5, "skjc": 3, "skcd": 2, "kcmc": "web@木铎A101" },






    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }
})