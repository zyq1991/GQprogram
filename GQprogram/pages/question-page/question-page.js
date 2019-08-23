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
    isCorrect: false,
    isWrong: false,
    nameId: "",
    result: '',
    option: '',
    optionContent: '',
    isChange: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let miniOpenId = options.miniOpenId,
      eId = options.eId,
      exerciseType = options.exerciseType,
      isEndQuestion = options.isEndQuestion;
    this.setData({
      miniOpenId: miniOpenId,
      eId: eId,
      exerciseType: exerciseType,
      isEndQuestion: isEndQuestion
    })
    Get("/cp/question/push?miniOpenId=" + miniOpenId + "&eId=" + eId + "&exerciseType=" + exerciseType).then(res => {
      if (res.data.success) {
        this.setData(res.data.data);
        this.setData({
          result: res.data.data.key
        })
        Get("/cp/startansque?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + res.data.data.id + "&exerciseType=" + exerciseType).then(res => {})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // Get("/cp/startansque?userId=1&eId=2&qId=q_0002&qType=1").then(res => {
    //   let questID = res.data.qId;
    //   Get("/cp/findcpquestion/" + questID).then(res => {
    //     this.setData(res.data);
    //     this.setData({
    //       result: res.data.key
    //     })
    //     // console.log(this.data);
    //   })
    // })
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
    var id = e.target.dataset.id;
    //根据exerciseType值的不同，判断是否显示对错
    if (this.data.exerciseType == 1) { //exerciseType=1表示考试阶段，不直接给出对错判断

      // if (this.data.result == id) {
      e.target.dataset.option = 'option-checked';
      e.target.dataset.optionContent = 'option-content-checked';

      // } else {
      //   e.target.dataset.option = 'option-wrong';
      //   e.target.dataset.optionContent = 'option-content-wrong';

      // }
    } else {
      if (this.data.result == this.data.options[id].key) {
        e.target.dataset.option = 'option-checked';
        e.target.dataset.optionContent = 'option-content-checked';
        this.setData({
          isCorrect: true,
          isWrong: false,
          isChange: true
        });

      } else {
        e.target.dataset.option = 'option-wrong';
        e.target.dataset.optionContent = 'option-content-wrong';
        this.setData({
          isCorrect: false,
          isWrong: true,
          isChange: true
        });

      }
    }
    this.setData({
      option: e.target.dataset.option,
      optionContent: e.target.dataset.optionContent,
      nameId: id,
      result: this.data.options[id].key
    })
  },
  next: function() {
    //判断是否是最后一题
    if (!this.data.isEndQuestion) { //如果不是最后一题就就结束本题，继续推题
      Get("/cp/finishansque?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + this.data.id + "&answer=" + this.data.result + "&exerciseType=" + this.data.exerciseType).then(res => {
        if (res.data.success) {
          Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&exerciseType=" + this.data.exerciseType).then(res => {
            if (res.data.success) {
              let qtype = res.data.data.qType,
                qId = res.data.data.id;
              this.setData({
                isEndQuestion: res.data.data.isEndQuestion
              });
              //判断题目类型，根据qtype不同跳到不同的页面
              if (qtype == '2') {
                wx.redirectTo({
                  url: "../question-page/question-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=" + this.data.exerciseType + "&isEndQuestion=" + this.data.isEndQuestion
                })
              } else {
                wx.redirectTo({
                  url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=" + this.data.exerciseType + "&isEndQuestion=" + this.data.isEndQuestion
                })
              }

            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }

          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      })
    } else { //如果是最后一题就结束本题，不再推题
      Get("/cp/finishansque?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + this.data.id + "&answer=" + this.data.result + "&exerciseType=" + this.data.exerciseType).then(res => {
        if (this.data.exerciseType == 1) { //如果exerciseType=1，则结束考试，不再推题，跳转到诊断结果页面
          Get("/cp/cpexam/finish?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId).then(res => {
            if (res.data.success) {
              wx.redirectTo({
                url: "../diagnostic-result/diagnostic-result?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId
              })
            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }
          })
        } else { //如果exerciseType=2，则跳转到学习总结页面
          wx.redirectTo({
            url: "../learning-summary/learning-summary?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId
          })
        }
      })
    }


  },
  //二轮做题阶段，弹出对错之后的隐藏
  hideTap: function() {
    this.setData({
      isCorrect: false,
      isWrong: false
    })
  },
  //查看题目解析
  lookAnalysis: function(e) {
    var qId = e.target.dataset.qId;
    wx.redirectTo({
      url: "../topic-analysis/topic-analysis?qId=" + qId
    })
  },
  submit: function() {
    let query = wx.createSelectorQuery();
    let queryNode = query.select("option");
    queryNode.addClass("option-checked")
  }
})