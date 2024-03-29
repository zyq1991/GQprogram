// start-learning.js
import {
  Get,
  Post
} from '../../utils/request.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMark: false,
    startPoint: [0, 0],
    endPoint: [0, 0],
    commentDisplay: false,
    videoDisplay: true,
    isLikeIt: false,
    isCommentLikeIt:false,
    isCommentShow:false,
    isLikeIt: false,
    isCommentShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let miniOpenId = options.miniOpenId;
    let eId = options.eId;
    let taskId = options.taskId;
    this.setData({
      miniOpenId: miniOpenId,
      eId: eId
    })
    Get("/cp/video/push?miniOpenId=" + miniOpenId + "&eId=" + eId + "&taskId=" + taskId).then(res => {
      if (res.data.success) {
        this.setData(res.data.data)
        Get('/cp/comment/list?videoNo=' + this.data.videoNo + '&miniOpenId=' + miniOpenId).then(res => {
          if (res.data.success) {
            this.setData({
              contents: res.data.data.contents
            });
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //评论内容点赞
  commentLikeIt: function(e) {
    let isSupportIt = !e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.contentid;

    this.data.contents[index].isSupport = isSupportIt;
    if (isSupportIt) {
      this.data.contents[index].supports++;
      Get("/cp/comment/pointSupport?id=" + id + "&miniOpenId=" + this.data.miniOpenId).then()
    } else {
      this.data.contents[index].supports--;
      Get("/cp/comment/pointSupport?id=" + id + "&miniOpenId=" + this.data.miniOpenId).then()
    }
    this.setData(this.data);
  },
  submit: function() {
    Post('/cp/comment/saveContent?miniOpenId=' + this.data.miniOpenId + '&videoNo=' + this.data.videoNo + '&content=' + this.data.content).then(res => {
      console.log(res)
      if (res.data.success) {
        wx.showToast({
          title: '提交评论成功!',
        })
        this.setData({
          contents: res.data.data.contents
        });
        Get('/cp/comment/list?videoNo=' + this.data.videoNo + '&miniOpenId=' + this.data.miniOpenId).then(res => {
          if (res.data.success) {
            this.setData({
              contents: res.data.data.contents,
              content: ''
            });
          }
        })
      }
    })
  },
  //获取评论输入框内容
  getContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  imgError: function() {
    console.log('报错啦')
  },
  comment: function() {
    this.setData({
      isCommentShow: true
    })
    console.log("评论接口")
    // wx.navigateTo({
    //   url: '../comment-detail/comment-detail?videoNo=' + this.data.videoNo + '&miniOpenId=' + this.data.miniOpenId
    // })
  },
  viedoEnded() { //视频播放结束直接跳转做题
    // this.pushQuestion();
  },
  //判断视频是否点赞
  isMarkIt: function(e) {
    if (!this.data.isMark) {
      this.setData({
        isMark: !this.data.isMark
      })
    }

    Get("/cp/video/pointSupport?miniOpenId=" + this.data.miniOpenId + "&videoNo=" + this.data.videoNo).then(
      res => {
        wx: showToast({
          title: res.data.videoSupport,
          icon: 'success'
        })
      }
    )
  },
  //跳转到评论页面
  toComment: function() {
    wx.navigateTo({
      url: "../personal-comment/personal-comment?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&videoNo=" + this.data.videoNo
    })
  },
  //视频暂停状态弹框
  pause: function() {
    console.log('监听视频暂停', this.isCommentShow)
    if (!this.isCommentShow || !app.globalData.isPull) {
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
    }

  },
  // pushQuestion: function() { //开始做题
  //   Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&exerciseType=2").then(res => {
  //     this.setData(res.data.data);
  //     if (res.data.success) {
  //       let qtype = res.data.data.qType,
  //         qId = res.data.data.id,
  //         isEndQuestion = res.data.data.isEndQuestion;
  //       console.log(res.data)
  //       if (qtype == '2') {
  //         wx.redirectTo({
  //           url: "../question-page/question-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=2" + "&isEndQuestion=" + isEndQuestion
  //         })

  //       } else {
  //         wx.redirectTo({
  //           url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=2" + "&isEndQuestion=" + isEndQuestion
  //         })

  //       }
  //     } else {
  //       wx.showToast({
  //         title: res.data.msg,
  //       })
  //     }

  //   })
  // },
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
  },
  //视频上滑操作
  mytouchstart: function(e) {

    this.setData({
      startPoint: [e.touches[0].pageX, e.touches[0].pageY]
    })
  },
  mytouchmove: function(e) {
    this.setData({
      endPoint: [e.touches[0].pageX, e.touches[0].pageY]
    });
    // if (endPoint[1] > startPoint[1]){}
  },
  mytouchend: function(e) {
    console.log("视频滑动")
    let moveY = this.data.endPoint[1] - this.data.startPoint[1];
    if (this.data.startPoint[1] > 0 && moveY < 0) {
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
        this.setData({
          videoDisplay: false
        })
      } else {
        this.setData({
          // commentDisplay: false,
          videoDisplay: true
        })
    }
    console.log(this.data)
  },
  //点赞操作
  likeIt: function() {
    this.setData({
      isLikeIt: !this.data.isLikeIt
    })
    Get("/cp/video/pointSupport?miniOpenId="+this.data.miniOpenId+"&videoNo="+this.data.videoNo)
  },
  //获取评论输入框内容
  // getContent: function(e) {
  //   this.setData({
  //     content: e.detail.value
  //   })
  // },
  //关闭评论弹窗
  closeCommtentPop: function() {
    this.setData({
      isCommentShow: false
    })

    console.log('关闭弹窗功能')
  }
})