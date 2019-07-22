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





    /*数字、括号及PI的输入*/
    num: function(x) {
      var str0 = document.getElementById('result0').value;
      var str = document.getElementById('result').value;
      if (str0.indexOf("=") > 0) {
        document.getElementById('result0').value = '';
        document.getElementById('result').value = '0';
        str = document.getElementById('result').value;
      }
      if (str == "0")
        str = '';
      str += String(x);
      document.getElementById('result').value = str;
      status = 0;
      console.log(document.getElementById('result').value)
    },
    //输入. （未做是否包含“.”的判断）
    dot: function() {
      var str0 = document.getElementById('result0').value;
      var str = document.getElementById('result').value;
      if (str0.indexOf("=") > 0) {
        document.getElementById('result0').value = '';
        document.getElementById('result').value = '0';
        str = document.getElementById('result').value;
      }
      str = str + '.';
      document.getElementById('result').value = str;
    },


    /*三角函数以及'1/'计算*/
    sin: function() {
      calcu = 1;
      cal();
    },

    cos: function() {
      calcu = 2;
      cal();
    },

    tan: function() {
      calcu = 3;
      cal();
    },

    divide1: function() {
      calcu = 4;
      cal();
    },

    ln: function() {
      calcu = 5;
      cal();
    },

    log: function() {
      calcu = 6;
      cal();
    },

    cal: function() {
      var str0 = document.getElementById('result0').value;
      var str = document.getElementById('result').value;
      if (str0.indexOf("=") > 0) {
        document.getElementById('result0').value = '';
        document.getElementById('result').value = '0';
        str = document.getElementById('result').value;
      }
      if (str == "0")
        str = '';
      switch (calcu) {
        case 1:
          str += String("sin(");
          break;
        case 2:
          str += String("cos(");
          break;
        case 3:
          str += String("tan(");
          break;
        case 4:
          str += String("1/");
          break;
        case 5:
          str += String("ln(");
          break;
        case 6:
          str += String("log(");
          break;
      }
      document.getElementById('result').value = str;
      status = 1;
    },


    /*   ^、√以及%的输入   */
    pow1: function() {
      calcu = 1;
      powS();
    },

    pow2: function() {
      calcu = 2;
      powS();
    },

    quyu: function() {
      calcu = 3;
      powS();
    },

    powS: function() {
      if (status == 1)
        return;
      var strpow0 = document.getElementById('result0').value;
      var strpow = document.getElementById('result').value;
      if (strpow0.indexOf("=") > 0) {
        document.getElementById('result0').value = '';
        /*document.getElementById('result').value='0';*/
        strpow = document.getElementById('result').value;
      }
      switch (calcu) {
        case 1:
          strpow += String('^');
          break;
        case 2:
          if (strpow == '0')
            strpow = "√";
          else {
            strpow += String('√');
          }
          break;
        case 3:
          strpow += String("%");
          break;
      }
      document.getElementById('result').value = strpow;
      status = 1;
    },




    /*   +-×÷ 运算   */
    plus: function() {
      calcu = 1;
      calculate();
    },

    times: function() {
      calcu = 2;
      calculate();
    },

    divide: function() {
      calcu = 3;
      calculate();
    },

    calculate: function() {
      if (status == 1)
        return;
      var str0 = document.getElementById('result0').value;
      var str = document.getElementById('result').value;
      if (str0.indexOf("=") > 0) {
        document.getElementById('result0').value = '';
        /*document.getElementById('result').value='0';*/
        str = document.getElementById('result').value;
      }
      if (str == '')
        str = '0';
      switch (calcu) {
        case 1:
          str += '+';
          break;
        case 2:
          str += '×';
          break;
        case 3:
          str += '÷';
          break;
      }
      document.getElementById('result').value = str;
      status = 1;
    },

    minus: function() {
      var str0 = document.getElementById('result0').value;
      var str = document.getElementById('result').value;
      if (str0.indexOf("=") > 0) {
        document.getElementById('result0').value = '';
        /*document.getElementById('result').value='-';*/
        str = document.getElementById('result').value + '-';
      } else
        str += '-';
      document.getElementById('result').value = str;
    },


    //显示屏字符串为空
    zero: function() {
      document.getElementById('result0').value = "";
      document.getElementById('result').value = "0";
    },


    //显示屏字符串减去最后一个字符
    back: function() {
      var str0 = document.getElementById('result0').value;
      var str = document.getElementById('result').value;
      if (str0.indexOf("=") > 0 || str == '')
        return;
      var str1 = str.substr(0, (str.length) - 1)
      document.getElementById('result').value = str1;
    },


    //获取当前显示屏字符，判断所包含运算符，并做相关运算。
    equal: function() {
      var str0 = document.getElementById('result').value;
      if (str0 == "")
        return;
      var str = str0.replace(/×/g, '*'); //用正则表达式进行全部替换
      str = str.replace(/÷/g, '/');
      str = str.replace(/π/g, 'Math.PI');
      if (str.indexOf("sin") >= 0) {
        str = str.replace(/sin/g, 'Math.round(Math.sin');
        str += '*1000000)/1000000';


        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = eval(str);

      } else if (str.indexOf("cos") >= 0) {
        str = str.replace(/cos/g, 'Math.round(Math.cos');
        str += '*1000000)/1000000';
        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = eval(str);
      } else if (str.indexOf("tan") >= 0) {
        str = str.replace(/tan/g, 'Math.round(Math.tan');
        str += '*1000000)/1000000';
        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = eval(str);
      } else if (str.indexOf("^") >= 0) {
        var pos = str0.indexOf('^');
        var pow1 = str0.substring(0, pos);
        var pow2 = str0.substring(pos + 1, str0.length + 1);
        result = Math.pow(pow1, pow2);
        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = eval(result);
      } else if (str.indexOf("√") >= 0) {
        var pos = str0.indexOf('√');
        var pow1 = str0.substring(0, pos);
        var pow2 = str0.substring(pos + 1, str0.length + 1);
        if (pow1 == '') {
          result = Math.pow(pow2, 0.5);
          document.getElementById('result0').value = str0.concat("=");
          document.getElementById('result').value = eval(result);
        } else {
          result = Math.pow(pow2, 1 / pow1);
          document.getElementById('result0').value = str0.concat("=");
          document.getElementById('result').value = eval(result);
        }
      } else if (str.indexOf("ln") >= 0) {
        var str = str0.replace(/ln/g, 'Math.round(Math.log');
        str += '*1000000)/1000000';
        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = eval(str);
      } else if (str.indexOf("log") >= 0) {
        var str = str0.replace(/log/g, 'Math.log');
        str += '/Math.log(10)';
        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = eval(str);
      } else {
        result = (eval(str));
        document.getElementById('result0').value = str0.concat("=");
        document.getElementById('result').value = result;
      }
      var a = document.getElementById('result').value;
      if (a == "Infinity")
        document.getElementById('result').value = '∞';
      else if (a == "-Infinity")
        document.getElementById('result').value = '-∞';
    },

    styleChange: function() {
      if (document.getElementById('rows').style.display == 'inline') {
        document.getElementById('rows').style.display = 'none';
        document.getElementById('sci').style.display = 'inline';
      } else if (document.getElementById('rows').style.display == 'none') {
        document.getElementById('rows').style.display = 'inline';
        document.getElementById('sci').style.display = 'none';
      }
    },
  }
})