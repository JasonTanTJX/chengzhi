// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trans_result:''
  },

  onTranslate: function(event) {
    let that = this;
    wx.request({
      url: 'https://www.t0k.xyz/translate.php',
      method:'POST',
      data:{
        q: event.detail
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        that.setData({
          trans_result: res.data.trans_result[0].dst
        })
      }
    })
  },

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