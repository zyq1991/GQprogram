// pages/learning-summary/learning-summary.js
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
    let miniOpenId = options.miniOpenId;
    let eId = options.eId;
    this.setData({
      miniOpenId: miniOpenId,
      eId: eId
    })
    //学习总结
    Get("/cp/cpexam/end/report?miniOpenId=" + miniOpenId + "&eId=" + eId).then(res => {
      if (res.data.success) {
        this.setData(res.data.data)
      }
    })
    // Get("/cp/cpexam/end/report?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&eId=1").then(res => {
    //   if (res.data.success) {
    //     this.setData(res.data.data)
    //   }
    // })
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
  continue: function() {
    Get("/cp/learning/index?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690").then(res => {
      console.log(res)
      if (res.data.success) {
        let status = res.data.data.startLearning;
        // wx.redirectTo({
        //   url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
        // })
        if (status == 0) { //0表示开始页面
          wx.redirectTo({
            url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
          })
        } else { //1表示诊断结果页面
          wx.redirectTo({
            url: "../diagnostic-result/diagnostic-result?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
          })
        }
      } else {
        wx.showToast({
          title: '请检查网络',
        })
      }
    })
  }
})