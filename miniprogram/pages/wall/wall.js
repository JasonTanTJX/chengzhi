// pages/wall/wall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:['','',''],
    TabCur:0,
    scrollLeft:0,
    avatarUrl:[],
    nickName:[],
    gender:[],
    sendTime:[],
    content:[],
    imgList: [],
    locName:[],
    isLoad:''
  },

  isLoading (e) {
   var that = this;
    setTimeout(function() {
      that.setData({
        isLoad: 'over'
      })
     },1000)
  },

  tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60 
      })
  },
  showPreviewPic:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  getPubArticles: function(e) {
    var that = this;
    wx.request({
      url: 'https://www.t0k.xyz/selectOpenPubArticles.php',
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        console.log(res)
        that.setData({
          content:res.data
        })
      }
    })
  },

  onLoad: function (options) {
    this.isLoading()
    this.getPubArticles()
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
    this.onLoad()
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
    this.onLoad()
    wx.showToast({
      title: '橙知中...',
      icon:'loading'
    })
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
     },500)
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