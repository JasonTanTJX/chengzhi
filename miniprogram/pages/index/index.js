const db = wx.cloud.database();
const todos = db.collection('todos');
const app = getApp();
const qiniu = require('../../qiniu-js/dist/qiniu.min')
var amapFile = require('../../amap-wx.js');
Page({


  data: {
    scrollLeft: 0,
    currentTab: 0,
    weather: {},
    today: [],
    currentDate: '',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://images.tanyang.asia/indexSwiperListImg/1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://images.tanyang.asia/campus_sam.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://images.tanyang.asia/indexSwiperListImg/3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://images.tanyang.asia/indexSwiperListImg/4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://images.tanyang.asia/indexSwiperListImg/5.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://images.tanyang.asia/indexSwiperListImg/6.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://images.tanyang.asia/indexSwiperListImg/7.jpg'
    }],
    togetherDays: 0,
    encounterDays: 0
  },

  currentDate: function () {
    let that = this;
    var date = new Date(),
      month = date.getMonth() + 1,
      date = date.getDate();
    that.setData({
      currentDate: month + '月' + date + '日'
    })

  },

  onDetail: function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  getToday: function () {
    let that = this;
    wx.request({
      url: 'https://www.tanyang.asia/api/today.php',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          today: res.data.data
        })
      }
    })
  },

  getTogetherDays: function () {
    let diffDays = new Date().getTime() / 1000 - parseInt(new Date('2020-07-19 00:00:00').getTime() / 1000);
    let togetherDays = parseInt(diffDays / 60 / 60 / 24);
    this.setData({
      togetherDays: togetherDays
    })
  },

  getEncounterDays: function () {
    let diffDays = new Date().getTime() / 1000 - parseInt(new Date('2020-06-13 00:00:00').getTime() / 1000);
    let encounterDays = parseInt(diffDays / 60 / 60 / 24);
    this.setData({
      encounterDays: encounterDays
    })
  },

  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'e3b2f6357c30a02401431a9a49f3de03'
    });
    myAmapFun.getWeather({
      success: function (data) {
        //成功回调
        console.log(data)
        that.setData({
          weather: data
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    this.currentDate();
    this.getToday();
    this.getTogetherDays()
    this.getEncounterDays()
  },

  bindGetUserInfo: function (e) {
    // console.log(e.detail.userInfo)
  },

  onReady: function () {
    wx.showTabBar();

  },
  onShow: function () {

  },
  onReachBottom: function () {

  },

  onPullDownRefresh: function () {

  },

  onTranslate: function (e) {
    wx.navigateTo({
      url: '/pages/translate/translate',
    })
  },

})