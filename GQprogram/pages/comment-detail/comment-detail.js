// pages/comment-detail/comment-detail.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLikeIt: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let videoNo = options.videoNo;
    this.setData({
      miniOpenId: options.miniOpenId,
      eId: options.eId
    })
    let videoNo = 1;
    Get('/cp/comment/list?videoNo=' + videoNo).then(res => {
      if (res.data.success) {
        this.setData({
          contents: res.data.data.contents
        });
      }
    })
    console.log(this.data);
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
  //点赞
  likeIt: function() {
    this.setData({
      isLikeIt: !this.data.isLikeIt
    })
  },
  submit: function() {
    Get('/cp/comment/saveContent?miniOpenId=' + this.data.miniOpenId + '&videoNo=' + this.data.videoNo + '&content=' + this.data.content).then(res => {
      if (res.data.success) {
        this.setData({
          contents: res.data.data.contents
        });
      }
    })
  },
  //获取评论输入框内容
  getContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  }
})