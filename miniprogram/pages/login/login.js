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
    
    var myDate = new Date();
    var Y =  myDate.getFullYear();
    var Mo =  myDate.getMonth()+1;
    var D = myDate.getDate();
    var H = myDate.getHours();
    var M =  myDate.getMinutes();
    var S =  myDate.getSeconds();
    var regTime = `${Y}-${Mo}-${D} ${H}:${M}:${S}`;
    
    // wx.cloud.callFunction({
    //   name:'getOpenId',
    //   complete: res => {
    //    users.where({
    //       _openid : res.result.openId
    //     }).count().then( res => {
        
    //       if (res.total == 0) {
    //         users.add({
    //            data: {
    //             userInfo:e.detail.userInfo,
    //             czid: `${Math.floor(Math.random()*1000000)}`*M*S,
    //             regTime: regTime
    //            }
    //         }).then(
    //           wx.switchTab({
    //             url: "/pages/index/index",
    //           })
    //         ).catch( err => {
    //            console.error(err)
    //         })
    //       }else{
    //         wx.switchTab({
    //           url: "/pages/index/index",
    //         })
    //       }
    //     });
        
        
    //   }
    // })
    console.log(e)
    try{
      wx.request({
        url: 'https://users.t0k.xyz/index.php',
        method:'POST',
        data: {
          id: e.detail.userInfo.nickName,
          openid: e.detail.userInfo.province
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success (res) {
          console.log(res.data);
        }
      })
    }catch(error){

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getUserInfo()
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