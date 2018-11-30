//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSetting', res)
        if (!res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../login/login',
          })
        }

      }
    })
    // 获取用户信息
 
  },
  globalData: {
    userInfo: null,
    url:'https://cf.wm50.mingtengnet.com'
  }
})