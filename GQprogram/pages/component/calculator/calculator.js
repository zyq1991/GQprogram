// pages/calculator.js
// var katex = require('../../../utils/katex.min.js');
// var mathJax = require('../../../utils/MathJax.js');
var status = 0; //标记所输入的是数字还是运算符号
var calcu = 0; //标记所要执行的方法是哪一个
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
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

  /**
   * 组件的方法列表
   */
  methods: {
    // onShow: function() {
    //   katex.render("c = \\pm\\sqrt{a^2 + b^2}", element, {
    //     throwOnError: false
    //   });

    // },
    //改进： 定义一个变量记录“=”的输入与否而不必每输入数字时都要检索一遍文本框内容
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
      this.setData({result:result})
      console.log(this.data.result)
    }
  }
})