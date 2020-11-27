// pages/guanliyuanjiaoliu/guanliyuanjiaoliu.js
Page({
  
  /**
   * 页面的初始数据
   */
  
  data: {
    openid:"",
    yehao:0,
   jiazutotal:0,
   totalpage:0,
   pagejilu:20, 
   jiazumingchengku:[
     {
    _id:"e373396c5f8628b8017210bc70ca50b7",
    _openid:"oF85t5a4erKVv0JB3CnvujSN6WJw",
    chuangjianzhe:"刘晓云",
    dianhua:"13832429913",  
    mingcheng:"（!网络数据回调失败!）",
    time:"20201014 6:23",
    renshu:0
   }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jiazutotal=0
    var totalpage=0
   var openid=getApp().globalData.openid
    this.setData({
      openid:openid
    })
//  console.lres.data.idog(123)
 const testDB = wx.cloud.database({
  env: 'liuxiaoyunyun-wsc3r'
})
testDB.collection('jiazumingcheng').count().then(res => {
   jiazutotal=res.total
  this.setData({
    jiazutotal:res.total
  })
   totalpage =Math.round((this.data.jiazutotal+0.999)/this.data.pagejilu)
     
    this.setData({
      totalpage:totalpage
    })
    this.diaoquyeshusuju(0)
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
  diaoquyeshusuju:function(yeshu){
//调取 家族指定名称页数内的数据//调取 家族指定名称页数内的数据//调取 家族指定名称页数内的数据

// wx.cloud.callFunction({
//   name:"tongjiquankurenshu",
//   data:{  
//    yeshu:yeshu,
//    pagejilu:this.data.pagejilu 
//   }
// })
//  .then( res=>{ 
//    console.log(res ,234)
//    console.log(res.result,345)
  
//  })



console.log("res" ,1234)
var  jiazumingchengku=[]
var renyuanhuizonglist=[]
const testDB=wx.cloud.database({
  env:'liuxiaoyunyun-wsc3r'
})
testDB.collection("jiazumingcheng").skip(yeshu*this.data.pagejilu).limit(this.data.pagejilu)
.get().then(res => {
   jiazumingchengku=res.data
//---
const db=wx.cloud.database()
  const $=db.command.aggregate
  db.collection("jiazurenyuan").aggregate()
  .group({
    _id:'$mingcheng',
    count: $.sum(1)
    
  }) 

  .end()
  .then(res=>{
    //  console.log(res,444)
    renyuanhuizonglist=res.list
   
//---
  for (var hm=0;hm<jiazumingchengku.length;hm++){
    // console.log(hm,"hm",jiazumingchengku.length)
    for (var hh=0;hh<renyuanhuizonglist.length;hh++){
      // console.log(hh,"hH",renyuanhuizonglist.length)
        if (jiazumingchengku[hm].mingcheng==renyuanhuizonglist[hh]._id){

          jiazumingchengku[hm].renshu=renyuanhuizonglist[hh].count

          break
        }
    }

  }


 this.setData({
    jiazumingchengku:jiazumingchengku
  })
//---

   })

  } )
//调取 家族指定名称页数内的数据
  },
  xuanyehao:function(e){
    //选择页号
    // console.log(e)
    var yehao=this.data.yehao
    var id=e.currentTarget.id
     switch(id){
       case "0":
        yehao=0
         break;
         case "1":
        yehao=yehao-1
        if (yehao<0) { yehao=0}
         break;
         case "2":
        yehao=yehao+1
        if (yehao>=this.data.totalpage) {yehao= this.data.totalpage-1}
         break;
         case "3":
         yehao=this.data.totalpage-1
          break;
     }
     this.setData({
       yehao:yehao
     })
     // 读取 管理人员的数据和人员录入统计数据
    

      this.diaoquyeshusuju(yehao)
    //选择页号OK
  }



})