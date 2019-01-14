Page({
  data: {
    mode: "scaleToFill",
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    TopIndex: 0,
    showView1: true,
    showView2: false,
    lidaoshow1:true,
    lidaoshow2:false
   
  },
  onLoad: function (options) {
    var array = this.data.arr
    for (let i = 1; i < 4; i++) {
      // array.push("../../images/competition/" + i + ".jpg")
      // array.push("http://alpha.bnuz.edu.cn:8088/test/pic/00"+i+".jpg")
      // array.push("../../images/competition/a" + i + ".jpg")
      array.push("../../images/tzimg/slide" + i + ".jpg")
      }
    this.setData({ arr: array })
   
    showView1: (options.showView1 == "true" ? true : false)
    showView2: (options.showView2 == "true" ? true : false)
   

    var that = this
    this.setData({
      requestUrl: 'http://itcmsg.bnuz.edu.cn:8090/test/XCXSP_list',
      n: 1// 设置初始的显示页数，接下来作为PN参数
    })
    var RequestUrl = this.data.requestUrl
    console.log(RequestUrl),
      //请求服务器（初始界面的显示）
      wx.request({
        url: RequestUrl,
        data: {},
        msethod: 'GET',
        header:
          {
            'content-type': 'application/json'
          },
        success: function (res) {
          that.setData({
            //请求到的数据赋给list_data变量，追加时要用到
            list_data: res.data,
          });

          console.log(res.data);

        },
        fail: function (res) {
          console.log('fail')
        }
      })
  },

  //触底时调用的函数（小程序已经封装好不用调用）
  onReachBottom: function (event) {
    // onScrollLower: function (event) 也可以但是要设置高度还有显式调用
    wx.showNavigationBarLoading()//设置导航栏的加载动画
    var that = this
    that.data.n = that.data.n + 1//触发事件后n+1
    var n
    n = that.data.n,
      //显示在控制台观察当前到第几页
      console.log("more lists"),
      console.log(that.data.requestUrl + '?PN=' + n)
    //去服务器请求新的页面
    wx.request({
      url: that.data.requestUrl + '?PN=' + n,
      data: {},
      msethod: 'GET',
      header:
        {
          'content-type': 'application/json'
        },

      success: function (res) {
        /**concat方法表示连接数组
        将原来的list_data连接上新的数据       **/
        var content = that.data.list_data.concat(res.data)
        that.setData({
          //重新给list_data赋值
          list_data: content

        });
        //数据请求成功后加载动画隐藏
        wx.hideNavigationBarLoading()
        console.log(res.data);

      },

      fail: function (res) {
        console.log('fail')
      }
    })

  },
  onReady: function () {

  },
  onTouch: function (event) {
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../comXQ/comXQ?id=' + event.currentTarget.id,
    })
  },
  changstyle: function (e) {
    let index = e.currentTarget.dataset.index;           /*定义index等于当前页面的dataset.index*/
    this.setData({
      TopIndex: index,  /*定义当前数据的TopIndex等于  index 等于dataset.index*/
    })
    console.log(TopIndex);
  },
  xq: function () {
    wx.navigateTo({
      url: '../comXQ/comXQ',
    })
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
    if (ID == "lidao1") {
      that.setData({
        lidaoshow1: true,
        lidaoshow2: false,

      })
    }
    if (ID == "lidao2") {
      that.setData({
        lidaoshow1: false,
        lidaoshow2: true,

      })
    }

  },

})
