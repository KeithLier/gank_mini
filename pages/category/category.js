Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['all', '福利', '前端', 'Android', 'iOS', '瞎推荐', '拓展资源','休息视频','App'],
    currentTab: 0,
    scrollLeft: 0,
    currentPage: 1,
    contents: [],
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.loadingData();
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight;
        that.setData({
          contentHeight: height
        });
      }
    });
  },

  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    var index = e.target.dataset.index;
    if (this.data.currentTab == index) {
      return false;
    } else {
      this.setData({
        currentTab: index,
        currentPage: 1
      })
    }
  },

  switchTab: function(e) {
    var that = this;
    var cur = e.detail.current;
    this.setData({
      currentTab: cur,
      currentPage: 1
    });
    that.checkColor();
    that.loadingData();
  },

  checkColor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  
  loadingData: function() {
    wx.showLoading({
      title: '',
    })
    var that = this;
    var page = that.data.currentPage;
    var title = that.data.tabs[that.data.currentTab];
    var url = 'https://gank.io/api/data/' + title + '/10/' + page;
    wx.request({
      url: url,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        if(!res.data.erroer) {
          var results = res.data.results;
          if(page == 1) {
            that.setData({
              contents: results
            })
          } else {
            var contents = that.data.contents;
            contents = contents.concat(results);
            that.setData({
              contents: contents
            })            
          }
        }
      }
    })
  },
  
  onPullRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.setData({
      currentPage: 1,
      // isLoadingMore: false
    })
    that.loadingData();
  },

  loadMore: function () {
    var that = this;

    var page = that.data.currentPage;
    page = page + 1;
    that.setData({
      currentPage: page,
      // isLoadingMore: false
    })
    that.loadingData();
  },

  didSelectedCell: function () {
    wx.showToast({
      title: '敬请期待',
    })
  },

  didSelectedImage: function (e) {
    var url = e.currentTarget.dataset.url;
    var arrayObj = new Array();
    arrayObj.push(url);
    wx.previewImage({
      current: url, 
      urls: arrayObj 
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