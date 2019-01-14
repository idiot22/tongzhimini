var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0

var pixelRatio = wx.getSystemInfoSync().pixelRatio

// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0

var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0

// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageNum: '', //上传的图片id
    headImg: '', //头像上传
    ewmImg: '', //二维码上传
    imageFixed: false, //裁剪浮层
    // imageSrc: 'http://topmdrt-static.oss-cn-shenzhen.aliyuncs.com/images/testimg2.jpeg',
    imageSrc: '', //要裁剪的图片
    returnImage: '',
    isShowImg: false,
    // 初始化的宽高
    cropperInitW: windowWRPX,
    cropperInitH: windowWRPX,
    // 动态的宽高
    cropperW: windowWRPX,
    cropperH: windowWRPX,
    // 动态的left top值
    cropperL: 0,
    cropperT: 0,

    // 图片缩放值
    scaleP: 0,
    imageW: 0,
    imageH: 0,

    // 裁剪框 宽高
    cutW: 400,
    cutH: 400,
    cutL: 0,
    cutT: 0,
    region: ['广东省', '广州市', '海珠区'],
    writeComapny: false,
    dialogComapny: false,
    companyList: ['北京师范大学珠海分校', '北京理工大学珠海学院', '中山大学'],
    _num: '-1',
    companySelected: '', //最终选中的公司
    beforeSelect: 1, //之前选中的0为未选中1为选中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function () {
    var _this = this

    // wx.showLoading({
    //   title: '图片加载中...',
    // })

    wx.getImageInfo({
      src: _this.data.imageSrc,
      success: function success(res) {
        var innerAspectRadio = res.width / res.height;
        console.log(innerAspectRadio)
        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
        if (innerAspectRadio >= 1) {
          _this.setData({
            cropperW: windowWRPX,
            cropperH: windowWRPX / innerAspectRadio,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
            // 裁剪框  宽高
            // cutW: windowWRPX - 200,
            // cutH: windowWRPX / innerAspectRadio - 200,
            cutL: Math.ceil((windowWRPX - windowWRPX + 340) / 2),
            cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 20)) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio
          })
        } else {
          _this.setData({
            cropperW: windowWRPX * innerAspectRadio,
            cropperH: windowWRPX,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
            // 裁剪框的宽高
            // cutW: windowWRPX * innerAspectRadio - 66,
            // cutH: 400,
            cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 20)) / 2),
            cutT: Math.ceil((windowWRPX - 340) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio
          })
        }
        _this.setData({
          isShowImg: true
        })
        wx.hideLoading()
      }
    })
  },

  // 拖动时候触发的touchStart事件
  contentStartMove(e) {
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },

  // 拖动时候触发的touchMove事件
  contentMoveing(e) {
    var _this = this
    // _this.data.cutL + (e.touches[0].pageX - pageX)
    // console.log(e.touches[0].pageX)
    // console.log(e.touches[0].pageX - pageX)
    var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
    var minX = Math.max(_this.data.cutL - (dragLengthX), 0)
    var minY = Math.max(_this.data.cutT - (dragLengthY), 0)
    var maxX = _this.data.cropperW - _this.data.cutW
    var maxY = _this.data.cropperH - _this.data.cutH
    this.setData({
      cutL: Math.min(maxX, minX),
      cutT: Math.min(maxY, minY),
    })
    console.log(`${maxX} ----- ${minX}`)
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },

  // 获取图片
  getImageInfo() {
    var _this = this
    console.log('shengcheng:' + _this.data.imageSrc)
    wx.showLoading({
      title: '图片生成中...',
    })
    // wx.downloadFile({
    //   url:_this.data.imageSrc, //仅为示例，并非真实的资源    
    //   success: function (res) {
    // 将图片写入画布            
    const ctx = wx.createCanvasContext('myCanvas')
    // ctx.drawImage(res.tempFilePath)
    ctx.drawImage(_this.data.imageSrc)

    ctx.draw(true, () => {
      // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题
      var canvasW = (_this.data.cutW / _this.data.cropperW) * (_this.data.imageW / pixelRatio)
      var canvasH = (_this.data.cutH / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
      var canvasL = (_this.data.cutL / _this.data.cropperW) * (_this.data.imageW / pixelRatio)
      var canvasT = (_this.data.cutT / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
      console.log(`canvasW:${canvasW} --- canvasH: ${canvasH} --- canvasL: ${canvasL} --- canvasT: ${canvasT} -------- _this.data.imageW: ${_this.data.imageW}  ------- _this.data.imageH: ${_this.data.imageH} ---- pixelRatio ${pixelRatio}`)
      wx.canvasToTempFilePath({
        x: canvasL,
        y: canvasT,
        width: canvasW,
        height: canvasH,
        destWidth: canvasW,
        destHeight: canvasH,
        canvasId: 'myCanvas',
        success: function (res) {
          wx.hideLoading()
          // 成功获得地址的地方
          console.log('end:' + res.tempFilePath)
          // 判断时上传头像还是二维码
          _this.setData({
            imageFixed: false,
          })
          if (_this.data.imageNum == '1') {
            _this.setData({
              headImg: res.tempFilePath
            })
          } else if (_this.data.imageNum == '2') {
            _this.setData({
              ewmImg: res.tempFilePath
            })
          }

        }
      })
    })
    //   }


    // })
  },

  // 设置大小的时候触发的touchStart事件
  dragStart(e) {
    var _this = this
    sizeConfPageX = e.touches[0].pageX
    sizeConfPageY = e.touches[0].pageY
    initDragCutW = _this.data.cutW
    initDragCutL = _this.data.cutL
    initDragCutT = _this.data.cutT
    initDragCutH = _this.data.cutH
  },

  // 设置大小的时候触发的touchMove事件
  dragMove(e) {
    var _this = this
    var dragType = e.target.dataset.drag
    switch (dragType) {
      case 'right':
        var dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
        if (initDragCutW >= dragLength) {
          // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
          if (dragLength < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) {
            this.setData({
              cutW: initDragCutW - dragLength
            })
          }
          // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
          if (dragLength > 0) {
            this.setData({
              cutW: initDragCutW - dragLength
            })
          }
          else {
            return
          }
        } else {
          return
        }
        break;
      case 'left':
        var dragLength = (dragLength = sizeConfPageX - e.touches[0].pageX) * dragScaleP
        console.log(dragLength)
        if (initDragCutW >= dragLength && initDragCutL > dragLength) {
          if (dragLength < 0 && Math.abs(dragLength) >= initDragCutW) return
          this.setData({
            cutL: initDragCutL - dragLength,
            cutW: initDragCutW + dragLength
          })
        } else {
          return;
        }
        break;
      case 'top':
        var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        if (initDragCutH >= dragLength && initDragCutT > dragLength) {
          if (dragLength < 0 && Math.abs(dragLength) >= initDragCutH) return
          this.setData({
            cutT: initDragCutT - dragLength,
            cutH: initDragCutH + dragLength
          })
        } else {
          return;
        }
        break;
      case 'bottom':
        var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        // console.log(_this.data.cropperH > _this.data.cutT + _this.data.cutH)
        console.log(dragLength)
        console.log(initDragCutH >= dragLength)
        console.log(_this.data.cropperH > initDragCutT + _this.data.cutH)
        // 必须是 dragLength 向上缩小的时候必须小于原本的高度
        if (initDragCutH >= dragLength) {
          // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
          if (dragLength < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) {
            this.setData({
              cutH: initDragCutH - dragLength
            })
          }
          // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
          if (dragLength > 0) {
            this.setData({
              cutH: initDragCutH - dragLength
            })
          }
          else {
            return
          }
        } else {
          return
        }
        break;
      case 'rightBottom':
        var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
        var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
        if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
          // bottom 方向的变化
          if ((dragLengthY < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) || (dragLengthY > 0)) {
            this.setData({
              cutH: initDragCutH - dragLengthY
            })
          }

          // right 方向的变化
          if ((dragLengthX < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) || (dragLengthX > 0)) {
            this.setData({
              cutW: initDragCutW - dragLengthX
            })
          }
          else {
            return
          }
        } else {
          return
        }
        break;
      default:
        break;
    }
  },
  // 图片上传
  upLoad: function () {

  },
  upEwm: function (e) {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // var mode = parseFloat(e.currentTarget.dataset.current);
        console.log('shangchuan:' + tempFilePaths)
        console.log(e.currentTarget.dataset.which);
        _this.setData({
          imageFixed: true,
          imageSrc: tempFilePaths.join(),
          imageNum: e.currentTarget.dataset.which
        })
        // start
        wx.getImageInfo({
          src: _this.data.imageSrc,
          success: function success(res) {
            var innerAspectRadio = res.width / res.height;
            console.log('bili' + innerAspectRadio)
            // 根据图片的宽高显示不同的效果   保证图片可以正常显示


            if (innerAspectRadio == '1') {
              console.log('zhengfangxingtu')
              _this.setData({
                imageFixed: false,
              })
              // 判断时上传头像还是二维码
              if (_this.data.imageNum == '1') {
                _this.setData({
                  headImg: tempFilePaths.join()
                })
              } else if (_this.data.imageNum == '2') {
                _this.setData({
                  ewmImg: tempFilePaths.join()
                })
              }

            } else if (innerAspectRadio > 1) {
              _this.setData({
                cropperW: windowWRPX,
                cropperH: windowWRPX / innerAspectRadio,
                // 初始化left right
                cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
                cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
                // 裁剪框  宽高
                // cutW: windowWRPX - 200,
                // cutH: windowWRPX / innerAspectRadio - 200,
                cutL: Math.ceil((windowWRPX - windowWRPX + 340) / 2),
                cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 20)) / 2),
                // 图片缩放值
                scaleP: res.width * pixelRatio / windowWRPX,
                // 图片原始宽度 rpx
                imageW: res.width * pixelRatio,
                imageH: res.height * pixelRatio
              })
            } else {
              _this.setData({
                cropperW: windowWRPX * innerAspectRadio,
                cropperH: windowWRPX,
                // 初始化left right
                cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
                cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
                // 裁剪框的宽高
                // cutW: windowWRPX * innerAspectRadio - 66,
                // cutH: 400,
                cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 20)) / 2),
                cutT: Math.ceil((windowWRPX - 340) / 2),
                // 图片缩放值
                scaleP: res.width * pixelRatio / windowWRPX,
                // 图片原始宽度 rpx
                imageW: res.width * pixelRatio,
                imageH: res.height * pixelRatio
              })
            }
            _this.setData({
              isShowImg: true
            })
            wx.hideLoading()
          }
        })

        // end
      }
    })
  },
  // 地区选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 公司自定义输入
  bindcomInput: function (e) {
    this.setData({
      companySelected: e.detail.value
    })
  },
  // 点击选择公司
  selectCompany: function (e) {
    this.setData({
      dialogComapny: true
    })
  },
  // 自定义输入公司
  moreCompany: function (e) {
    this.setData({
      writeComapny: true
    })
  },
  //自定义公司确定提交
  subCompany: function (e) {
    this.setData({
      writeComapny: false,
      dialogComapny: false
    })
  },
  // 关闭弹窗
  close: function () {
    this.setData({
      writeComapny: false
    })
  },
  // 点击公司选中
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num,
      companySelected: e.target.dataset.company,
      dialogComapny: false,
      beforeSelect: 0
    })
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