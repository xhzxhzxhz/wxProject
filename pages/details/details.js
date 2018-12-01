// pages/details/details.js
Page({
  //减
  bindMinus: function () {
    var number=this.data.num
    if (number > 1) {
      number--;
      this.setData({
        num:number--
      })
    }
  },
  //加
  bindPlus: function () {
    var number = this.data.num
    number++;
    this.setData({
      num: number
    })
  }, 
  //选择颜色
  select_color:function(){
    
  },
  select_size:function(){
    this.setData({
      size_show:false
    })
  },
  size_hide:function(){
    this.setData({
      size_show:true
    })
  },
 
  toCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  toProfile:function(){
    wx.switchTab({
      url: '/pages/profile/profile',
    })
  },
  clickColor:function(e){
    this.setData({
      cid: e.currentTarget.dataset.id,
      cindex: e.currentTarget.dataset.current,
      chooseColor: true,
    })
  },
  clickSize: function (e) {
    this.setData({
      sid: e.currentTarget.dataset.id,
      sindex: e.currentTarget.dataset.current,
      chooseSize: true,
    })
  },
  addCart: function (e) {
    if(this.data.chooseColor==true && this.data.chooseSize==true){
      wx.showToast({
        title: '加入购物车成功',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      var id = e.currentTarget.id;
      var count=this.data.num
      console.log(e);
      wx.request({
        url: 'http://127.0.0.1:3002/cart/add',
        data: {
          pid: id,
          count:count,
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          console.log(res.data);
        }

      })
    }else{
      wx.showToast({
        title: '请选择商品规格',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
   
  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    swiper:[],
    small_img:null,
    imgs:[],
    id:null,
    size_show:true,
    num:1,
    color:[],
    size:[],
    cid:null,
    cindex:null,
    sid:null,
    sindex:null,
    chooseColor:false,
    chooseSize: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id=options.pid;
      wx.request({
        url: 'http://127.0.0.1:3002/details',
        data:{pid:id},
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          var s = res.data[0].size
          var ss=JSON.parse(s);  
          var c = res.data[0].color
          var cc = JSON.parse(c); 
          this.setData({
            list: res.data,
            imgs: res.data[0].pics.split(","),
            swiper: res.data[0].pics.split(",").slice(0,2),
            color: cc,
            size: ss,
            small_img: res.data[0].pics.split(",").slice(0, 1),
            
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