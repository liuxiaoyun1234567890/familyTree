// pages/huanren/huanren.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      {name: '补充更详细资料', value: '1',checked: 'true'},
      {name: '血缘更近，与原操作员', value: '2' },
      {name: '微信变更', value: '3'},
      {name: '原操作员失联', value: '4'},
      {name: '双方协商同意变更', value: '5'}
    ],
      id:"",
      bianma:"",
      name:"",
      yuanopenid:"",
      yuanyin:"补充更详细资料",
      nickName:app.globalData.userInfo.nickName,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      // console.log(options)
      that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
     id: options.id,     //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
      bianma:options.bianma,
      name:options.name,
      yuanopenid:options.yuanopenid
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

  },
  radioChange(e) {
   
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.data.yuanyin=e.detail.value
    this.setData({
      yuanyin:this.data.yuanyin
    })
  },
  shenqinghuanren:function(e){
    //申请换人 
    // var xu=this.data.id
    var   jiazumingcheng=app.globalData.jiazumingcheng
    var   bianma=this.data.bianma
    var   name=this.data.name
    var  yuanopenid=this.data.yuanopenid
    var   yuanyin=this.data.yuanyin
    var   nickName=app.globalData.userInfo.nickName
    var   shenhe=""
    var list=[]
    const testDB=wx.cloud.database({
      env:'liuxiaoyunyun-wsc3r'
    })
    
    testDB.collection("huanren")
    .where({
      mingcheng:jiazumingcheng,
      bianma:bianma
    })
    .get()
    .then (res=>{
    list=res.data
    // console.log(list,list.length,res)
    if(list.length>0) {
      wx.showToast({
        title:"正在等待审核...",  
        icon:"none"
      })
      wx.navigateBack({
        delta: 1
      })

    }else{
      testDB.collection("huanren").add({
        data:{
            //  _id:
            //  _openid:
             mingcheng:jiazumingcheng,
             bianma:bianma,
             name:name,
             yuanopenid:yuanopenid,
             yuanyin:yuanyin,
             nickName:nickName,
             shenhe:""
        },
        success:res=>{
          wx.showToast({
            title:"申请成功...",
            icon:"none"
          })
              wx.navigateBack({
                delta: 1
              })
        },
        fail:err=>{
          wx.showToast({
            title:"申请失败...",
            icon:"none"
          })
        }
      })
      

    }
    })


    //申请换人OK
  }

})