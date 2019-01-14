// pages/saoma/saoma.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "../../images/tzimg/000.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  scan() {
    var that = this
    wx.scanCode({
      success: function (res) {
        console.log("扫码结果")
        console.log(res)
        that.setData({
          img: res.result,
          item: res.result
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  showToast_message() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
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

  }
})