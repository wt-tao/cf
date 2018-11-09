//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ids: 1,
    countDownList: [],
    actEndTimeList: []
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
  comdity_detail: function(e) {
    wx.navigateTo({
      url: '../comdity_detail/comdity_detail?id=' + e.currentTarget.id,
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
    var that = this
    wx.request({
      url: getApp().globalData.url + '/home/goods/goodsList',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        cat_id: 1,
      },
      success: function (res) {
        console.log('商品列表', res)
        wx.hideLoading()
        var goodslist = res.data.result
        for (var i = 0; i < goodslist.length;i++){
          var date = new Date();
          var now = date.getTime();
          console.log('now', now)
          var endDate = goodslist[i].end_time * 1000;//设置截止时间

          // var end = endDate.getTime();
          console.log('endDate', endDate)
          var leftTime = endDate - now; //时间差                              
          var d, h, m, s, ms;
          console.log('leftTime', leftTime)
          if (leftTime >= 0) {
            // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            d = Math.floor(leftTime / 1000 / 60 / 60);
            // h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
            ms = Math.floor(leftTime % 1000);
            ms = ms < 100 ? "0" + ms : ms
            s = s < 10 ? "0" + s : s
            m = m < 10 ? "0" + m : m
            h = h < 10 ? "0" + h : h

            goodslist[i].end_time = d + ":"  + m + ":" + s;
              //递归每秒调用countTime方法，显示动态时间效果
            // setTimeout(that.onLoad, 1000);

          }
          else {
            console.log('已截止')
            that.setData({
              countdown: '00:00:00'
            })
          }
        }
        that.setData({
          countDownList: goodslist,
        })
        
      }
    });
    
  },





  onShow:function(){
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    var that=this
    wx.request({
      url: getApp().globalData.url + '/home/index/index',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        key: wx.getStorageSync('result'),
      },
      success: function (res) {
        console.log('首页数据', res)
        
        that.setData({
          list: res.data.result.goods_category,
          banner: res.data.result.banner,
          group: res.data.result.group,
        })
        wx.hideLoading()
      }
    })
  },

})
