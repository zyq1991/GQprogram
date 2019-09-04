//index.js
//获取应用实例
import {
  Get
} from '../../utils/request.js';
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  onLoad: function() {
    this.setData({
      miniOpenId: app.globalData.miniOpenId
    })

  },
  bindGetUserInfo: (e) => {
    console.log(e)
    
    let nickName = e.detail.userInfo.nickName,
      imgUrl = e.detail.userInfo.avatarUrl;
    Get("/cp/upcpuser?miniOpenId=" + app.globalData.miniOpenId + "&nickName=" + nickName + "&imgUrl=").then(res => {
      if (res.data.data) {
        //小程序开始，判断跳转到哪个页面
        Get("/cp/learning/index?miniOpenId=" + app.globalData.miniOpenId).then(res => {
          console.log(res)
          if (res.data.success) {
            let status = res.data.data.startLearning;
            if (status == 0) { //0表示开始页面
              wx.redirectTo({
                url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + app.globalData.miniOpenId + "&eId=" + res.data.data.eId
              })
            } else { //1表示诊断结果页面
              wx.redirectTo({
                url: "../diagnostic-result/diagnostic-result?miniOpenId=" + app.globalData.miniOpenId + "&eId=" + res.data.data.eId
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
  }
})