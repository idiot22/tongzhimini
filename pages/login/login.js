// pages/formSubmit/formSubmit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tcshow: 'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  formSubmit: function (e) {
    var that = this;
    var loginName = e.detail.value.loginName;
    var passWord = e.detail.value.password;
    console.log(loginName)
    wx.request({
      url: 'http://itcmsg.bnuz.edu.cn:8090/test/login?log=' + loginName + '&pwd=' + passWord,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (loginName != "test" || passWord != "12345678") {
          that.setData({
            tcshow: 'block'
          })
        }
        else {
          wx.switchTab({
            url: '../competition/competition',
          })
        }
      },
      Error: function () {
        console.log("error")
      }
    })
  },
  tanchu: function (e) {
    this.setData({
      tcshow: 'none'
    }
    )
  }

})