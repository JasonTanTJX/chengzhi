const db = wx.cloud.database();
const users = db.collection('users');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    czid:'',
    gender:'',
    starCount: 0,
    fansCount: 0,
    followingCount: 0,
    articleCount:0
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  options: {
    addGlobalClass: true,
  },

  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            fansCount: i,
            followingCount: i,
            articleCount: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          fansCount: that.coutNum(484),
          followingCount: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },

  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  },

  onShareAppMessage() {
    return {
      title: '橙知',
      imageUrl: 'cloud://chengzhi-tc.6368-chengzhi-tc-1259737814/icons/logo.png',
      path: '/pages/index/index'
    }
  },

  onMessage: function(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
    console.log(e)
  },

  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name:'getOpenId',
      complete: res => {
       users.where({
          _openid : res.result.openId
        }).get().then( res => {
          if (res.data[0].czid) {
            this.setData({
              czid: "CZ: "+res.data[0].czid
            })
          }else{
            console.error(err)
          }
          
        });  
      }
    })
    
  },

  onPullDownRefresh:function(e) {
    this.onLoad()
  },

  onReachBottom: function() {
    this.getData()
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' })
     wx.showNavigationBarLoading()
      setTimeout(function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
       },500)
    var that = this;
    that.getUserInfo()
  
    wx.login({
      success : res => {
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo.gender)
              if(res.userInfo.gender=='1') {
                that.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName : res.userInfo.nickName,
                  gender: 'https://www.t0k.xyz/man.png'
                })
                
              }else{
                that.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName : res.userInfo.nickName,
                  gender: 'https://www.t0k.xyz/woman.png'
                })
                
              }

            },
            fail(error){
              wx.navigateTo({
                url: "/pages/login/login",
              })
            }
          })
        }else{
          console.error(err)
        }
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
    this.onLoad();
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