// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
onGotUserInfo:function(e){
  console.log('用户信息',e)

  wx.login({
    success:function(r){
      console.log('登录',r)
      wx.showLoading({
        title: '登录中...',
      })
      wx.request({
        url: getApp().globalData.url + '/home/user/login',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          code:r.code,
          user_name: e.detail.userInfo.nickName,
          head_img: e.detail.userInfo.avatarUrl,
        },
        success: function (res) {
          console.log('登录1',res)
          
          if(res.data.status==1){
            wx.hideLoading()
            wx.setStorage({
              key: 'result',
              data: res.data.result.key,
            })
            wx.setStorage({
              key: 'type',
              data: res.data.result.type,
            })
            if (res.data.result.type==1){
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            if (res.data.result.type == 0) {
              wx.reLaunch({
                url: '../headGroup/headGroup',
              })
            }
          }else{
            wx.hideLoading()
            wx.showLoading({
              title: res.data.msg,
            })
          }
          

        }
      })
    }
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