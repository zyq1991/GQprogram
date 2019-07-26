// pages/question-page/question-page.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: "",
    isCorrect:false,
    isWrong:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    Get("/cp/startansque?userId=1&eId=2&qId=q_0002&qType=1").then(res => {


      let questID = res.data.qId;
      Get("/cp/findcpquestion/" + questID).then(res => {
        this.setData(res.data);
        console.log(this.data);
      })
    })
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
  checked: function(e) {
    var that = this;
    var id = e.target.id;
    console.log(id);
  },
  next: function() {
    wx.navigateTo({
      url: "../fill-blanks-test-page/fill-blanks-test-page"
    })
  }

})