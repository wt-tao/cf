// pages/nearby/nearby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addr:function(){
    wx.navigateTo({
      url: '../addres/addres',
    })
  },
  sec:function(e){
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/group/choose',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        group_id: e.currentTarget.id
      },
      success: function (res) {
        console.log('选择团长', res)
        if(res.data.status==1){
          wx.showToast({
            title: '选择成功',
            duration:3000,
            success:function(){
              wx.reLaunch({
                url: '../index/index',
              })
            }
          })
        }
       
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
    console.log(options)
    var types = wx.getStorageSync('type')
    if (types == 0) {
      this.setData({
        typ: true,
        adde: '请选择地址'
      })
    }
    else {
      this.setData({
        typ: false,
        adde: this.data.adde
      })
    }
    if (options.add==undefined){
   
    wx.request({
      url: getApp().globalData.url + '/home/group/getAccessoryGroup',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
        address: options.address
      },
      success: function (res) {
        console.log('附近团长', res)
        wx.hideLoading()
        that.setData({
          list: res.data.result.group,
          adde: res.data.result.address,
        })
      }
    })
    }else{
      wx.request({
        url: getApp().globalData.url + '/home/group/getAccessoryGroup',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          key: wx.getStorageSync('result'),
          address: options.add
        },
        success: function (res) {
          console.log('附近团长', res)
          wx.hideLoading()
          that.setData({
            list: res.data.result.group,
            adde: res.data.result.address,
          })
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