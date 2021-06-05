var amapFile = require('../../amap-wx.js');
var config = { key: 'e3b2f6357c30a02401431a9a49f3de03' };
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMarker:{},
    markers:[],
    latitude: "", //纬度 
    longitude: "",  //经度
    textData: {},
    city: ''
  },

  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },

  myLoc:function(e) {
    var that = this;
    var key = config.key;
    var myAmapFun = new amapFile.AMapWX({ key:'e3b2f6357c30a02401431a9a49f3de03' });
    myAmapFun.getRegeo({
      iconPath: "https://images.tanyang.asia/icon/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        console.log(data)
        that.setData({
          myMarker: {
            id: data[0].id,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            iconPath: data[0].iconPath,
            width: data[0].width,
            height: data[0].height,
            name: data[0].name,
            desc: data[0].desc,
            country: data[0].regeocodeData.addressComponent.country,
            province: data[0].regeocodeData.addressComponent.province,
            city: data[0].regeocodeData.addressComponent.city,
            district: data[0].regeocodeData.addressComponent.district,
            streetNumDirection: data[0].regeocodeData.addressComponent.streetNumber.direction,
            streetNumDistance: data[0].regeocodeData.addressComponent.streetNumber.distance,
            streetNumLocation: data[0].regeocodeData.addressComponent.streetNumber.location,
            streetNumber: data[0].regeocodeData.addressComponent.streetNumber.number,
            street: data[0].regeocodeData.addressComponent.streetNumber.street,
            towncode: data[0].regeocodeData.addressComponent.towncode,
            township: data[0].regeocodeData.addressComponent.township,
          }
        });

        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                 console.log(res)
                  wx.request({
                    url: 'https://www.tanyang.asia/api/location.php',
                    method: 'POST',
                    data: {
                      nickName: res.userInfo.nickName,
                      gender: res.userInfo.gender,
                      country: that.data.myMarker.country,
                      province: that.data.myMarker.province,
                      city: that.data.myMarker.city,
                      district: that.data.myMarker.district,
                      township: that.data.myMarker.township,
                      streetNumDirection: that.data.myMarker.streetNumDirection,
                      streetNumDistance: that.data.myMarker.streetNumDistance,
                      streetNumLocation: that.data.myMarker.streetNumLocation,
                      streetNumber: that.data.myMarker.streetNumber,
                      street: that.data.myMarker.street,
                      latitude: that.data.myMarker.latitude,
                      longitude: that.data.myMarker.longitude,
                      name: that.data.myMarker.name,
                      desc: that.data.myMarker.desc
                    },
                    header: {
                      'content-type':'application/x-www-form-urlencoded' 
                    },
                    success() {
                      console.log('插入成功！')
                    }
                  })
                }
              })
            } else {
          
            }
          }
        })


        
      },
      fail: function (info) {
         wx.showModal({title:info.errMsg})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.myLoc();
    var that = this;
    var key = config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'e3b2f6357c30a02401431a9a49f3de03' });
    var params = {
      iconPathSelected: 'https://images.tanyang.asia/icon/marker_checked.png',
      iconPath: 'https://images.tanyang.asia/icon/marker.png',
      success: function (data) {
        // console.log(data)
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function (item, index) {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })

        })
        if (markersData.length > 0) {
          that.setData({
            markers: markers_new
          });
          that.setData({
            city: poisData[0].cityname || ''
          });
          that.setData({
            latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData, 0);
        } else {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '北京市'
              });
            },
            fail: function () {
              that.setData({
                latitude: 39.909729
              });
              that.setData({
                longitude: 116.398419
              });
              that.setData({
                city: '北京市'
              });
            }
          })

          that.setData({
            textData: {
              name: '抱歉，该地点未在检索周边的POI',
              desc: ''
            }
          });
        }

      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    if (e && e.keywords) {
      params.querykeywords = e.keywords;
    }
    myAmapFun.getPoiAround(params)
    
  },

  bindInput: function (e) {
    var that = this;
    var url = '../inputtips/input';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.redirectTo({
      url: url
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "https://images.tanyang.asia/icon/marker_checked.png";
      } else {
        data[j].iconPath = "https://images.tanyang.asia/icon/marker.png";
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })
    }
    that.setData({
      markers: markers
    });
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