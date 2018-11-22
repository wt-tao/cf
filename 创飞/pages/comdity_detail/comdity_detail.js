// pages/comdity_detail/comdity_detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: false,
    countdown: '', 
    endDate2: '',
    num:1,
	item:'请选择规格',
  
    clientHeight:'100%',
    overflow: 'auto',
  },
  ggtc:function(){
    
    var height = wx.getSystemInfoSync().windowHeight
   console.log(height)
    this.setData({
      clientHeight: height+'px',
      overflow:'hidden',
      sort: true,
    })
  },
  ggtcs:function(e){
    if (e.currentTarget.id!=1){
        wx.showModal({
          title: '暂未开团',
          content: '您选购的商品暂未开团，请等待开团后抢购',
        })
    }else{
      var height = wx.getSystemInfoSync().windowHeight
      console.log(height)
      this.setData({
        clientHeight: height + 'px',
        overflow: 'hidden',
        sort: true,
      })
    }
  },
  bindSorttap:function(){
    this.setData({
      clientHeight: '100%',
      overflow: 'auto',
      sort:false,
    })
  },
  jia:function(){
    this.setData({
      num: this.data.num+1
    })
  },
  jian: function () {
    var num = this.data.num
    if(num==1){
      this.setData({
        num: 1
      })
    }else{
    this.setData({
      num: this.data.num - 1
    })
    }
  },
  map:function(){
    var list=this.data.list
    var that=this
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        wx.openLocation({
          longitude: parseInt(list.take_address.longitude),
          latitude: parseInt(list.take_address.latitude)
        })
      }
    })
  },
  index:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  card: function () {
    wx.reLaunch({
      url: '../car/car',
    })
  },
  // 选择规格
  guige:function(e){
    this.setData({
		item:e.currentTarget.dataset.id,
      ids: e.currentTarget.id
    })
  },
  // 加入购物车
  add:function(){
    var that=this
    var goods_id = this.data.goods_id
    var goods_num = this.data.num
    var goods_spec = this.data.ids
    if (goods_spec==undefined){
        wx.showToast({
          title: '请选择规格',
          icon:'loading',
          duration:2000,
        })
    }else{
      wx.request({
        url: getApp().globalData.url + '/home/cart/addCart',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          goods_id: goods_id,
          key: wx.getStorageSync('result'),
          goods_num: goods_num,
          goods_spec: goods_spec,
        },
        success: function (res) {
          console.log('添加购物车', res)
          if (res.data.status==1){
            wx.showToast({
              title: '添加成功',
              duration:3000,
              success:function(){
                that.setData({
                  clientHeight: '100%',
                  overflow: 'auto',
                  sort: false,
                })
              }
            })
          }else{
            wx.showModal({
              title: '添加失败',
              content: res.data.msg,
            })
          }
        

        }
      })
    }
  },
  pay:function(){
    var that = this
    var goods_id = this.data.goods_id
    var goods_num = this.data.num
    var goods_spec = this.data.ids
    if (goods_spec == undefined) {
      wx.showToast({
        title: '请选择规格',
        icon: 'loading',
        duration: 2000,
      })
    } else {
      wx.request({
        url: getApp().globalData.url + '/home/payment/immediately_pay',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          goods_id: goods_id,
          key: wx.getStorageSync('result'),
          goods_num: goods_num,
          goods_spec: goods_spec,
        },
        success: function (res) {
          console.log('直接购买', res)
          if (res.data.status == 1) {
            wx.showLoading({
              title: '支付请求中...',
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

                      url: '../uesr/uesr',
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('result') == '') {
      wx.reLaunch({
        url: '../login/login',
      })
    }
    this.setData({
      id:options.id
    })
    console.log(options)
    wx.showLoading({
      title: '加载中...',
      duration: 2000
    })
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/home/goods/detail',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        goods_id: options.id,
        key: wx.getStorageSync('result'),
      },
      success: function (res) {
        console.log('商品详情', res)
        if (res.data.status==1){
          var da = res.data.result.content
          WxParse.wxParse('da', 'html', da, that, 5)

          
          that.setData({
            goods_id: options.id,
            list: res.data.result,
            endDate2: res.data.result.end_time
          })

          wx.hideLoading()    
          that.countTime()
        }
      
      }
    })
  },

  countTime() {
    var that = this;
    var date = new Date();
    var now = date.getTime();
    // console.log('now', now)
    var endDate = new Date(that.data.endDate2);//设置截止时间
    // console.log('endDate', endDate)
    var end = endDate.getTime();
    // console.log('end', end)
    var leftTime = end * 1000 - now; //时间差 
    // console.log('leftTime', leftTime)                          
    var d, h, m, s, ms;
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      ms = Math.floor(leftTime % 1000);
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        countdown: d + "天" + h + "：" + m + "：" + s,
      })
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.countTime, 100);
    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00'
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
    var list=this.data.list
    return {
      title: list.goods_name,
      // desc: that.data.common.introduction,
      imageUrl: list.header_original_img+list.original_img[0],
      path: '/pages/comdity_detail/comdity_detail?id=' + this.data.id,

      success: function (res) {
        console.log(res)
        // 转发成功
      },
     fail: function (res) {
        // 转发失败
      }
  }
  }
})