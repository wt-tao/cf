// pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  sub:function(e){
    var order_id  = e.currentTarget.id
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/payment/getPay',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        order_id: order_id
      },
      success: function (res) {
        console.log('付款', res)
        if (res.data.status == 1) {
          wx.showLoading({
            title: '请求中...',
          })
          let timeStamp = res.data.result.timeStamp; //new Date().getTime(),
          console.log(timeStamp)
          let nonceStr = res.data.result.nonceStr;
          let packaged = res.data.result.package;
          let paySign = res.data.result.paySign;
          wx.hideLoading()
          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr, //随机字符串，长度为32个字符以下。
            'package': packaged,
            'signType': 'MD5',
            'paySign': paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                duration: 2000,
                success: function () {
                  wx.reLaunch({
                    url: '../user/user',
                  })
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "loading",
            duration: 3000,
          })
        }

      }
    })
  },
  sub1:function(e){
    var order_id = e.currentTarget.id
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/order/edit_order_status',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        order_id: order_id,
        type:3
      },
      success: function (res) {
        console.log('确认收货', res)
        if(res.data.status==1){
          wx.showToast({
            title: '收货成功',
            duration:3000,
            success:function(){
              wx.reLaunch({
                url: '../uesr/uesr',
              })
            }
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            duration: 3000,
           
          })
        }
      }
     
    })
  },
  sub2: function (e) {
    var order_id = e.currentTarget.id
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/order/edit_order_status',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        order_id: order_id,
        type: 4
      },
      success: function (res) {
        console.log('确认收货', res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '取货成功',
            duration: 3000,
            success: function () {
              wx.reLaunch({
                url: '../uesr/uesr',
              })
            }
          })
        }
        wx.showToast({
          title: res.data.msg,
          duration: 3000,

        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    var type = wx.getStorageSync('boss')
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/order/detail',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        order_id: options.id,
      },
      success: function (res) {
        console.log('订单详情', res)
        that.setData({
          lists: res.data.result,
          type: type,
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