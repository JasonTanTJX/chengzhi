// pages/login/login.js
const db = wx.cloud.database();
const usersInfo = db.collection('usersInfo');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  getUserInfo: function(e) {

    console.log(e)
    var that = this;
    var myDate = new Date();
    var Y =  myDate.getFullYear();
    var Mo =  myDate.getMonth()+1;
    var D = myDate.getDate();
    var H = myDate.getHours();
    var M =  myDate.getMinutes();
    var S =  myDate.getSeconds();
    var signTime = `${Y}-${Mo}-${D} ${H}:${M}:${S}`;
    wx.cloud.callFunction({
      name:'login',
      success: res => {
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        app.globalData.userInfo = e.detail.userInfo
        that.setData({
          userInfo: e.detail.userInfo
        })
        wx.setStorageSync('userInfo', app.globalData.userInfo)
       usersInfo.where({
          _openid : res.result.wxInfo.OPENID
        }).count().then( ress => {
          console.log(ress.total)
          if (ress.total == 0) {
            usersInfo.add({
              data:  e.detail.userInfo
            }).then( ress => {

              try{
                wx.request({
                  url: 'https://www.t0k.xyz/login.php',
                  method:'POST',
                  data: {
                    czid: `${Math.floor(Math.random()*1000000*M*S)}`,
                    openid: e.detail.userInfo.openid,
                    nickName: e.detail.userInfo.nickName,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                    gender: e.detail.userInfo.gender,
                    country: e.detail.userInfo.country,
                    province: e.detail.userInfo.province,
                    city: e.detail.userInfo.city,
                    signTime: signTime
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success () {
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