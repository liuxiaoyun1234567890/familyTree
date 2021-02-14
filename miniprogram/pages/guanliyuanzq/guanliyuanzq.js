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
    list02:[],
    listmingxi:[],
    fenxiangbiao:"--",//"01","02"
    fenxiangxu:-1 , //0---99
    jiazumingcheng:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.data.jiazumingcheng=getApp().globalData.jiazumingcheng
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
   wx.showLoading({
     title: '正在加载数据',
   })
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
          // console.log(1,res.result.list) 
          that.setData({
            list01:res.result.list
          })
          // console.log(list01)
          
       })
       .catch(err=>{
        // console.log(e,app.globalData.jiazumingcheng,2)
        //   console.error
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
                //  console.log(1,res.result.list) 
                 that.setData({
                   list02:res.result.list
                 })
                //  console.log(list02)
                 
              })
              .catch(err=>{
              //  console.log(e,app.globalData.jiazumingcheng,2)
              //    console.error
              })
              break;
   }
   wx.hideLoading({
     success: (res) => {
       wx.showToast({
         title: '数据加载完毕',
       })
     },
   })

  },


  fenxiang:function(e){
    //加载明细项目
    var fenxiangxu=parseInt(e.currentTarget.id)
    var fenxiangbiao=e.currentTarget.dataset.biao
    // 
    const testDB = wx.cloud.database({
      env: 'liuxiaoyunyun-wsc3r'
    })
    switch (fenxiangbiao){
     
      case "01" :
        
        testDB.collection('jiazurenyuan').where({
          mingcheng:this.data.jiazumingcheng,
          xingbie:this.data.list01[fenxiangxu]._id.xingbie,
          yimin:this.data.list01[fenxiangxu]._id.yimin
          

        })
         .field({   name:true    })
         .get()
         .then(res => {
         console.log(this.data.list01)
          this.setData({
            fenxiangbiao:fenxiangbiao,//"01","02"
            fenxiangxu:fenxiangxu, //0---99
            listmingxi:res.data
             })
         })
        break;

      case "02":
       
        testDB.collection('jiazurenyuan').where({
          mingcheng:this.data.jiazumingcheng,
          _openid:this.data.list02[fenxiangxu]._id,
         
        })
         .field({   name:true    })
         .get()
         .then(res => {
         console.log(this.data.list02)
          this.setData({
            fenxiangbiao:fenxiangbiao,//"01","02"
            fenxiangxu:fenxiangxu, //0---99
            listmingxi:res.data
             })
         })

        break  
    }
  }
})