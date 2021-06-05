// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nodes: [{
    //   name: 'div',
    //   attrs: {
    //     class: 'div_class',
    //     style: 'line-height: 60px; color: red;'
    //   },
    //   children: [{
    //     type: 'text',
    //     text: 'Hello&nbsp;World!'
    //   }]
    // }]
    html:"https://3g.163.com/news/20/0304/23/F6TMFIB80001899O.html"
  },

  tap() {
    // console.log('tap')
    wx.request({
      url: 'https://storage.t0k.xyz/detail.php',
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        console.log(res)
        // that.setData({
        //   news:res.data.BBM54PGAwangning
        // })
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