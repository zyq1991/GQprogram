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
  onLoad: function(options) {
    console.log(options)
    let miniOpenId = options.miniOpenId;
    let eId = options.eId;
    let exerciseType = options.exerciseType;
    this.setData({
      miniOpenId: miniOpenId,
      eId: eId,
      exerciseType: exerciseType
    })
    Get("/cp/question/push?miniOpenId=" + miniOpenId + "&eId=" + eId + "&exerciseType=" + exerciseType).then(res => {
      if (res.data.success) {
        this.setData(res.data.data);
        Get("/cp/startansque?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + res.data.data.id + "&exerciseType=" + exerciseType).then(res => {})
      }
    })
  },

  next: function() {
    console.log("result:"+this.data.result)
    Get("/cp/finishansque?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + this.data.id + "&answer=" + this.data.result + "&exerciseType=" + this.data.exerciseType).then(res => {

      Get("/cp/question/push?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&exerciseType=" + this.data.exerciseType).then(res => {
        console.log(res)
        if (res.data.success) {
          let qtype = res.data.data.qType,
            qId = res.data.data.id;
          this.setData({
            isEndQuestion: res.data.data.isEndQuestion
          })
          console.log(this.data.isEndQuestion)
          if (!this.data.isEndQuestion) {
            if (qtype == '2') {
              wx.navigateTo({
                url: "../question-page/question-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=" + this.data.exerciseType
              })
            } else {
              wx.navigateTo({
                url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId + "&qId=" + qId + "&exerciseType=" + this.data.exerciseType
              })
            }
          } else {
            Get("/cp/cpexam/finish?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId).then(res => {
              console.log(this.data)
              if (res.data.success) {
                wx.navigateTo({
                  url: "../diagnostic-result/diagnostic-result?miniOpenId=" + this.data.miniOpenId + "&eId=" + this.data.eId
                })
              }
            })

          }

        }

      })
    });
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
  resultChange:function(e){
    this.data.result = e.detail.value;
  }
})