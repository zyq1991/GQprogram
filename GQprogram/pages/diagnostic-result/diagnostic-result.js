// pages/diagnostic-result/diagnostic-result.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let miniOpenId = options.miniOpenId;
    let eId = options.eId;
    this.setData({
      miniOpenId: miniOpenId,
      eId: eId
    })
    //获取诊断结果
    Get("/cp/cpexam/report?miniOpenId=" + miniOpenId + "&eId=" + eId).then(res => {
      if (res.data.success) {
        this.setData(res.data.data)
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
  //开始学习按钮，跳转到视频页面，开始学习
  startLearning: function() {
    wx.redirectTo({
      url: '../start-learning/start-learning?miniOpenId='+this.data.miniOpenId+'&eId='+this.data.eId,
    })
  }
})