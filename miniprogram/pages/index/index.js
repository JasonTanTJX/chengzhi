const db = wx.cloud.database();
const todos = db.collection('todos');
const app = getApp();
Page({


  data: {
    tasks:[],
    openid:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://images.t0k.xyz/defBg.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://images.t0k.xyz/defBg.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://images.t0k.xyz/defBg.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://images.t0k.xyz/defBg.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://images.t0k.xyz/defBg.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://images.t0k.xyz/defBg.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://images.t0k.xyz/defBg.jpg'
    }],
  },

  onLoad: function () {
  },
  
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  },

  onReady: function () {
    wx.showTabBar();
    todos.get().then(res => {
      this.setData({
        tasks:res.data
      })
    })
  },
  onShow: function () {
    
 
  },
  onReachBottom: function() {
    this.getData();
  },

  onPullDownRefresh: function() {
    this.getData(res => {
      wx.stopPullDownRefresh();   
      this.pageData.skip = 0;
    });
   
  },

  onSearch: function(e) {
    
  },

  getData: function(callback) {
    if(!callback){
      callback = res => {}
    }
    wx.showNavigationBarLoading()
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
     },500)
    todos.skip(this.pageData.skip)
    .orderBy('date', 'desc')
    .orderBy('time', 'desc').get().then(res => {

      let oldData = this.data.tasks;
      this.setData({
        tasks: oldData.concat(res.data)
      },res => {
        this.pageData.skip = this.pageData.skip + 20
        wx.hideLoading()
        callback();
      })
    })
  },
  pageData: {
    skip:0
  }
})