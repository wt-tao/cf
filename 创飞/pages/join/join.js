// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  name: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  user_name: function (e) {
    this.setData({
      user_name: e.detail.value,
    })
  },
  fw: function (e) {
    this.setData({
      fw: e.detail.value,
    })
  },
  city: function (e) {
    this.setData({
      city: e.detail.value,
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  tj: function () {
    var that = this
    if (this.data.user_name == undefined) {
      wx.showModal({
        title: '资料不完整',
        content: '请填写您的姓名',
      })
    }
    else if (this.data.name == undefined) {
      wx.showModal({
        title: '资料不完整',
        content: '请填写商品名称',
      })
    }
    else if (this.data.fw == undefined) {
      wx.showModal({
        title: '资料不完整',
        content: '请填写供应范围',
      })
    }
    else if (this.data.city == undefined) {
      wx.showModal({
        title: '资料不完整',
        content: '请填写您所在小区',
      })
    }
    else if (this.data.phone == undefined) {
      wx.showModal({
        title: '资料不完整',
        content: '请填写您的手机号',
      })
    }
    else {
      wx.request({
        url: getApp().globalData.url + '/home/group/addGys',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          key: wx.getStorageSync('result'),
          user_name: this.data.user_name,
          goods_name: this.data.name,
          area: this.data.fw,
          city: this.data.city,
          phone: this.data.phone,
        },
        success: function (res) {
          console.log('供应商加盟', res)
          if (res.data.status == 1) {
            wx.showModal({
              title: '提交成功',
              content: res.data.msg,
              success: function (r) {

                if (r.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
          else {
            wx.showModal({
              title: '出现错误',
              content: res.data.msg,
              success: function (r) {

              }
            })
          }
        }

      })
    }
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