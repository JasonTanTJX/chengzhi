
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let plugin = requirePlugin("wky");
   let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord({
                success(res) {
                  const tempFilePath = res.tempFilePath
                }
              })
              setTimeout(function () {
                wx.stopRecord() // 结束录音
              }, 5000)
            }
          })
        } else {
          wx.startRecord({
            success(res) {
              const tempFilePath = res.tempFilePath
            }
          })
          setTimeout(function () {
            wx.stopRecord() // 结束录音
          }, 5000)
        }
      }
    })
    wx.request({
      url: 'https://www.tanyang.asia/api/token.php',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          token:{
            app_id: res.app_id,
            sig: res.sig,
            timestamp: res.timestamp
          }
        })
      }
    })
    //跟读数据配置,每个题目一个元素
    var questions = [
      {
        //ID,选填,如果不填按序号自动生成
        id: '',
        //跟读的英文,必填
        eng: 'How many seasons are there in a year?',
        //转写英文,用于有特殊字符的英文,比如eng为It's 7:00,需转写为It's seven o'clock
        trans_eng: '',
        //中文
        chi: '',
        //示范发音URL,必填
        pronun: 'https://www.tanyang.asia/voice/test.m4a',
        //图片,
        image: 'https://images.tanyang.asia/indexSwiperListImg/1.jpg'
      }
    ]
    // 设置跟读的初始化参数
    let initParams = {
      //跟读题目
      questions: questions,
      //认证token
      authToken: that.data.token,
      //结果回调
      resultCallback: {
        //用户每完成一次跟读，将评测结果通知给业务方
        onResult: function (res) {
          console.log("onResult", res)
        },
        //当用户完成全部练习，点击完成练习后通知给业务方
        onFinish: function (res) {
          console.log("onFinish", res)
        }
      },
      //练习模式: 0,普通模式；1,绘本模式
      viewType: 0,
    }
    //初始化跟读模块，根据返回的结果判断是否初始化成功
    let resp = plugin.initReadaloud(initParams)
    if (!resp.success) {
      console.log(resp)
      wx.showToast({
        icon: 'none',
        title: resp.msg
      })
    } else {
      //跳转到跟读页面
      wx.navigateTo({
        url: 'plugin://wky/readaloud',
      })
    }

    
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