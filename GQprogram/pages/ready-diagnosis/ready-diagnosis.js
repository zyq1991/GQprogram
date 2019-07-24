// pages/ready-diagnosis/ready-diagnosis.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "1.诊断过程中约有10到15题\n2.约需时间15分钟\n 3.请坚持完成"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.getSetting({
    //   success(res){
    //     console.log(res)
    //     if(res.authSetting['scope.record']){
    //       wx.getUserInfo({
    //         success(res){
    //           console.log(res)
    //         }
    //       })
    //     }
    //   }
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
  onGotUserInfo: function (e) {
    console.log('18S')
    console.log(e)
    Get("http://39.105.185.44:8090/cp/startcpexam?userId=1").then(res => {
      console.log(res);
      wx.navigateTo({
        url: "../question-page/question-page"
      })
    })
  },
  start(e) {
    // console.log(e)
    // wx.navigateTo({
    //   url: "../question-page/question-page"
    // })
    // Get("http://39.105.185.44:8090/cp/startcpexam?userId=1").then(res => {
    //   console.log(res);
    //   wx.navigateTo({
    //     url: "../question-page/question-page"
    //   })
    // })
  },
 
/**
 * 用户登陆
 */
  // userLogin(){
  //   wx.checkSession({
  //     success:function(){
  //       //存在登陆状态
  //       console.log('登陆成功')
  //     },
  //     fail:function(){
  //       //不存在登陆状态
  //       console.log('登陆失败')

  //     }
  //   })
  // }
})