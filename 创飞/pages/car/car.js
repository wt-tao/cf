// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    a1: true,
    a2: false,
  },
  // 全选
  aselectList: function (e) {
    console.log(e)
    var selected = e.currentTarget.dataset.selected
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/cart/allSelect',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        selected: selected
      },
      success: function (res) {
        console.log('全部修改', res)
        if (res.data.status == 1) {
          that.onShow()
          that.setData({
 
            a1: true,
            a2: false,
          })
        }

      }
    })
  },
  aselectLists: function (e) {
    console.log(e)
    var selected = e.currentTarget.dataset.selected
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/cart/allSelect',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        selected: selected
      },
      success: function (res) {
        console.log('全部修改', res)
        if (res.data.status == 1) {
          that.onShow()
          that.setData({

            a1: false,
            a2: true,
          })
        }

      }
    })
  },
  // 单选
  selectList: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    var selected = e.currentTarget.dataset.selected
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/cart/editSelect',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        id: id,
        selected: selected
      },
      success: function (res) {
        console.log('单个修改', res)
        if (res.data.status == 1) {
          that.onShow()
        }

      }
    })
  },

  // 数量
  num:function(e){
    var num = e.currentTarget.dataset.num
    var id = e.currentTarget.id
    var that = this
    var numbers = e.currentTarget.dataset.number
    if (numbers==0){
      num = num-1
    }
    if (numbers == 1) {
      num = num + 1
    }
    wx.request({
      url: getApp().globalData.url + '/home/cart/editNum',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        id: id,
        num: num
      },
      success: function (res) {
        console.log('数量修改', res)
        if (res.data.status == 1) {
          that.onShow()
        }

      }
    })
  },
  // 结算
  sumbit:function(){
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/payment/addOrder',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
      },
      success: function (res) {
        console.log('结算', res)
       if(res.data.status==1){
         wx.showModal({
           title: '提交成功',
           content: res.data.msg,
           success:function(r){
             if(r.confirm){
               wx.navigateTo({
                 url: '../user/user',
               })
             }
           }
         })
       }else{
         wx.showToast({
           title: res.data.msg,
           icon:"loading",
           duration:3000,
         })
       }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration: 2000
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
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/cart/index',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
      },
      success: function (res) {
        console.log('购物车', res)
        wx.hideLoading()
        if (res.data.result.cartList.length != res.data.result.total_price.num){
            that.setData({
              a1: false,
              a2: true,
            })
        }
        that.setData({
          group: res.data.result.group,
          cartList: res.data.result.cartList,
          total_price: res.data.result.total_price
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