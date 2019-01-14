
var app = getApp()
Page({
  data: {
    model: '',
    px: '',
    width: '',
    height: '',
    lan: '',
    version: ''
  },
  onLoad: function (e) {
    var that = this
    wx.setNavigationBarTitle({
      title: "个人中心"
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          model: res.model,
          px: res.pixelRatio,
          width: res.windowWidth,
          height: res.windowHeight,
          lan: res.language,
          version: res.version
        })
      }
    });
  },

  showxh: function () {
    wx.showModal({
      title: '手机型号',
      content: this.data.model,
      hidden: "{{hidden}}",
      bindconfirm: "confirm",
      nocancel: true
    });
  },
  showPx: function () {
    wx.showModal({
      title: '设备像素比',
      content: String(this.data.px)
    });
  },
  showWidth: function () {
    wx.showModal({
      title: '窗口宽度',
      content: String(this.data.width)
    });
  },
  showHeight: function () {
    wx.showModal({
      title: '窗口高度',
      content: String(this.data.height)
    });
  },
  showYu: function () {
    wx.showModal({
      title: '语言',
      content: this.data.lan
    });
  },
  showAbout: function () {
    wx.showModal({
      title: '微信版本号',
      content: this.data.version
    });
  }
})
