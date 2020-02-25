// pages/wall/wall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userComment:'',
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
    show: false,
    isLoad:'',
    emoji:`😍-😤-😜-😝-😋-😘-😠-😩-😲-😞-😵-😰-😒-😚-😷-😳-😃-😅-😆-😁-😂-😊-😄-😢-😭-😨-😣-😡-😌-😖-😔-😱-😪-😏-😓-😥-😫-😉-👀-🙅-🙆-🙇-🙈-🙊-🙉-🙋-🙌-🙍-🙎-🙏-☀-☁-☔-⛄-⚡-🌀-🌁-🌂-🌃-🌅-🌈-✊-✋-✌-👊-👍-☝-👆-👇-👈-👉-👋-👏-👌-👎-👐-💉-💊`,
    emojiArr:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78'],
    emojis:[],//用作保存表情与id的数组
    isEmoji:false,//显示与隐藏表情栏
    emojiHeight:300,//动态改变表情框的高度
    footHeight:100//动态改变外部容器的高度
  },
  
  sendComment:function(e){
    var that = this;

    wx.request({
      url: 'https://www.t0k.xyz/addPubArticles.php',
      method:'POST',
      data: {
        openid:app.globalData.userInfo.openid,
        nickName:app.globalData.userInfo.nickName,
        content: that.data.userComment,
        comment_id:e.currentTarget.dataset.content_id,
        open:'true' 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success () {
        that.setData({
          userComment : '',
          emojis: []
        })
        that.onLoad()
      }
    })
  },
  

  onClose() {
    this.setData({ show: false });
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

  bindCommentInput:function(event) {
    this.setData({
      userComment:event.detail.value,
      currentComment:event.currentTarget.dataset.currentcomment
    })
  },

  emojiBtn: function(e) {
    let index = e.currentTarget.dataset.i;
    if (this.data.userComment) {
      this.setData({
        userComment: this.data.userComment + this.data.emojis[index].char
      })
      
    } else {
      this.setData({
        userComment: this.data.emojis[index].char
      })
      console.log(e)
    }
  },

  showEmoji: function() {
    var emo = {};
    var emoChar = this.data.emoji.split('-');
    this.data.emojiArr.forEach((val,index) => {
      emo = {
        char: emoChar[index],
        emoji: val
      }
        this.data.emojis.push(emo);
    })
      this.setData({
      emojis: this.data.emojis
    })
    
  },

  onEmoji: function(e) {
    this.showEmoji()
    console.log(e.currentTarget.dataset)
    this.setData({
      currentComment:e.currentTarget.dataset.currentcomment,
      show:true,
      isEmoji: true,
      emojiHeight:300,
      footHeight:500
    })
    
  },

  hidEmoji: function() {
    this.setData({
      isEmoji: false,
      emojis: [],
      emojiHeight:0,
      footHeight:100
    })
    
  },

  onLoad: function (options) {
    this.isLoading();
    this.getPubArticles();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideTabBar()
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