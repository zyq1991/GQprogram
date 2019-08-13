// pages/ready-diagnosis/ready-diagnosis.js
import {
  Get
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "1.诊断过程中约有10到15题\n2.约需时间15分钟\n 3.请坚持完成",
    userId: ''
  },
  onGotUserInfo: function(e) {
    console.log('18S')
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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
    // Get("/cp/startansque?userId=1&eId=2&qId=q_0002&qType=1").then(res => {
    //   let questID = res.data.qId;
    //   Get("/cp/findcpquestion/" + questID).then(res => {
    //     this.setData(res.data);
    //     console.log(this.data);
    //   })
    // })
    // Get("/cp/startcpexam?"+this.data.userId).then(res=>{

    // })
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

  start: function() {
    Get("/cp/cpexam/start?miniOpenId=o6Xut1aXVu2ihDFVl5TJO21li690").then(res => {
      if (res.data.success) {
        let miniOpenId = res.data.data.miniOpenId,
          eId = res.data.data.eId;
        Get("/cp/question/push?miniOpenId=" + miniOpenId + "&eId=" + eId +"&exerciseType=1").then(res => {
          if (res.data.success) {
            let qtype = res.data.data.qType,
              qId = res.data.data.id;
            if (qtype == '2') {
                wx.navigateTo({
                url: "../question-page/question-page?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + qId +"&exerciseType=1"
              })
              
            } else {
                wx.navigateTo({
                url: "../fill-blanks-test-page/fill-blanks-test-page?miniOpenId=" + miniOpenId + "&eId=" + eId + "&qId=" + qId + "&exerciseType=1"
              })
              
            }
          }else{
            wx.showToast({
              title: res.data.msg,
            })
          }

        })

      }

    })
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