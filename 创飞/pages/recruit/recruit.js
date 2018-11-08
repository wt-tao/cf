// pages/recruit/recruit.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  name:function(e){
    this.setData({
      user_name:e.detail.value,
    })
  },
  area: function (e) {
    this.setData({
      area: e.detail.value,
    })
  },
  addres: function (e) {
    this.setData({
      addres: e.detail.value,
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  tj:function(){
    var that=this
    if (this.data.user_name==undefined){
      wx.showModal({
        title: '资料不完整',
        content: '请填写您的姓名',
      })
    }
    else if (this.data.area == undefined) {
      wx.showModal({
        title: '资料不完整',
        content: '请填写您所在城区',
      })
    }
    else if (this.data.addres == undefined) {
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
    else{
      // // 实例化API核心类
      // var qqmapsdk = new QQMapWX({
      //   key: 'QPHBZ-INS36-47USQ-EEPJW-E4NR3-FIF42'
      // });
      // // 调用接口
      // qqmapsdk.search({
      //   keyword: this.data.area + this.data.addres,
      //   success: function (res) {
      //     console.log(res);
      //   },
      //   fail: function (res) {
      //     console.log(res);
      //   },
     
      // })
      wx.request({
        url: getApp().globalData.url + '/home/group/addGroup',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          key: wx.getStorageSync('result'),
          user_name: this.data.user_name,
          area: this.data.area,
          address: this.data.addres,

          phone: this.data.phone,
        },
        success: function (res) {
          console.log('团长招募', res)
          if (res.data.status==1){
            wx.showModal({
              title: '提交成功',
              content: res.data.msg,
              success:function(r){
              
                if(r.confirm){
                  wx.navigateBack({
                    delta:1
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