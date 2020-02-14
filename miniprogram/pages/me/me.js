const db = wx.cloud.database();
const users = db.collection('users');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    czid:''
  },

  getUserInfo: function(e) {
    wx.cloud.callFunction({
      name:'getOpenId',
      complete: res => {
       users.where({
          _openid : res.result.openId
        }).get().then( res => {
          this.setData({
            czid: "CZ："+ res.data[0].czid
          })
        });
        
        
      }
    })
    
  },

  onPullDownRefresh:function(e) {
      this.onLoad()
  },

  onReachBottom: function() {
    this.getData();
  },


  onLoad: function (options) {
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
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName : res.userInfo.nickName
              })
              wx.setNavigationBarTitle({ title: res.userInfo.nickName })
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