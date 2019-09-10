// pages/fill-blanks-test-page/fill-blanks-test-page.js
// var that = this
import {
  Get
} from '../../utils/request.js';
Page({


  /**
   * 组件的初始数据
   */
  data: {
    text: "假设有两个分类变量X和Y，它们的值域分别为{x1,x2}和{y1,y2}，其中2x2列联表为:",
    isShow: false,
    isChange: false,
    isCorrect: false,
    isWrong: false,
    result: '',
    tmpArr: [],
    layout: [
      [{
          opt: "bindViewTapOpt",
          type: "default",
          id: "!",
          value: "!",
        },
        {
          opt: "bindViewTapOpt",
          type: "default",
          id: "^",
          value: "^",
        },
        {
          opt: "bindViewTapOpt",
          type: "default",
          id: "√",
          value: "√",
        },
        {
          opt: "bindViewTapOpt",
          type: "default",
          id: "π",
          value: "π",
        },
        {
          opt: "bindViewTapOpt",
          type: "warn",
          id: "c",
          value: "C",
        }
      ],
      [{
          opt: "bindViewTapOpt",
          type: "default",
          id: "sin",
          value: "sin",
        },
        {
          opt: "bindViewTapOpt",
          type: "default",
          id: "(",
          value: "(",
        },
        {
          opt: "bindViewTapOpt",
          type: "default",
          id: ")",
          value: ")",
        },
        {
          opt: "bindViewTapOpt",
          type: "default",
          id: "e",
          value: "e",
        },
        {
          opt: "bindViewTapOpt",
          type: "warn",
          id: "ac",
          value: "AC",
        }
      ],
      [{
          opt: "bindViewTapOpt",
          type: "default",
          id: "cos",
          value: "cos",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "7",
          value: "7",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "8",
          value: "8",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "9",
          value: "9",
        },
        {
          opt: "bindViewTapOpt",
          type: "primary",
          id: "÷",
          value: "÷",
        }
      ],
      [{
          opt: "bindViewTapOpt",
          type: "default",
          id: "tan",
          value: "tan",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "4",
          value: "4",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "5",
          value: "5",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "6",
          value: "6",
        },
        {
          opt: "bindViewTapOpt",
          type: "primary",
          id: "×",
          value: "×",
        }
      ],
      [{
          opt: "bindViewTapOpt",
          type: "default",
          id: "ln",
          value: "ln",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "1",
          value: "1",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "2",
          value: "2",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "3",
          value: "3",
        },
        {
          opt: "bindViewTapOpt",
          type: "primary",
          id: "-",
          value: "-",
        }
      ],
      [{
          opt: "bindViewTapOpt",
          type: "default",
          id: "lg",
          value: "lg",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: "0",
          value: "0",
        },
        {
          opt: "bindViewTapInput",
          type: "default",
          id: ".",
          value: ".",
        },
        {
          opt: "bindViewTapOpt",
          type: "warn",
          id: "=",
          value: "=",
        },
        {
          opt: "bindViewTapOpt",
          type: "primary",
          id: "+",
          value: "+",
        }
      ]
    ],
  },
  // onLoad: function(options) {
  //   let miniOpenId = options.miniOpenId;
  //   let eId = options.eId;
  //   let exerciseType = options.exerciseType;
  //   this.setData({
  //     miniOpenId: miniOpenId,
  //     eId: eId,
  //     exerciseType: exerciseType
  //   })
  //   Get("/cp/question/push?miniOpenId=" + miniOpenId + "&eId=" + eId + "&exerciseType=" + exerciseType).then(res => {
  //     if (res.data.success) {
  //       this.setData(res.data.data);
  //       this.setData({
  //         _result:res.data.data.key
  //       })
  //       Get("/cp/startansque?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + res.data.data.id + "&exerciseType=" + exerciseType).then(res => {})
  //     }
  //   })
  // },
  onReady: function() {

    Get("/cp/question/getQuesById?id=4").then(res => {
      let stem = res.data.data.stem;
      stem = stem.replace(/\<img/gi, '<img style="height:50rpx";display:inline-block;');
      stem = stem.replace(/\<p/gi, '<p style="height:50rpx;display:flex;"')
      this.setData({
        data: res.data.data,
        stem: stem
      });
    })
  },
  next: function() {
    //判断是否是最后一题
    if (this.data.isEndQuestion) { //如果是最后一题就结束本题，不再推题
      Get("/cp/finishansque?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + this.data.id + "&answer=" + this.data.result + "&exerciseType=" + this.data.exerciseType).then(res => {
        if (res.data.success) {
          //exerciseType=1表示一轮推题的考试,exerciseType=2表示后面的联系
          //根据exerciseType的不同跳转到不同页面
          if (this.data.exerciseType == 1) { //如果exerciseType=1，则结束考试，不再推题，跳转到诊断结果页面
            Get("/cp/cpexam/finish?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId).then(res => {
              if (res.data.success) {
                wx.redirectTo({
                  url: "../diagnostic-result/diagnostic-result?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId
                })
              }
            })
          } else { //如果exerciseType=2，则跳转到学习总结页面
            wx.redirectTo({
              url: "../learning-summary/learning-summary?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId
            })
          }

        }
      })
    } else { //如果不是最后一题就就结束本题，继续推题
      Get("/cp/finishansque?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + this.data.id + "&answer=" + this.data.result + "&exerciseType=" + this.data.exerciseType).then(res => {

        Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&exerciseType=" + this.data.exerciseType).then(res => {
          if (res.data.success) {
            let qtype = res.data.data.qType,
              qId = res.data.data.id;
            this.setData({
              isEndQuestion: res.data.data.isEndQuestion
            })
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

          }

        })
      });
    }

  },
  calcular: function(e) {
    var that = this;
    that.setData({
      isShow: true,
    });

  },
  num: function(e) {
    var content = e.currentTarget.id;
    var result = ''

    if (content == 'c') {
      let len = this.data.tmpArr.length - 1;
      this.data.tmpArr.splice(len, 1);
      if (len > 0) {
        this.data.tmpArr.forEach(el => {
          result += el;
        })

      } else {
        result = '';
      }
    } else if (content == 'ac') {
      this.data.tmpArr = [];
      result = '';
    } else {
      this.data.tmpArr.push(content);
      this.data.tmpArr.forEach(el => {
        result += el;
      })

    }
    this.setData({
      result: result
    })
  },
  resultChange: function(e) {

    this.data.result = e.detail.value;
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
    wx.redirectTo({
      url: "../topic-analysis/topic-analysis?qId=" + this.data.id
    })
  },
  submit: function() {
    // let query = wx.createSelectorQuery();
    // let queryNode = query.select("option");
    // // queryNode.addClass("option-checked")
    // console.log(queryNode)
    if (this.data.result == this.data._result) {
      this.setData({
        isTrue: true,
        isCorrect: true,
        isWrong: false,
        isChange: true
      })
    } else {
      this.setData({
        isTrue: false,
        isCorrect: false,
        isWrong: true,
        isChange: true
      })
    }
  },
  changeText: function(e) {
    console.log(e);
    var that = this;
    that.setData({
      isShow: true,
    });
  }
})