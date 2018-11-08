//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ids: 1,
    list: [{ id: '1', text: '今日必抢' }, { id: '2', text: '蔬菜水果' }, { id: '3', text: '水产冻品' }, { id: '4', text: '休闲食品' }, { id: '5', text: '肉禽蛋品' }, { id: '6', text: '生活美妆' },  { id: '7', text: '粮油调味' },  { id: '8', text: '秒杀商品' },  { id: '9', text: '新晋爆品' },  { id: '10', text: '热销商品' },  { id: '11', text: '历史热卖' },  { id: '12', text: '奶品水饮' },]
  },
  list:function(e){
    // console.log(e)
    this.setData({
      ids: e.currentTarget.id
    })
  },
  // 团长
  recruit:function(){
    wx.navigateTo({
      url: '../recruit/recruit',
    })
  },
  // 供应商
  join: function () {
    wx.navigateTo({
      url: '../join/join',
    })
  },
  comdity_detail: function() {
    wx.navigateTo({
      url: '../comdity_detail/comdity_detail',
    })
  },

  onLoad: function () {
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.reLaunch({
            url: '../login/login',
          })
        }

      }
    })
   
  },

})
