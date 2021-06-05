const app = getApp();
Page({
  data:{
    openid:'',
    name:'',
    gender:'',
    nationality:'',
    birthday:'',
    address:'',
    id:'',
    valid_date:'',
    image_path1:'https://images.tanyang.asia/idcard1.jpg',
    image_path0: 'https://images.tanyang.asia/idcard0.jpg',
    fileList: [],
    fileSrc:''
  },

  onSuccess: function(e) {
    let that = this;
    that.setData({
      name: e.detail.name.text,
      gender: e.detail.gender.text,
      nationality: e.detail.nationality.text,
      id: e.detail.id.text,
      birthday: e.detail.id.text.substr(6, 8),
      address: e.detail.address.text,
      image_path1: e.detail.image_path
    })
    wx.uploadFile({
      url: 'https://images.tanyang.asia/api/idcardUpLoad.php',
      filePath: that.data.image_path1,
      name: 'idfile',
      method: 'post',
      success: function (res) {
        console.log('身份证正面上传成功：', res);
      }
    });
  },

  onSuccessB: function (e) {
    let that = this;
    that.setData({
      valid_date: e.detail.valid_date.text,
      image_path0: e.detail.image_path
    })
    wx.uploadFile({
      url: 'https://images.tanyang.asia/idcardUpLoad.php',
      filePath: that.data.image_path0,
      name: 'idfile',
      method: 'post',
      success: function (res) {
        console.log('身份证反面上传成功：', res);
       
      }
    });
  },

  onLoad: function () {
    // this.setData({
    //   openid: app.globalData.openid
    // })
    
  },
 
  
  onSubmit: function (e) {
    let that = this;
    wx.request({
      url: 'https://www.tanyang.asia/api/id.php',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        name: that.data.name,
        gender: that.data.gender,
        nationality: that.data.nationality,
        id: that.data.id,
        birthday: that.data.birthday,
        address: that.data.address,
        valid_date: that.data.valid_date,
        // imgList: JSON.stringify(that.data.imgList)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/me/me',
        })
      }
    })
  },

 
  
 

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
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