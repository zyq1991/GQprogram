// start-learning.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '假设有两个变量',
    isMark: false
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
    Get("/cp/video/push?miniOpenId=" + miniOpenId + "&eId=" + eId).then(res => {
      if (res.data.success) {
        this.setData(res.data.data)
      } else {

      }
    })
    // Get("/cp/video/push?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&eId=1").then(res => {
    //   if (res.data.success) {
    //     this.setData(res.data.data);
    //     Get("/cp/question/push?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&eId=1&exerciseType=2").then(res=>{
    //       console.log(res);
    //     })
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
  comment: function() {
    wx.navigateTo({
      url: '../comment-detail/comment-detail?videoNo=' + this.data.videoNo
    })
  },
  viedoEnded() { //视频播放结束直接跳转做题
    this.pushQuestion();
  },
  //判断是否点赞
  isMarkIt: function(e) {
    this.setData({
      isMark: !this.data.isMark
    })
  },
  //跳转到评论页面
  toComment: function() {
    wx.navigateTo({
      url: "../personal-comment/personal-comment?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&videoNo=" + this.data.videoNo
    })
  },
  //视频暂停状态弹框
  pause: function() {
    wx.showModal({
      title: '是否开始练习',
      success: (res) => {
        if (res.confirm) {
          Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&exerciseType=2").then(res => {
            this.setData(res.data.data);
            if (res.data.success) {
              let qtype = res.data.data.qType,
                qId = res.data.data.id,
                isEndQuestion = res.data.data.isEndQuestion;
              console.log(res.data)
              if (qtype == '2') {
                wx.redirectTo({
                  url: "../question-page/question-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=2" + "&isEndQuestion=" + isEndQuestion
                })

              } else {
                wx.redirectTo({
                  url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=2" + "&isEndQuestion=" + isEndQuestion
                })

              }
            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  pushQuestion: function() { //开始做题
    Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&exerciseType=2").then(res => {
      this.setData(res.data.data);
      if (res.data.success) {
        let qtype = res.data.data.qType,
          qId = res.data.data.id,
          isEndQuestion = res.data.data.isEndQuestion;
        console.log(res.data)
        if (qtype == '2') {
          wx.redirectTo({
            url: "../question-page/question-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=2" + "&isEndQuestion=" + isEndQuestion
          })

        } else {
          wx.redirectTo({
            url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=2" + "&isEndQuestion=" + isEndQuestion
          })

        }
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }

    })
  },
  videoErrorCallback: function() {
    wx.showModal({
      title: '该视频不存在',
      success(res) {
        if (res.confirm) {
          // this.pushQuestion();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})