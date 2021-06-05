// pages/login/login.js
const db = wx.cloud.database();
const usersInfo = db.collection('usersInfo');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    openid: null
  },

  getUserInfo: function (e) {
    var that = this;

    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.openid = e.detail.userInfo.openid
        that.setData({
          userInfo: e.detail.userInfo,
          openid: e.detail.userInfo.openid
        })
        console.log(that.data.openid)
        wx.setStorageSync('userInfo', app.globalData.userInfo)
        wx.setStorageSync('openid', app.globalData.openid)
        usersInfo.where({
          _openid: res.result.wxInfo.OPENID
        }).count().then(ress => {
          console.log(ress.total)
          if (ress.total == 0) {
            usersInfo.add({
              data: e.detail.userInfo
            }).then(ress => {

              try {
                wx.request({
                  url: 'https://www.tanyang.asia/api/login.php',
                  method: 'POST',
                  data: {
                    openid: e.detail.userInfo.openid,
                    nickName: e.detail.userInfo.nickName,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                    gender: e.detail.userInfo.gender,
                    country: e.detail.userInfo.country,
                    province: e.detail.userInfo.province,
                    city: e.detail.userInfo.city
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success() {
                    wx.switchTab({
                      url: "/pages/index/index",
                    })

                  }
                })
              } catch (error) {

              }


            })
          } else {
            wx.switchTab({
              url: "/pages/index/index",
            })
          }
        });

      }
    })


  },

  onRefuse: function () {
    wx.switchTab({
      url: "/pages/index/index",
    })
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

  }
})