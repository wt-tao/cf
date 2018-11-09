// pages/addres/addres.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  key:function(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  search:function(){
  var that=this
   
          wx.request({
            url: 'https://apis.map.qq.com/ws/place/v1/suggestion?keyword=' + this.data.keyword + '&key=QPHBZ-INS36-47USQ-EEPJW-E4NR3-FIF42&page_index=1&page_size=20', data: {},
            header: { 'Content-Type': 'application/json' },
            success: function (ops) {
              console.log(ops)
              that.setData({
                list: ops.data.data,

              })     
        }
      })
  },
  seclect:function(e){
    console.log(e)
    var add = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../nearby/nearby?add=' + add,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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