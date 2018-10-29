// pages/home/home.js

var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://gank.io/api/today',
    category: [],
    results: {},
    today: '',
    day: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = util.formatDate(new Date());
    this.setData({
      today: today
    })
    this.requestData();
  },

  requestData: function () {
    var that = this;
    var day = that.data.day;
    if(day != '') {
      that.setData({
        url: "https://gank.io/api/day/" + day
      })
    }
    var url = that.data.url;
    wx.request({
      url: url,
      success: function (res) {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        var data = res.data;
        that.setData({
          category: data.category,
          results: data.results
        })
      } 
    })
  },

  /**
   * item的点击事件
   */
  didSelectedCell: function (event) {
  },

  /**
   * 图片的点击事件
   */
  clickImage: function (event) {
    var url = event.currentTarget.dataset.url;
    var imageList = new Array();
    imageList.push(url);
    wx.previewImage({
      current: url,
      urls: imageList,
    })
  },

  historyClick: function () {
    wx.navigateTo({
      url: '../history/history',
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
    var that = this;
    var selectDate = app.getSelectDate.selectDate;
    if ('' == selectDate) return;
    that.setData({
      day: selectDate,
      today: selectDate
    })
    that.requestData();
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
    var that = this;
    that.setData({
      url: "https://gank.io/api/today",
      newWeek: ""
    })
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中…',
    })

    that.requestData();
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