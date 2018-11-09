// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ id: 9, title: '全部' }, { id: 0, title: '待付款' }, { id: 1, title: '待配送' }, { id: 2, title: '已发货' }, { id: 3, title: '待自提' }, { id: 4, title: '已完成' }]
  },
  list:function(e){
    this.setData({
      ids: e.currentTarget.id
    })
  },
  order_detail:function(e){
    wx.navigateTo({
      url: '../order_detail/order_detail?id=' + e.currentTarget.dataset.order_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    console.log(options)
      wx.setNavigationBarTitle({
        title: options.title,
      })
      this.setData({
        ids:options.id
      })
    if (options.id==9){
      options.id=''
    }
    var type = wx.getStorageSync('boss')
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/order/index',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        type: type,
        order_status: options.id
      },
      success: function (res) {
        console.log('订单', res)
        that.setData({
          lists: res.data.result,
        })
        wx.hideLoading()
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