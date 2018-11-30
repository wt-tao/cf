// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ id: 9, title: '全部' }, { id: 0, title: '待付款' }, { id: 1, title: '待配送' }, { id: 2, title: '已发货' }, { id: 3, title: '待自提' }, { id: 4, title: '已完成' }]
  },

  searcg_input: function (e) {
    this.setData({
      keywords: e.detail.value
    })
  },

  search: function () {
    var that = this 
    var take_code= this.data.keywords
    if (take_code==undefined){
      wx.showToast({
        title: '不能为空',
        icon:'loading',
      })
    }else{
    wx.request({
      url: getApp().globalData.url + '/home/order/get_user_order',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        take_code: take_code
      },
      success: function (res) {
        console.log('取货码', res)
        wx.showToast({
          title: res.data.msg,
          icon: 'loading',
          duration: 3000,
        })
        that.setData({
          lists: res.data.result,
        })
        wx.hideLoading()
      }
    })
    }
  },

  list:function(e){
    this.setData({
      ids: e.currentTarget.id
    })
    var ids = e.currentTarget.id
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    if (e.currentTarget.id == 9) {
      ids = ''
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
        order_status: ids
      },
      success: function (res) {
        console.log('订单', res)
        that.setData({
          type: type,
          lists: res.data.result,
        })
        wx.hideLoading()
      }
    })
  },
  order_detail:function(e){
    wx.navigateTo({
      url: '../order_detail/order_detail?id=' + e.currentTarget.dataset.order_id,
    })
  },
  del:function(e){
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/order/delOrder',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        order_id: e.currentTarget.id
      },
      success: function (res) {
        console.log('删除订单', res)
        if (res.data.status==1){
          wx.showToast({
            title: '删除成功',
            duration: 3000,
            success: function(res) {
                  wx.reLaunch({
                    url: '../uesr/uesr',
                  })
            },
          })
        }
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    var order_status = options.id
    if (options.uid==undefined){
    console.log(options)
      wx.setNavigationBarTitle({
        title: options.title,
      })
      this.setData({
        ids: order_status
      })
    if (options.id==9){
      order_status=''
    }
    var type = wx.getStorageSync('boss')
    
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
        order_status: order_status
      },
      success: function (res) {
        console.log('订单', res)
        that.setData({
          lists: res.data.result,
        })
        wx.hideLoading()
      }
    })
    }
    else{
      this.setData({
        ids: options.id
      })
      wx.setNavigationBarTitle({
        title: '全部订单',
      })
      wx.request({
        url: getApp().globalData.url + '/home/order/get_user_order',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          key: wx.getStorageSync('result'),
          user_id : options.uid,
        },
        success: function (res) {
          console.log('团员订单', res)
          wx.showToast({
            title: res.data.msg,
            icon:'loading',
            duration:3000,
          })
          that.setData({
            lists: res.data.result,
          })
          wx.hideLoading()
        }
      })
    }
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