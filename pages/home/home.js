// pages/home/home.js

var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://gank.io/api/today',
    screenWidth: 0,
    banners: [],
    category: [],
    results: {},
    today: '',
    day: '',
    categories:[
      {
        "name":"专题分类",
        "category":"Article"
      },
      {
        "name":"干货分类",
        "category":"GanHuo"
      },
      {
        "name":"妹子图",
        "category":"Girl"
      }
    ],
    types: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = util.formatDate(new Date());
    this.setData({
      today: today
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.windowWidth
        });
      }
    });
    this.getBanners();
    this.getRandomData();
  },

  getBanners: function () {
    var that = this;
    wx.request({
      url: "https://gank.io/api/v2/banners",
      success: function (res) {
        var data = res.data.data;
        that.setData({
          banners: data
        })
      } 
    })
  },
  // 获取随机20条数据
  getRandomData: function () {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中…',
    })
    let random = (Math.random() * 100).toFixed(0);
    let index = random % this.data.categories.length;
    let category = this.data.categories[index];
    let cate = category["category"]
    var that = this;
    let url =  "https://gank.io/api/v2/categories/" + cate;
    wx.request({
      url:url,
      success: function (res) {
        let data = res.data.data;
        let idx = random % data.length;
        let item = data[idx];
        let u = "https://gank.io/api/v2/random/category/" + cate + "/type/" + item["type"] + "/count/20"
        wx.request({
          url:u,
          success: function (res) {  
            wx.hideNavigationBarLoading()
            wx.hideLoading()    
            let results = res.data.data;   
            that.setData({
              results: results
            })   
          } 
        })
      } 
    })
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

  bannerClick: function(e) {
    var url = e.currentTarget.dataset.item.url;
    wx.navigateTo({
      url: '../webView/webView' + "?url=" + encodeURIComponent(url)
    })

  },
  /**
   * item的点击事件
   */
  didSelectedCell: function (event) {
    var url = event.currentTarget.dataset.item.url;
    wx.navigateTo({
      url: '../webView/webView' + "?url=" + encodeURIComponent(url)
    })
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


    this.getRandomData();
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