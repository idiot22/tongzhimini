var util = require("../../utils/util.js");
var myMessage = "";
var inputmima = '';
Page({
  data: {
    loginBtnTxt: "注册",
    myMessage: "",
    loginBtnBgBgColor: "#43a7b3",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputtureName: '',

    inputmima: '',
    inputmimb: '',
    inputPassword: '',
    avatarUrl: "../../images/form/birth.png",
    logIcon: "../../images/form/name.png",
    pwdIcon: "../../images/form/pass.png",
    confirm: "../../images/form/confirm.png",
    email: "../../images/form/email.png",
    ni: "../../images/form/ni.png",
    phone: "../../images/form/phone.png",
    work: "../../images/form/work.png",
    curNav: 1,
    curIndex: 0,
    showModal: false
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.clearStorageSync();   //清除缓存
  },
  formSubmit: function (e) {  //form提交内容 对登录信息做判断
    var param = e.detail.value;
    this.mysubmit(param);
    console.log("登录页提交", param)


  },
  mysubmit: function (param) {    //验证帐号密码输入信息完整度
    var flag = this.checkUserName(param) && this.checkPhone(param) && this.checktureName(param) && this.checkmima(param) && this.checkmimab(param) && this.checkwork(param);
    console.log('信息填写', flag)
    if (flag) {
      this.submit();
      this.checkUserInfo(param);
    }
  },
  setLoginData1: function () {  //登录态提示
    this.setData({
      loginBtnTxt: "注册中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "注册",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#43a7b3",
      btnLoading: !this.data.btnLoading
    });
  },
  checktureName: function (param) {
    var cards = util.regexConfig().cards; //真实姓名正则检验
    var inputtureName = param.namea.trim(); //输入信息确认
    var wellname = param.namea.length; //字符长度确认
    console.log(inputtureName, wellname)
    if (cards.test(inputtureName)) { //xxx.test是检测函数。
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确姓名'
      });
      return false;
    }
  },

  checkUserName: function (param) {
    var userid = util.regexConfig().userid; //姓名正则检验
    var inputUserName = param.username.trim(); //输入信息确认
    var wellname = param.username.length; //字符长度确认
    console.log(inputUserName, wellname)
    if (userid.test(inputUserName)) { //xxx.test是检测函数。
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确邮箱'
      });
      return false;
    }
  },
  checkPhone: function (param) {
    var phone = util.regexConfig().phone; //校验手机号
    var inputPassword = param.password.trim();  //核对输入手机号
    var password = param.password.length;
    if (phone.test(inputPassword) && password == 11) { //验证手机号格式及长度
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确电话号码'
      });
      return false;
    }
  },
  checkmima: function (param) {
    var passworda = util.regexConfig().passworda; //校验密码
    var inputmima = param.mima.trim();  //核对输入验证密码
    var mimal = param.mima.length;
    if (passworda.test(inputmima) && 6 <= mimal <= 16) { //验证手机号格式及长度
      this.setData({
        inputmima: param.mima.trim()
      })
      return true;

    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确密码'
      });
      return false;
    }
  },
  checkmimab: function (param) {

    var inputmimb = param.mimab.trim();  //核对输入验证密码
    console.log(param.mimab.trim())
    console.log(this.data.inputmima)
    if (inputmimb == this.data.inputmima) { //验证第二次输入密码是否和第一次一样
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '第二次输入密码有误！'
      });
      return false;
    }
  },
  checkwork: function (param) {

    var inputwork = param.work.trim(); //输入信息确认


    if (inputwork != null) { //xxx.test是检测函数。
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确单位地址'
      });
      return false;
    }
  },
  checkUserInfo: function (param) {
    var username = param.username.trim();
    var userturename = param.namea.trim();
    var password = param.password.trim();
    var mima = param.mima.trim();
    var work = param.work.trim();
    var goodname = param.username;   //提取帐号
    var goodnamea = param.namea; //提取真实姓名
    var goodmima = param.mima; //提取密码
    var goodpass = param.password;   //提取手机号
    var goodmimab = param.mimab;   //再次输入密码
    var that = this;
    if (username == goodname && password == goodpass && userturename == goodnamea && mima == goodmima && goodmima == goodmimab) { //无需存贮，只为验证
      setTimeout(function () {
        wx.showToast({
          title: '',
          icon: 'success',
          duration: 1500,
          // showModal: true
        });
        // that.setLoginData2();
        that.submit();
        that.redirectTo(param);
      }, 2000);
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '信息有误，请重新输入'
      });
      this.setLoginData2();
    }
  },
  redirectTo: function (param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param=' + param//参数只能是字符串形式，不能为json对象
      // url: '../tiaozhuan/tiaozhuan'//参数只能是字符串形式，不能为json对象
    })
  },
  onGotUserInfo: function (e) {  //授权过后不再调起
    // console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    var tip = e.detail.userInfo;
    if (tip == undefined) {
      wx.redirectTo({
        url: '../login/index',
      })
    } else {
      wx.setStorage({   //存储数据并准备发送给下一页使用
        key: "myMessage",
        data: e.detail.userInfo,
      })
    }
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    }),
    wx.navigateTo({
      url:'../comXQ/comXQ'
    })
  }

})
