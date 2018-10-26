// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://gank.io/api/today',
    category: [],
    results: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
  },

  requestData: function () {
    var that = this;
    var url = that.data.url;
    wx.request({
      url: url,
      success: function (res) {
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