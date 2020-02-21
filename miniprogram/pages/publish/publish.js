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
    imgList:[],
    image: [],
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
    czid:'',
    emoji:`😍-😤-😜-😝-😋-😘-😠-😩-😲-😞-😵-😰-😒-😚-😷-😳-😃-😅-😆-😁-😂-😊-☺-😄-😢-😭-😨-😣-😡-😌-😖-😔-😱-😪-😏-😓-😥-😫-😉-🙅-🙆-🙇-🙈-🙊-🙉-🙋-🙌-🙍-🙎-🙏-☀-☁-☔-⛄-⚡-🌀-🌁-🌂-🌃-🌅-🌈-✊-✋-✌-👊-👍-☝-👆-👇-👈-👉-👋-👏-👌-👎-👐-💉-💊`,
    emojiArr:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78'],
    emojis:[],
    isEmoji:false,
    emojiHeight:0,
    footHeight:100
  },

  emojiBtn: function(e) {
    let index = e.currentTarget.dataset.i;
    if (this.data.content) {
      this.setData({
        content: this.data.content + this.data.emojis[index].char
      })
    } else {
      this.setData({
        content: this.data.emojis[index].char
      })
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
    console.log('showEmoji')
  },

  onEmoji: function() {
    this.setData({
      isEmoji: true,
      emojiHeight:400,
      footHeight:500
    })
    // this.showEmoji()
    
  },

  hidEmoji: function() {
    this.setData({
      isEmoji: false,
      emojiHeight:0,
      footHeight:100
    })
    
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

  ChooseImage: function() {
    var that = this;
    var istip = false;
    var Img1 = [];
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgSrc = res.tempFilePaths;
        for (var i = 0; i < imgSrc.length; i++) {
          wx.uploadFile({
            url: 'https://images.t0k.xyz/upload.php', 
            filePath: imgSrc[i],
            name: 'imgfile',
            method: 'post',
            success: function(ress) {
              console.log(ress.data);
              var gottaJson = JSON.parse(ress.data);
              var img = that.data.imgList
              img.push(gottaJson.data);
              that.setData({
                imgList: img
              })
            },
            fail: function(res) {
              console.log(res);
              console.log('接口调用失败');
            }
          });
        }
        that.setData({
          imgSrc: imgSrc,
          istip: istip,
        });
      }
    })
  },

  // ChooseImage() {
  //   var that = this;
  //   wx.chooseImage({
  //     count: 4, //默认9
  //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album','camera'], //从相册或者相机选择
  //     success: (res) => {
  //       var tempFilePaths = res.tempFilePaths;
        
  //         that.setData({
  //           imgList: that.data.imgList.concat(tempFilePaths)
  //         }) 
  //     }
  //   });
  // },
  ViewImage(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.imgList,
      current: e.currentTarget.dataset.url
    });
    
  },
  DelImg(e) {
    var that = this;
    wx.showModal({
      title: '橙知',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          that.data.imgList.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            imgList: that.data.imgList
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
        city:that.data.city,
        imgList:JSON.stringify(that.data.imgList)
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


  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onOpen: function(e) {
    this.setData({
      whom: open
    })
    console.log(whom)
  },

  onPrivacy: function(e) {
    this.setData({
      whom: privacy
    })
    console.log(whom)
  },


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