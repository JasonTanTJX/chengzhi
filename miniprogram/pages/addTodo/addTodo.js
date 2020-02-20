// pages/addTodo/addTodo.js
const db = wx.cloud.database();
const todos = db.collection('todos');
var app = getApp();
Page({
  onLoad:function(){
// console.log(app.globalData.openid);
  },
  data:{
    title:'',
    date:'',
    time:'',
    image:null,
    location:'',
    status:'processing',
    page:''
  },
  pageData:{
    locationObj: {}
  },
  selectImage: function(e) {
    wx.chooseImage({
      success: ret => {
        var filePath = ret.tempFilePaths[0];
        wx.uploadFile({
          url: 'https://sm.ms/api/upload',
          filePath: filePath,
          name: 'smfile',
          success: res => {
            console.log('上传成功：', res);
          }
        });
      }
    })
  },
  bindDateChange:function(event) {
    this.setData({
      date:event.detail.value
    })
    app.globalData.d2 = event.detail.value;
  },
  bindTitleChange:function(event) {
    this.setData({
      title:event.detail.value
    })
    app.globalData.th1 = event.detail.value;
  },
  bindTimeChange:function(event) {
    this.setData({
      time:event.detail.value
    })
    app.globalData.d2 = event.detail.value;
  },
  submitFunction:function(event) {
   let myDate = new Date;
   let year = myDate.getFullYear();
   let month = myDate.getMonth() + 1;
   let day = myDate.getDate();
   let time = `${year}-${month}-${day} ${this.data.time}`;
   
   var that = this;
  // this.getOpenid();

  wx.showModal({
    title: '提示',
    content: '橙知需要发送一条订阅消息',
    success (res) {
      if (res.confirm) {
        that.setData({
          page : `todoInfo/todoInfo?id=${res._id}`
        })
        app.onSubscribe();
        todos.add({
          data:{
            title:that.data.title,
            image:that.data.image,
            location:that.pageData.locationObj,
            status:'processing',
            date:that.data.date,
            time:that.data.time+':00', 
          }
        }).then(res => {
          todos.doc(res._id).update({
            data:{
            page:`todoInfo/todoInfo?id=${res._id}`
            }
          })
           
            // console.log(that.data.page)
          app.globalData.page = `todoInfo/todoInfo?id=${res._id}`
            console.log(app.globalData.page)
           wx.showToast({
             title: '添加成功！',
             icon:'success',
             success:res2 => {
              wx.redirectTo({
                 url: `../todoInfo/todoInfo?id=${res._id}`,
                 })
                
              
             }
           })
          
         })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  // console.log(event);
  
  },
   
  chooseLocation: function(e) {
    wx.chooseLocation({
      complete: (res) => {
        let locationObj = {
          latitude:res.latitude,
          longitude:res.longitude,
          name:res.name,
          address:res.address
        }
        this.pageData.locationObj = locationObj;
        // console.log(res)
        app.globalData.th4 = res.name;
        app.globalData.th5 = res.address;
      },
    })
  }
})