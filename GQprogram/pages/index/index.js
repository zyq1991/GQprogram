//index.js
//获取应用实例
import {
  Get
} from '../../utils/request.js';
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  onLoad: function() {
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: (res) => {
    //           let nickName = res.userInfo.nickName, imgUrl = res.userInfo.avatarUrl;
    //           console.log(res.userInfo)
    //           Get("/cp/upcpuser?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&nickName=" + nickName+"&imgUrl="+imgUrl).then(res => {
    //             if (res.data.data) {
    //               //小程序开始，判断跳转到哪个页面
    //               Get("/cp/learning/index?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690").then(res => {
    //                 console.log(res)
    //                 if (res.data.success) {
    //                   let status = res.data.data.startLearning;
    //                   // wx.redirectTo({
    //                   //   url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
    //                   // })
    //                   if (status == 0) { //0表示开始页面
    //                     wx.redirectTo({
    //                       url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
    //                     })
    //                   } else { //1表示诊断结果页面
    //                     wx.redirectTo({
    //                       url: "../diagnostic-result/diagnostic-result?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
    //                     })
    //                   }
    //                 } else {
    //                   wx.showToast({
    //                     title: '请检查网络',
    //                   })
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    // wx.redirectTo({
    //   url: '../ready-diagnosis/ready-diagnosis'
    //   // url: '../component/calculator/calculator'
    // })

  },
  bindGetUserInfo: (e) => {
    console.log(e)
    let nickName = e.detail.userInfo.nickName;
    Get("/cp/upcpuser?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690&nickName=" + nickName).then(res => {
      if (res.data.data) {
        //小程序开始，判断跳转到哪个页面
        Get("/cp/learning/index?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690").then(res => {
          console.log(res)
          if (res.data.success) {
            let status = res.data.data.startLearning;
            // wx.redirectTo({
            //   url: "../ready-diagnosis/ready-diagnosis?miniOpenId=" + res.data.data.miniOpenId + "&eId=" + res.data.data.eId
            // })
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
  }
})