//app.js
App({

  globalData: {
    openid: '',
    th1:'',
    d2:'',
    th4:'',
    th5:'',
    page:''
  },

  onSubscribe: function(e) {
    var that = this;
    // 获取课程信息
    // const item = e.currentTarget.dataset.item;
    // 调用微信 API 申请发送订阅消息
    wx.requestSubscribeMessage({
      // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
      tmplIds: ['yNgkYWccbOv2Yl_7V1vWOEurfXeZN-FSpnXbaQe89CA'],
      success(res) {
        // 申请订阅成功
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          // 这里将订阅的课程信息调用云函数存入云开发数据
          wx.cloud
            .callFunction({
              name: 'subscribe',
              data: {
                data: {
                  thing1:{
                    value: that.globalData.th1
                  },
                  date2: {
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

  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'chengzhi-tc',
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
