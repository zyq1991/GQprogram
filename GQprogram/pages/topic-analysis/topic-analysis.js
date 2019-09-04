// pages/topic-analysis/topic-analysis.js
import {
  Get
} from '../../utils/request.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "假设有两个分类变量X和Y，它们的值域分别为{x1,x2}和{y1,y2}，其中2x2列联表为:"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let qId = options.qId,
      eId = options.eId;
    this.setData({
      qId: qId,
      eId: eId
    })
    console.log(options)
    Get("/cp/question/analysis?qId=" + qId).then(res => {
      if (res.data.success) {
        this.setData(res.data.data);
      }
    })
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

  },
  isEndStudy: function(e) {
    var isUnderstand = e.target.dataset.isunderstand;
    Get("/cp/question/endStudy?miniOpenId=" + app.globalData.miniOpenId + "&eId=" + this.data.eId + "&isUnderstand=" + isUnderstand).then(res => {
      if (res.data.success) {
        if (res.data.data.end) {
          wx.redirectTo({
            url: "../learning-summary/learning-summary?miniOpenId=" + app.globalData.miniOpenId + "&eId=" + this.data.eId
          })
        } else {
          wx.redirectTo({
            url: "../diagnostic-result/diagnostic-result?miniOpenId=" + app.globalData.miniOpenId + "&eId=" + this.data.eId
          })
        }
        // this.setData(res.data.data);
      }
    })
  }
})