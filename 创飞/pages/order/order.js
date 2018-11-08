// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ id: 1, title: '全部' }, { id: 2, title: '待付款' }, { id: 3, title: '待配送' }, { id: 4, title: '已发货' }, { id: 5, title: '待自提' }, { id: 6, title: '已完成' }]
  },
  list:function(e){
    this.setData({
      ids: e.currentTarget.id
    })
  },
  order_detail:function(e){
    wx.navigateTo({
      url: '../order_detail/order_detail?id=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      wx.setNavigationBarTitle({
        title: options.title,
      })
      this.setData({
        ids:options.id
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