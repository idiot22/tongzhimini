// pages/comXQ/comXQ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)
    console.log(options)
    var that = this
    wx.request({
      // url:'https://alpha.bnuz.edu.cn/test/XCXSP_info',
      url: 'http://itcmsg.bnuz.edu.cn:8090/test/XCXSP_info',
      data: {
        message: 'ty is the The most handsome man in the ESTA',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          SPID: res.data.SPID,
          SPJG: res.data.SPJG,
          SPMC: res.data.SPMC,
          SPPIC: res.data.SPPIC,
          SPXQ: res.data.SPXQ,
        });
        console.log(res.data);

      },
      fail: function (res) {
        console.log("fail to connect");
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapname:function(){
    wx.switchTab({
      url: '../competition/competition',
    })
  },
  baoming:function(){
    wx.navigateTo({
      url: '../form/form',
    })
  }
})