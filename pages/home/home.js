// pages/home/home.js

Page({
  search:function(e){
    var kwords = e.detail.value;
    wx.switchTab({
      url: '/pages/product/product?kwords=' + kwords,
    })
  }, 
 
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { id: 1, img_url: "http://127.0.0.1:3002/img/home1.jpg" },
      { id: 2, img_url: "http://127.0.0.1:3002/img/home3.jpg" },
      { id: 3, img_url: "http://127.0.0.1:3002/img/home2.jpg" }],
    kwords:null
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})