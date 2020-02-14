// pages/login/login.js
const db = wx.cloud.database();
const users = db.collection('users');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name:'getOpenId',
      complete: res => {
       users.where({
          _openid : res.result.openId
        }).count().then( res => {
          console.log(res.total)
          if (res.total == 0) {
            users.add({
               data: {
                userInfo:e.detail.userInfo,
                czid: `${Math.floor(Math.random(1000,9999)*Math.random(1000,9999))}`
               }
            }).then( res => {
               console.log(res)
            }).catch( err => {
               console.error(err)
            })
          }else{
            wx.switchTab({
              url: "/pages/me/me",
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