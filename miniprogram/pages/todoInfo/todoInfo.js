const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  data: {
    task:{}
  },

  pageData: {

  },

  onLoad: function (options) {
    this.pageData.id = options.id
    todos.doc(options.id).get().then(res => {
      this.setData({
        task:res.data
      })
    })
  },

  viewLocation: function () {
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name:this.data.task.location.name,
      address:this.data.task.location.address
    })
  }
})