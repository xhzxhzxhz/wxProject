// pages/product/product.js
Page({
  ToDetail:function(e){
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/details/details?pid='+id,
      })
  },
  addCart:function(e){
    wx.showToast({
      title: '加入购物车成功',
      icon: 'none',
      duration: 1000,
      mask: true
    })
    var id = e.currentTarget.id;
    wx.request({
      url: 'http://127.0.0.1:3002/cart/add',
      data:{
        pid:id
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data);
      }

    })
  },
  search:function(e){
    var kwords = e.detail.value;
    wx.request({
      url: 'http://127.0.0.1:3002/products/',
      data: {
        kwords:kwords
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setData({
          list: res.data
        });

        if(res.data.length==0){
          this.setData({
            nogood:"对不起，未查找到符合条件的产品",
            hh:false
          });
        }else{
          this.setData({
            hh: true
          });
        }

      }
    }) 
  },
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    nogood:"",
    hh:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var kwords = "圆桌";
      kwords=options.kwords;
      wx.request({
        url: 'http://127.0.0.1:3002/products/',
        data: {
          kwords:"圆桌"
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          this.setData({
            list:res.data
          });

        }
      }) 
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