// pages/fill-blanks-test-page/fill-blanks-test-page.js
// var that = this
Page({


  /**
   * 组件的初始数据
   */
  data: {
    text: "假设有两个分类变量X和Y，它们的值域分别为{x1,x2}和{y1,y2}，其中2x2列联表为:",
    isShow: false
  },


  next: function() {
    wx.redirectTo({
      url: '../diagnostic-result/diagnostic-result',
    })
  },
  calcular: function(e) {
    var that = this;
    that.setData({
      isShow: true
    });

  }
})