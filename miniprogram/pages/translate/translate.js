// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    resource:'',
    transresult:[]
  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onTranslate: function(e) {
    let that = this;
    wx.request({
      url: 'https://www.tanyang.asia/api/universalTranslate.php',
      method:'POST',
      data:{
        q: that.data.value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        that.setData({
          resource: '原文：' + that.data.value,
          transresult: '译文：'+res.data.trans_result[0].dst
          
        })
        console.log(that.data.transresult)
      }
    })
  },

  onClear: function(event) {
    this.setData({
      resource: '',
      transresult: []
    })
  },

  // tabSelect(e) {
  //   this.setData({
  //     TabCur: e.currentTarget.dataset.id,
  //     scrollLeft: (e.currentTarget.dataset.id-1)*60
  //   })
  // },

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