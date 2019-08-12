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
    optionContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let miniOpenId = options.miniOpenId;
    let eId = options.eId;
    let exerciseType = options.exerciseType
    this.setData({
      miniOpenId: miniOpenId,
      eId: eId,
      exerciseType: exerciseType
    })
    Get("/cp/question/push?miniOpenId=" + miniOpenId + "&eId=" + eId + "&exerciseType=1").then(res => {
      if (res.data.success) {
        this.setData(res.data.data);
        this.setData({
          result: res.data.data.key
        })
        console.log(res.data.data)
        Get("/cp/startansque?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + res.data.data.id + "&exerciseType=1").then(res => {
        })
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
    var that = this;
    var id = e.target.dataset.id;
    if (this.data.exerciseType == 1) {

      // if (this.data.result == id) {
      e.target.dataset.option = 'option-checked';
      e.target.dataset.optionContent = 'option-content-checked';

      // } else {
      //   e.target.dataset.option = 'option-wrong';
      //   e.target.dataset.optionContent = 'option-content-wrong';

      // }
    } else {
      if (this.data.result == id) {
        e.target.dataset.option = 'option-checked';
        e.target.dataset.optionContent = 'option-content-checked';
        this.setData({
          isCorrect: true,
          isWrong: false
        });

      } else {
        e.target.dataset.option = 'option-wrong';
        e.target.dataset.optionContent = 'option-content-wrong';
        this.setData({
          isCorrect: false,
          isWrong: true
        });

      }
    }

    this.setData({
      option: e.target.dataset.option,
      optionContent: e.target.dataset.optionContent,
      nameId: id,
      result: this.data.options[id]
    })
    console.log(this.data.result)
  },
  next: function() {
    Get("/cp/finishansque?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + this.data.id + "&answer="+this.data.result+"&exerciseType=1").then(res => {
      console.log(res);
      if (res.data.sucess) {
        Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId).then(res => {
          if (res.data.success) {
            let qtype = res.data.data.qType,
              qId = res.data.data.id;
            this.setData({
              isEndQuestion: res.data.data.isEndQuestion
            })
            if (!this.data.isEndQuestion) {
              if (qtype == '2') {
                wx.navigateTo({
                  url: "../question-page/question-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId
                })
              } else {
                wx.navigateTo({
                  url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + qId
                })
              }
            } else {
              Get("/cp/cpexam/finish?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId).then(res => {
                if (res.data.success) {
                  wx.navigateTo({
                    url: "../diagnostic-result/diagnostic-result?miniOprnId=" + this.data.miniOpenId + "&eId=" + this.data.eId
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                  })
                }
              })

            }

          }

        })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
    })

  },
  hideTap: function() {
    this.setData({
      isCorrect: false,
      isWrong: false
    })
  }

})