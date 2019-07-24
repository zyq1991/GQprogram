// pages/fill-blanks-test-page/fill-blanks-test-page.js
// var that = this
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


  next: function() {
    wx.redirectTo({
      url: '../diagnostic-result/diagnostic-result',
    })
  },
  calcular: function(e) {
    var that = this;
    that.setData({
      isShow: true,
    });

  },
  num: function (e) {
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
    this.setData({ result: result })
  }
})