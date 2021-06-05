const db = wx.cloud.database();
const users = db.collection('users');
const app = getApp();
Page({

  data: {
    display: '',
    certified: '',
    nickName: '',
    avatarUrl: '',
    openid: '',
    czid: '',
    gender: '',
    genderIndex: '',
    rewardPoints: 0
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


  onGender: function () {
    if (this.data.genderIndex == '1') {
      this.setData({
        gender: 'https://www.tanyang.asia/icon/man.png'
      })

    } else {
      this.setData({
        gender: 'https://www.tanyang.asia/icon/woman.png'
      })
    }
  },

  onPullDownRefresh: function (e) {
    this.onLoad()
  },

  onReachBottom: function () {
    this.getData()
  },

  onLogin: function () {
    wx.navigateTo({
      url: "/pages/login/login",
    })
  },

  onCertify: function () {
    wx.navigateTo({
      url: "/pages/certify/certify",
    })
  },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://www.tanyang.asia/api/selectUsersInfo.php',
      method: 'POST',
      data: {
        openid: app.globalData.openid
        // imgList: JSON.stringify(that.data.imgList)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('查询数据：', res.data[0].czid)
        that.setData({
          rewardPoints: res.data[0].rewardPoints,
          czid: 'czid:' + res.data[0].czid
        })
        if (res.data[0].id != null) {
          that.setData({
            certified: false
          })
        } else {
          that.setData({
            certified: true
          })
        }
      }
    })

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                display: false,
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
                genderIndex: res.userInfo.gender
              })
              that.onGender();
            }
          })
        } else {
          that.setData({
            display: true,
            avatarUrl: 'https://www.tanyang.asia/icon/logo.png',
            nickName: '小橙',
            czid: ''
          })
        }
      }
    }) //获取用户的当前设置





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

  },

  afterRead(e) {
    console.log(111111, e)
  }
})