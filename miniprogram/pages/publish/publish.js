// pages/publish/publish.js
const db = wx.cloud.database();
const usersInfo = db.collection('usersInfo');
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
    emoji:`😍-😤-😜-😝-😋-😘-😠-😩-😲-😞-😵-😰-😒-😚-😷-😳-😃-😅-😆-😁-😂-😊-😄-😢-😭-😨-😣-😡-😌-😖-😔-😱-😪-😏-😓-😥-😫-😉-👀-🙅-🙆-🙇-🙈-🙊-🙉-🙋-🙌-🙍-🙎-🙏-☀-☁-☔-⛄-⚡-🌀-🌁-🌂-🌃-🌅-🌈-✊-✋-✌-👊-👍-☝-👆-👇-👈-👉-👋-👏-👌-👎-👐-💉-💊-🌏-🌙-🌕-🌛-🌟-⌛-🍉-🍊-🍅-🍆-🍈-🍍-🍇-🍑-🍏-👪-👫-👮-🔥-📞-☎-💼-🏀-⚽-🔍-💡-💣-💢-➕-➖-✖-➗-🈲-🈳-🈴-🈵-🈶-🈚-🈸-🈹-🈯-🈺-🉐-🚲-⛔-🚩-💗-💘-💔-💓-💙-💚-💛-💜-💞-❓-❗-🐧-🐩-🐵-🐹-🐷-🐶-🐴-🐮-🍺-🐍-🐘-🐨-🐗-🐌-🐞-🐯`,
    emojiArr:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135','136','137','138','139','140','141','142','143','144','145','146','147','148','149','150','151'],
    emojis:[],//用作保存表情与id的数组
    isEmoji:false,//显示与隐藏表情栏
    emojiHeight:0,//动态改变表情框的高度
    footHeight:100//动态改变外部容器的高度
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
  },

  onEmoji: function() {
    this.showEmoji()
    this.setData({
      isEmoji: true,
      emojiHeight:300,
      footHeight:500
    })
    
  },

  hidEmoji: function() {
    this.setData({
      isEmoji: false,
      emojis:[],
      emojiHeight:0,
      footHeight:100
    })
    
  },
  
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  // onClick(event) {
  //   const { name } = event.currentTarget.dataset;
  //   if( name == 1 ) {
  //     this.setData({
  //       radio: name,
  //       whom: "公开",
  //       open: 'true'
  //     })
  //   }if(name == 2) {
  //     this.setData({
  //       radio: name,
  //       whom: "仅关注我的人",
  //       open: 'focus'
  //     })
  //  }if(name == 3){
  //   this.setData({
  //     radio: name,
  //     whom: "仅自己",
  //     open: 'self'
  //   })
  //  }

  // },

  ChooseImage: function() {
    var that = this;
    var istip = false;
    var Img1 = [];
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
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
        },
      })
    } catch (error) {
      
    }
  },

  
  onSend: function(event) {

    var that = this;
    console.log(event)
    var locName = that.data.locName;
    if(locName=='所在位置'){
      locName='';
    }
    wx.request({
      url: 'https://www.t0k.xyz/api/addPubArticles.php',
      method:'POST',
      data: {
        openid:app.globalData.userInfo.openid,
        content: that.data.content,
        locName: locName,
        open:that.data.open,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        nickName:app.globalData.userInfo.nickName,
        gender:app.globalData.userInfo.gender,
        country:app.globalData.userInfo.country,
        province:app.globalData.userInfo.province,
        city:app.globalData.userInfo.city,
        imgList:JSON.stringify(that.data.imgList)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success () {
        that.onClose();
        that.setData({
          content: '',
          imgList: [],
          image: [],
          location: '',
          locName: '所在位置',
          whom: '公开',
          open: 'true',
          radio: '1',
          nickName: '',
          avatarUrl: '',
        })
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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success (res) {
              console.log(res)
            },
            fail () {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          })
        }
      }
    })
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