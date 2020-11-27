// pages/guanliyuanzq/guanliyuanzq.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaozhunku:[],
    leiid:"",
    list01:[],
    list02:[]
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

  },
  biao:function(e){
    // console.log(e,app.globalData.jiazumingcheng,0)
  var biaohao=e.target.id
   var that=this
   switch(biaohao){
     case "01":
      
 //  app.globalData.jiazumingcheng,
       wx.cloud.callFunction({
         name:"baobiao01",
         data:{
           jiazumingcheng:app.globalData.jiazumingcheng,
                    
          }
       })
       .then(res=>{  
        // console.log(e,app.globalData.jiazumingcheng,1)
          console.log(1,res.result.list) 
          that.setData({
            list01:res.result.list
          })
          console.log(list01)
          
       })
       .catch(err=>{
        console.log(e,app.globalData.jiazumingcheng,2)
          console.error
       })
       break;
       case "02":
      
        //  app.globalData.jiazumingcheng,
              wx.cloud.callFunction({
                name:"baobiao02",
                data:{
                  jiazumingcheng:app.globalData.jiazumingcheng,
                           
                 }
              })
              .then(res=>{  
               // console.log(e,app.globalData.jiazumingcheng,1)
                 console.log(1,res.result.list) 
                 that.setData({
                   list02:res.result.list
                 })
                 console.log(list02)
                 
              })
              .catch(err=>{
               console.log(e,app.globalData.jiazumingcheng,2)
                 console.error
              })
              break;
   }


  }
})