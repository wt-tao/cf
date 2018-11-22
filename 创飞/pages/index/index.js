//index.js


var codes = require('../../utils/time.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    ids: 1,
    keywords:'',
    countDownList: [],
    
  },
  searcg_input:function(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  search:function(){   
      var that=this
      this.setData({
        ids:'',
        keywords: this.data.keywords
      })
    this.main()
    this.setData({
      s1: false
    })
  },
  list:function(e){
    // console.log(e)
   wx.showToast({
     title: '加载中...',
     icon:'loading',
     duration:3000,
   })
    this.setData({
      keywords:'',
      ids: e.currentTarget.id
    })
    var that = this
    var data = {
      cat_id: e.currentTarget.id,
    }
    this.main()
    
  },
  nack:function(e){
    var id = e.currentTarget.id
    if(id==2){
      wx.navigateTo({
        url: '../recruit/recruit',
      })
    }
    if(id==3){
      wx.navigateTo({
        url: '../join/join',
      })
    }
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
    if (wx.getStorageSync('result')==''){
      wx.reLaunch({
        url: '../login/login',
      })
    }
    this.main()
  },

  main: function (){
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
  wx.request({
    url: getApp().globalData.url + '/home/goods/goodsList',
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
      // 'content-type': 'application/json;charset=utf-8',
    },
    data: {
      cat_id: this.data.ids,
      keywords: this.data.keywords,
    },
    success: function (res) {
      console.log('商品列表', res)
      if (res.data.result.length==0){
        wx.showToast({
          title: '暂无商品',
          icon: 'loading',
          duration: 3000,
        })
        _this.setData({
          countDownList: res.data.result,
        })
      }
     else if (res.data.status==1){
        wx.hideLoading()
      var goodslist = res.data.result
      for (var i = 0; i < goodslist.length; i++) {
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

          goodslist[i].end_time = d + ":" + m + ":" + s;
          //递归每秒调用countTime方法，显示动态时间效果
          // setTimeout(that.main, 1000);
          codes.getCode(_this, leftTime);　　//调用倒计时函数
          // wx.hideLoading()
        }
        else {
          goodslist[i].end_time = '已截止';
          console.log('已截止')
        }
      }
        _this.setData({
        countDownList: goodslist,
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'loading',
        duration:3000,
      })
    }
    }
  });

},



  onShow:function(){
    this.setData({
      ids:1,
      s1: true,
      keywords:'',
    })
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    var that=this
    setTimeout(function()
    {
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
      }) },1000)
   
  },

})
