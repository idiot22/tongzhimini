
var app = getApp()
Page({
  data: {
    model: '',
    px: '',
    width: '',
    height: '',
    lan: '',
    version: '',
    name: null
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
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '13631285434',
    })
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.name,
    })
  },
  callnumber: function (e) {
    // this.setData({
    //   name: e.detail.value
    // })
    this.data.name = e.detail.value
  }
})
