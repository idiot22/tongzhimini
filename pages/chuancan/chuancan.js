var yema = 1;
Page({
  data: {
    page: 1,
    pageSize: 30,
    hasMoreData: true,
    contentlist: [],

  },

  onLoad: function (options) {
    var that = this
    // var yema = 1;
    wx.request({
      // url: 'http://alpha.bnuz.edu.cn:8088/test/XCXSP_list',
      url: 'http://itcmsg.bnuz.edu.cn:8090/test/XCXSP_list?PN=',
      data: {
        message: 'ty is the The most handsome man i',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      "enablePullDownRefresh": true,
      success: function (res) {
        that.setData({
          list_data: res.data,
        });
        console.log(res.data);
      },
      fail: function (res) {
        console.log(("fail to connect"))
      }
    })
  },

  abc: function (yema) {
    var that = this
    // var yema = 1;
    wx.request({
      // url: 'http://alpha.bnuz.edu.cn:8088/test/XCXSP_list',
      url: 'http://itcmsg.bnuz.edu.cn:8090/test/XCXSP_list?PN=' + yema,
      data: {
        message: 'ty is the The most handsome man i',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      "enablePullDownRefresh": true,
      success: function (res) {
        that.setData({
          list_data: res.data,
        });
        console.log(res.data);
      },
      fail: function (res) {
        console.log(("fail to connect"))
      }
    })
  },

  onclicka: function () {
    yema += 1;
    if (yema > 8) {
      yema = 8;
    }
    var mm = this.abc(yema);

  },
  onclickb: function () {
    yema -= 1;
    if (yema < 1) {
      yema = 1;
    }
    var mm = this.abc(yema);

  },




})

