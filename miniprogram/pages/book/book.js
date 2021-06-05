// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    display: false,
    bookresult: {},
    errormsg: false,
    msg:'',
    ISBN:''
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

  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onClear: function (event) {
    this.setData({
      bookresult: {},
      display: false,
      errormsg: false,
      msg: '',
      ISBN:''
    })
  },

  showPreviewPic: function (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },

  scan: function () {
    let that = this;
    wx.scanCode({
      success: (ress) => {
        that.setData({
          ISBN: ress.result
        })
        console.log(ress)
        if (ress.errMsg == 'scanCode:ok' && ress.scanType == 'EAN_13') {
          wx.showLoading({
            title: '正在奋笔疾书中',
          })
          wx.request({
            url: 'https://airmole.cn/doubanapi/v2/book/isbn/' + that.data.ISBN,
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (res) => {
              console.log(res)
             
                that.setData({
                  bookresult: res.data,
                  display: true
                })
              
              setTimeout(function () {
                wx.hideLoading()
              }, 500)
            }
          })
        }
        if (ress.scanType !== 'EAN_13') {
          wx.showToast({
            title: '这不是ISBN码',
            icon: 'loading',
            duration: 2000
          })
          return false;
        }
        
      }
    })
  },

  onBook: function (e) {
    let that = this;
    wx.showLoading({
      title: '正在奋笔疾书中',
    })
    that.setData({
      ISBN: that.data.value
    })
    wx.request({
      url: 'https://airmole.cn/doubanapi/v2/book/isbn/' + that.data.ISBN,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        
        that.setData({
          bookresult: res.data,
          display: true
        })
        
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    })
  },
})