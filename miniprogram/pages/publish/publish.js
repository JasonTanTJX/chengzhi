// pages/publish/publish.js
const db = wx.cloud.database();
const users = db.collection('users');
var app = getApp();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    imgList:'',
    location:'',
    locName:'所在位置',
    show: false,
    whom: '公开',
    open: 'true',
    radio:'1',
    nickName:'',
    avatarUrl:'',
    gender:'',
    country:'',
    province:'',
    city:'',
    czid:''
  },
  
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    if( name == 1 ) {
      this.setData({
        radio: name,
        whom: "公开",
        open: 'true'
      })
    }if(name == 2) {
      this.setData({
        radio: name,
        whom: "仅关注我的人",
        open: 'focus'
      })
   }if(name == 3){
    this.setData({
      radio: name,
      whom: "仅自己",
      open: 'self'
    })
   }

  },

  ChooseImage() {
    var that = this;
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册或者相机选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          that.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
          
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
    
  },
  DelImg(e) {
    wx.showModal({
      title: '橙知',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  bindContentInput:function(event) {
    this.setData({
      content:event.detail.value
    })
  },

  chooseLocation: function(e) {
    try {
      wx.chooseLocation({
        success: (res) => {
          this.setData({
            latitude:res.latitude,
            longitude:res.longitude,
            locName:res.name,
            address:res.address
          })
            
          
          console.log(res)
          // app.globalData.th4 = res.name;
          // app.globalData.th5 = res.address;
        },
      })
    } catch (error) {
      
    }
  },

  getUserInfo: function(e) {
    var that = this;
    wx.cloud.callFunction({
      name:'getOpenId',
      complete: res => {
       users.where({
          _openid : res.result.openId
        }).get().then( res => {
          if (res.data[0].czid) {
            that.setData({
              czid: res.data[0].czid
            })
          }else{
            console.error(err)
          }
          
        });  
      }
    })
    
  },
  
  onSend: function(event) {
    // var myDate = new Date();
    // var Y =  myDate.getFullYear();
    // var Mo =  myDate.getMonth()+1;
    // var D = myDate.getDate();
    // var H = myDate.getHours();
    // var M =  myDate.getMinutes();
    // var S =  myDate.getSeconds();
    // var sendTime = `${Y}年${Mo}月${D}日 ${H}:${M}:${S}`;
    var that = this;
    that.submitPhoto();
    var locName = that.data.locName;
    if(locName=='所在位置'){
      locName='';
    }
    wx.request({
      url: 'https://www.t0k.xyz/addPubArticles.php',
      method:'POST',
      data: {
        czid:that.data.czid,
        content: that.data.content,
        locName: locName,
        open:that.data.open,
        avatarUrl:that.data.avatarUrl,
        nickName:that.data.nickName,
        gender:that.data.gender,
        country:that.data.country,
        province:that.data.province,
        city:that.data.city
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success () {
        wx.switchTab({
          url: '/pages/wall/wall',
        })
      }
    })

    
      
   
 
   },

   submitPhoto() {
    var that = this;
    wx.uploadFile({
     url: 'https://images.t0k.xyz/upload.php', //仅为示例，非真实的接口地址
     filePath: that.data.imgList,
     name: 'imgfile',
     success: function (res) {
    //  var data = JSON.parse(res.data);
     console.log(that.data.imgList);
     //do something
    //  if(data.code==1){
    //   wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 1000
    //   })
    //  }
     },
     complete(err){
       console.log(err)
     }
    })
    },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  // onOpen: function(e) {
  //   this.setData({
  //     whom: open
  //   })
  //   console.log(whom)
  // },

  // onPrivacy: function(e) {
  //   this.setData({
  //     whom: privacy
  //   })
  //   console.log(whom)
  // },


  onLoad: function (options) {
    var that = this;
    that.getUserInfo()
    
    wx.login({
      success : res => {
       
        if (res.code) {
          wx.getUserInfo({
            success: function(res) {
              
              that.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName : res.userInfo.nickName,
                  gender: res.userInfo.gender,
                  country: res.userInfo.country,
                  province: res.userInfo.province,
                  city: res.userInfo.city
              })
              
            },
            fail(error){
              wx.navigateTo({
                url: "/pages/login/login",
              })
            }
          })
        }else{
          console.error(err)
        }
      }
    })
  },

  onHideTabBar() {
    wx.hideTabBar()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onHideTabBar()
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