//app.js
App({

  globalData: {
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    openid: '',
    czid:'',
    th1:'',
    d2:'',
    th4:'',
    th5:'',
    page:''
  },



  onSubscribe: function(e) {
    var that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['yNgkYWccbOv2Yl_7V1vWOEurfXeZN-FSpnXbaQe89CA'],
      success(res) {
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          wx.cloud.callFunction({
              name: 'subscribe',
              data: {
                data: {
                  thing1:{
                    value: that.globalData.th1
                  },
                  date2:{
                    value:that.globalData.d2
                  },
                  thing4:{
                    value: that.globalData.th4
                  },
                  thing5:{
                    value: that.globalData.th5
                  },
                  page: that.globalData.page
                  },
                templateId: 'yNgkYWccbOv2Yl_7V1vWOEurfXeZN-FSpnXbaQe89CA',
                
                
              },
            })
            .then((res) => {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000,
              });
            })
            .catch((err) => {
              wx.showToast({
                title: '订阅失败',
                icon: 'cross',
                duration: 2000,
              });
            });
        }
      },
    });
  },

  onLaunch: function (options) {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'chengzhi-tc',
        traceUser: true,
      })
    }

    this.globalData = {}

    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo) {
      this.globalData.userInfo = userInfo
    }

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
})
