// pages/userConsole/userConsole.js
const app=getApp()
Page({

  data: {
    id:"",
    openid:"",
    jiazumingcheng:"",
    jiazushenqingrenid:"",
    list:[],
    
      bianma:"",
      name:"",
      yuanopenid:"",
      yuanyin:"补充更详细资料",
      nickName:"",
  },

  //
  

  onLoad: function (options) {
   this.data.openid=app.globalData.openid
   this.data.jiazumingcheng=app.globalData.jiazumingcheng
   this.data.jiazushenqingrenid=app.globalData.jiazushenqingrenid 

   var that=this
   const testDB=wx.cloud.database({
 env:'liuxiaoyunyun-wsc3r'
})

testDB.collection("huanren")
.where({
 mingcheng:that.data.jiazumingcheng
 // bianma:bianma
})
.get()
.then (res=>{
that.data.list=res.data
if (that.data.openid!=that.data.jiazushenqingrenid){
  for (var i=0;i<that.data.list.lenth;i++){
   if (that.data.list[i].yuanopenid!=that.data.openid){
     console.log(that.data.list[i].yuanopenid,that.data.openid)
     that.data.list.splice(i,1)
   }
  }
}

that.setData({list:that.data.list})
console.log(res.data,that.data.jiazumingcheng)
})


  },
  onShow:function(){ 
  
  },
  fanhui:function(e){
    wx.navigateBack({
      delta: 1
    })
  },
  zhuanyi:function(options){
    //处理同意与不同意
   var that=this 
   var list=this.data.list
   var listxu=options.target.id
   var yn=options.target.dataset.yn
   
   var  huanrenid=list[listxu]._id
   var renyuanid=list[listxu].bianma
   var xinopenid=list[listxu]._openid 
   
console.log(list,listxu,yn, huanrenid,renyuanid,xinopenid)

  //  list.splice(listxu ,1) //不管同意与否都删除
  wx.cloud.callFunction({ 
    name:"shanchuhuanren001", 
    data:{
    _id:huanrenid
    }
    })
     .then(res=>{
      //  console.log( typeof res,res)
      if(res.result.stats.removed!=0){
      wx.showToast({
        title: '删除申请记录成功', 
        icon:"none"
      }) 
      list.splice(listxu ,1) //不管同意与否都删除
      that.setData({  list:list    })

          }
    }) 
   if(yn=="yes"){
     //将人员的openid 更换
  //    var renyuanid=list[listxu].bianma
  //  var xinopenid=list[listxu]._openid 
     wx.cloud.callFunction({ 
      name:"baocunxiugaiopenid002", 
      data:{
      id:renyuanid,
      openid: xinopenid 
      }
      })
       .then(res=>{
          console.log( typeof res,res) 
        
        wx.showToast({
          title: '申请的修改权成功了', 
          icon:"none"
        }) 
      
      })
     //--
   }

    //处理同意与不同意 OK
  }
   
  
})