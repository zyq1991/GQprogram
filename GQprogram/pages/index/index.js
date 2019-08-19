//index.js
//获取应用实例
import {
  Get
} from '../../utils/request.js';
const app = getApp()

Page({
  data: {},
  onLoad: function() {
    // wx.getUserInfo({
    //   success:res => {
    //     console.log(res)
    //   }
    // })
    wx.redirectTo({
      url: '../ready-diagnosis/ready-diagnosis'
      // url: '../component/calculator/calculator'
    })

  },

  click: function(e) {
    console.log(e)
    //小程序开始，判断跳转到哪个页面
    Get("/cp/learning/index?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690").then(res => {
      console.log(res)
      if (res.data.success) {
        let status = res.data.data.startLearning;
        if (status == 0) { //0表示开始页面
          wx.redirectTo({
            url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
          })
        } else { //1表示诊断结果页面
          wx.redirectTo({
            url: "../diagnostic-result/diagnostic-result?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
          })
        }
      } else {
        wx.showToast({
          title: '请检查网络',
        })
      }
    })
  }
})