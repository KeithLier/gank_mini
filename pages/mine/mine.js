// pages/mine/mine.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [{
        "name": "all",
        "url": '../../images/menu/all.png'
      },
      {
        "name": "iOS",
        "url": '../../images/menu/ios.png'
      },
      {
        "name": "App",
        "url": '../../images/menu/app.png'
      },
      {
        "name": "Android",
        "url": '../../images/menu/android.png'
      },
      {
        "name": "前端",
        "url": '../../images/menu/frontend.png'
      },
      {
        "name": "瞎推荐",
        "url": '../../images/menu/recomm.png'
      },
      {
        "name": "拓展资源",
        "url": '../../images/menu/resource.png'
      },
      {
        "name": "休息视频",
        "url": '../../images/menu/video.png'
      },
      {
        "name": "福利",
        "url": '../../images/menu/meizi.png'
      }
    ],

    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    getUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  bindGetUserInfo: function(e) {
    var userInfo = e.detail.userInfo;
    this.setData({
      userInfo: userInfo,
      getUserInfo: true
    })
  },

  handleTapMiddle: function (e) {

  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})