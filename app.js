//app.js
App({
  /**
   * 设置全局变量
   */
  globalData: {
    openid: '',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3a47ce3cca2a1684&secret=c1ea71666a30723f0284dd5285424225&js_code=',
    wx_url_2: '&grant_type=authorization_code',
    userInfo: null
  },

  onLaunch: function () {
    // 展示本地存储能力
   var logs = wx.getStorageSync('logs') || []
   logs.unshift(Date.now())
   wx.setStorageSync('logs', logs)
    //登录
    var that = this;
   wx.login({//获取code 相同code，在请求微信接口时，只能请求一次，再次请求就会返回openid为null的错误 
      success: res => {
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {//请求获取openid和session_key
             //console.log(res.data.openId);
              that.globalData.openid = res.data.openId
              wx.setStorageSync('openid', res.data.openId);
          }
        })
      }
   });
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
         if (res.authSetting['scope.userInfo']) {
         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
             //可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
             //由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
             //所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
 
})