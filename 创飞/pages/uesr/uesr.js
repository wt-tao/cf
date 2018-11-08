// pages/uesr/uesr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addres: true,
  },
  bindAddrestap:function(){
    this.setData({
      addres:true
    })
  },
  obtain:function(){
    this.setData({
      addres: false
    })
  },
  see:function(e){
    wx.navigateTo({
      url: '../order/order?id=' + e.currentTarget.id + '&title=' + e.currentTarget.dataset.title ,
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
    var that=this
    wx.request({
      url: getApp().globalData.url + '/home/user/center',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result')
      },
      success: function (res) {
        console.log('个人中心', res)
        var take_code = res.data.result.take_code.split('')
        that.setData({
          take_code: take_code,
          user: res.data.result
        })
      }
    })
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