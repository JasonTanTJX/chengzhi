var amapFile = require('../../amap-wx.js');
var config = { key: 'e3b2f6357c30a02401431a9a49f3de03' };
var lonlat;
var city;
Page({
  data: {
    value: '',
    tips: {}
  },
  
  onChange(e) {
    this.setData({
      value: e.detail
    });
    this.bindInput();
  },

  onLoad: function (e) {
    lonlat = e.lonlat;
    city = e.city;
  },
  bindInput: function (e) {
    var that = this;
    var keywords = that.data.value;
    var key = config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'e3b2f6357c30a02401431a9a49f3de03' });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '../loc/loc?keywords=' + keywords;
    wx.redirectTo({
      url: url
    })
  }
})