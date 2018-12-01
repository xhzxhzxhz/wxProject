// pages/cart/cart.js
Page({
  toProduct:function(){
    wx.switchTab({
      url: '/pages/product/product',
    })
  },
 

  //减
  bindMinus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].count;

    if (num > 0) {
      num--;
    }
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    var carts = this.data.carts;
    carts[index].count = num;

    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;

    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
  },
  //加
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].count;
    num++;
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var carts = this.data.carts;
    carts[index].count = num;

    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;

    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
  }, 
  //单选
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.carts[index].selected;//0
    var carts = this.data.carts;
    var num = parseInt(this.data.carts[index].count);
    var price = this.data.carts[index].price.slice(1);
    if (!selected) {
      console.log(selected);
      this.setData({
        count: this.data.count + num * price,
        number: num + this.data.number
      }); 
    } 
    carts[index].selected = !selected//改变当前项的状态
    this.setData({
      carts: carts
    });
  

  },
  
  //全选 全不选
  bindSelectAll: function () {
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    var carts = this.data.carts;
    console.log(selectedAllStatus);
    if(selectedAllStatus==true) {
      console.log(carts[0].selected);
      for (var i = 0; i < carts.length; i++) {
        carts[i].selected = true;
        console.log(carts[i].selected);
        var num = parseInt(this.data.carts[i].count);
        var price = this.data.carts[i].price.slice(1);
        console.log(num);
        this.setData({
          count: this.data.count + num * price,
          number: this.data.number + num,
          selectedAllStatus:1,
          carts:carts

        });
      }
    } else if(selectedAllStatus ==false) {
      for (var i = 0; i < carts.length; i++) {
        carts[i].selected = false;
        console.log(carts[i].selected);
        var num = parseInt(this.data.carts[i].count);
        var price = parseInt(this.data.carts[i].price.slice(1));
        this.setData({
          count:0,
          number: 0,
          selectedAllStatus: 0,
          carts:carts
        });
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    count: 0,//总价
    number: 0,//数量
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    hasList:true,//购物车是否为空
    noList: false,
    carts: [],
    selectedAllStatus:0,
    selected:false,
    startX:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:3002/cart/items',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.length>0){
          this.setData({
            hasList:false,
            noList:true,
            carts:res.data
          })
        }else{
          this.setData({
            hasList: true,
            noList: false
          })
        }
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
    wx.request({
      url: 'http://127.0.0.1:3002/cart/items',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          this.setData({
            hasList: false,
            noList: true,
            carts: res.data
          })
        } else {
          this.setData({
            hasList: true,
            noList: false
          })
        }
      }

    })
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