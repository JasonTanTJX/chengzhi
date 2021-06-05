
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,          // 默认不显示插件
    beginTime: '06:00',
    endTime: '23:00',
    timeGap: 30,
    themeColor: '#ffd00a',
    showOverdue: true,      // 默认显示过期时刻，false则隐藏已过期时刻
    calendarType: 'yytime',
    date:''
  },

  // 点击显示插件
  btnClick: function () {
    this.setData({
      isShow: true,
    })
  },

  _yybindchange: function (e) {
    var data = e.detail
    this.setData({
      date: data.date
    })
    console.log(data)
  },

  _yybindhide: function () {
    console.log('隐藏')
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