// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView1: true,
    showView2: false,
    da1:true,
    da2:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView1: (options.showView1 == "true" ? true : false)
    showView2: (options.showView2 == "true" ? true : false)
    da1: (options.showView1 == "true" ? true : false)
    da2: (options.showView2 == "true" ? true : false)
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
  onChangeShowState: function (e) {
    var that = this;
    var ID = e.target.id;
    console.log(ID);
    if (ID == "view") {
      that.setData({
        showView1: false,
        showView2: true,

      })
    }
    if (ID == "food") {
      that.setData({
        showView1: true,
        showView2: false,

      })
    }

  },
  onChangeShowState1: function (e) {
    var that = this;
    var ID = e.target.id;
    console.log(ID);
    if (ID == "dayi") {
      that.setData({
        da1: true,
        da2: false,

      })
    }
    if (ID == "daer") {
      that.setData({
        da1: false,
        da2: true,

      })
    }

  },
})