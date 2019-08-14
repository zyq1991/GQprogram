// start-learning.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '假设有两个变量'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let miniOpenId = options.miniOpenId;
    // let eId = options.eId;
    // this.setData({
    //   miniOpenId: miniOpenId,
    //   eId: eId
    // })
    // Get("/cp/video/push?miniOpenId=" + miniOpenId + "&eId=" + eId).then(res => {
    //   if (res.data.success) {
    //     this.setData(res.data.data)
    //   }
    // })
    Get("/cp/video/push?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&eId=1").then(res => {
      if (res.data.success) {
        this.setData(res.data.data);
        Get("/cp/question/push?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&eId=1&exerciseType=2").then(res=>{
          console.log(res);
        })
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
  comment: function() {
    wx.navigateTo({
      url: '../comment-detail/comment-detail?videoNo='+this.data.videoNo
    })
  }
})