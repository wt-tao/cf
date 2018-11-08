// pages/headGroup/headGroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:2000
    })
    var that=this
    var types = wx.getStorageSync('type')
    if(types==0){
      this.setData({
        typ:true
      })
    }
    else{
      this.setData({
        typ: false
      })
    }
    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=QPHBZ-INS36-47USQ-EEPJW-E4NR3-FIF42&get_poi=1', data: {},
          header: { 'Content-Type': 'application/json' },
          success: function (ops) {
            console.log(ops.data)
            
            wx.request({
              url: getApp().globalData.url + '/home/group/getAccessoryGroup',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                // 'content-type': 'application/json;charset=utf-8',
              },
              data: {
                key: wx.getStorageSync('result'),
                address: ops.data.result.address
              },
              success: function (res) {
                console.log('附近团长', res)
                
                that.setData({
                  list: res.data.result
                })
              }
            })
         
          }
        })

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