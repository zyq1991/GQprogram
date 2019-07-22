//index.js
//获取应用实例

const app = getApp()

Page({
  onLoad: function() {
    wx.navigateTo({
      // url: '../ready-diagnosis/ready-diagnosis'
      url: '../component/calculator/calculator'
    })

  },
  

})