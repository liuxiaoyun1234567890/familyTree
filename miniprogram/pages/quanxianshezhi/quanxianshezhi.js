// pages/quanxianshezhi/quanxianshezhi.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  jiazumingcheng:"",
  openid:"",
  // baimingdanzaifou:false,
  baimingdanlist:[],//处理同意 拒绝使用
  baimingdantotal:[],//处理转化黑白
  jiazushenqingrenid:"",
  jiazushenqingren:"",
  shenqingrendianhua:"",
  jiazuxinxi:[],
  mimazhi:false,
  baimingdan:false,
  // baimingdanshenhe:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  
  
 
this.setData({
  openid:app.globalData.openid,
  jiazushenqingrenid:app.globalData.jiazushenqingrenid,
  //强制为非管理员
  jiazumingcheng:app.globalData.jiazumingcheng,
  jiazushenqingren:app.globalData.jiazushenqingren,
  shenqingrendianhua:app.globalData.shenqingrendianhua
})
 this.duqujiazuxinxi()

 



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
  duqujiazuxinxi: function () {
    
      var mingcheng=this.data.jiazumingcheng
      var that=this
  const testDB = wx.cloud.database({
    env: 'liuxiaoyunyun-wsc3r'
 })
 const _ = testDB.command
   testDB.collection('jiazumingcheng').where({
 mingcheng:mingcheng
 })
.get({
   success:res=> {
    //  console.log(14,res, res.data.length,res.data.length==1)
     if ( res.data.length==1){
           that.setData({
           jiazuxinxi:res.data ,
           })
            console.log(1405,res.data, res.data.length,res.data.length==1)
            that.data.mimazhi=res.data[0].mimazhi,
            that.data.baimingdan=res.data[0].baimingdan
// console.log(1406,that.data.baimingdan,that.data.mimazhi)
            // if(that.data.mimazhi==underfind){that.data.mimazhi=false }
            // if(that.data.baimingdan==underfind){that.data.baimingdan=false }
            // console.log(1407,that.data.baimingdan,that.data.mimazhi)
            that.setData({
            mimazhi:that.data.mimazhi,
            baimingdan:that.data.baimingdan
            })
            if (that.data.baimingdan==true){
              // console.log(that.data.jiazuxinxi,7890)
              // setTimeout(() => {   }, 1000);
              that.duqubaimingdan()
            }
            // console.log(2000,that.data.jiazuxinxi )
       }
       
     },
   
   fail:res=>{
     wx.showToast({
       title: '无法访问家族信息',
       icon:"none"
     })
      
   }

 })

 

 //  读取家族用户信息 OK
},
duqubaimingdan:function(){
//读取白名单中的未审核人员
var that=this
const testDB = wx.cloud.database({
  env: 'liuxiaoyunyun-wsc3r'
})
const _ = testDB.command
 testDB.collection('baimingdan').where({
   mingcheng:that.data.jiazumingcheng,
   shenhe:false
})
.get({
 success:res=> {
  //  console.log(18,res, res.data.length,res.data.length==1)
   if ( res.data.length!=0){
             that.setData({
          baimingdanlist:res.data
         
          })
     }
   
   },
   
 
 fail:res=>{
   wx.showToast({
     title: '无法访问白名单',
     icon:"none"
   })
    
 }

})
//读取白名单中的未审核人员
},
duqubaimingdanquanbu:function(){
  //读取白名单中的全部人员
  var that=this
const testDB = wx.cloud.database({
  env: 'liuxiaoyunyun-wsc3r'
})
const _ = testDB.command
 testDB.collection('baimingdan').where({
   mingcheng:that.data.jiazumingcheng,
  //  shenhe:false
})
.get({
 success:res=> {
  //  console.log(18,res, res.data.length,res.data.length==1)
   if ( res.data.length!=0){
             that.setData({
          baimingdantotal:res.data
         
          })
     }
   
   },
   
 
 fail:res=>{
   wx.showToast({
     title: '无法访问白名单',
     icon:"none"
   })
    
 }

})
   //读取白名单中的全部人员OK
},

zizhuguanbi:function(){
  var that=this
  if (this.data.openid!= this.data.jiazushenqingrenid){
    return
  }
wx.showActionSheet({
  itemList: [ "正常使用","该家族关闭"],
  success(res){
    
    if (res.tapIndex==1){
      that.data.jiazuxinxi[0].zizhuguanbi=true
    }
    if (res.tapIndex==0){
      that.data.jiazuxinxi[0].zizhuguanbi=false
    }
    that.setData({
      jiazuxinxi:that.data.jiazuxinxi
    })
    
  }
})

},
shiyongbaimingdan:function(){
  var that=this
  if (this.data.openid!= this.data.jiazushenqingrenid){
    return
  }
wx.showActionSheet({
  itemList: [ "不使用白名单","启用白名单"],
  success(res){
    
    if (res.tapIndex==1){
      that.data.jiazuxinxi[0].baimingdan=true
    }
    if (res.tapIndex==0){
      that.data.jiazuxinxi[0].baimingdan=false
    }
    that.setData({
      jiazuxinxi:that.data.jiazuxinxi
    })
    
  }
})
},
jizumima:function(e){
  // console.log(e,e.detail.value,this.data.jiazuxinxi)
   this.data.jiazuxinxi[0].mima=e.detail.value
   this.setData({
    jiazuxinxi:this.data.jiazuxinxi
  })
},
xuanmima:function(e){
  if (this.data.openid!= this.data.jiazushenqingrenid){
    return
  }
  if (e.target.id=="shumima" ){
    return
  }
  // console.log(e,111)
  var that=this
          wx.showActionSheet({
          itemList: [ "无密码","启用密码"],
                success(res){
                  
                  if (res.tapIndex==1){
                    that.data.jiazuxinxi[0].mimazhi=true
                  }
                  if (res.tapIndex==0){
                    that.data.jiazuxinxi[0].mimazhi=false
                  }
                  that.setData({
                    jiazuxinxi:that.data.jiazuxinxi,
                    mimazhi:that.data.jiazuxinxi[0].mimazhi
                  })
                  // console.log(jiazuxinxi)
                }
          })
},
baocuncanshu:function(){
  if (this.data.openid!= this.data.jiazushenqingrenid){
        wx.showToast({
          title: '你不是创建者，没有设置权限',
          icon:"none"
        })
    return
  }
  var that=this
  var  qiangzhiguanbi=that.data.jiazuxinxi[0].qiangzhiguanbi
  var  zizhuguanbi=that.data.jiazuxinxi[0].zizhuguanbi
  var  mimazhi=that.data.jiazuxinxi[0].mimazhi
  var  mima=that.data.jiazuxinxi[0].mima
  var  baimingdan=that.data.jiazuxinxi[0].baimingdan
   if (qiangzhiguanbi==undefined){ qiangzhiguanbi=false}
   if(  zizhuguanbi==undefined){zizhuguanbi=false}
   if(mimazhi==undefined){mimazhi=false}
   if(mima==undefined){mima=""}
   if(baimingdan==undefined){baimingdan=false}
   var id=that.data.jiazuxinxi[0]._id
const db=wx.cloud.database()

db.collection('jiazumingcheng').doc(id).update({
 data:{
    qiangzhiguanbi:qiangzhiguanbi,
    zizhuguanbi:zizhuguanbi,
    mimazhi:mimazhi,
    mima:mima,
    baimingdan:baimingdan,
 },
 success:res=>{
  wx.showToast({
    title: '你的设置保存成功！！',
    icon:"none"
  })
  if (that.data.baimingdan==true){
   that.duqubaimingdan()
   }
 },
 fail: err => { 
 console.error()
 console.log(23456,err)
 },
})
// .then(res=>{
  
// })

// console.log(that.data.jiazuxinxi)

},
chushihuabaimingdan:function(){
  //初始为白名单
  wx.cloud.callFunction({ 
    name:"chushihuabaimingdan",
    data:{
     jiazumingcheng:this.data.jiazumingcheng
    }
  })
  wx.showToast({
    title: '白名单初始化成功！！',
    icon:"none"
  })

  // 初始为白名单

},
biaomingdanshenhe:function(e){
  //白名单同意 fangshi=xiugai 拒绝 fangshi=shangchu
 
    var that=this
    //  console.log(e)
  var fangshi=e.target.dataset.fangshi
  var xu=e.target.dataset.xu
  var zhi=e.target.dataset.zhi
  var id=e.target.id
  wx.cloud.callFunction({
    name:"baimingdanxiugaishanchu",
    data:{
      fangshi:fangshi,
      zhi:zhi,
      id:id,

    }
  })
   this.data.baimingdanlist.splice(xu,1)
   this.setData({
    baimingdanlist:this.data.baimingdanlist
   })
  wx.showToast({
    title: '处置成功！',
    icon:"none"
  })

},
biaomingdanshenhequanbu:function(e){
  //黑白名单hua划转
 
    var that=this
    //  console.log(e)
  var fangshi=e.target.dataset.fangshi//总是"xiugai"
  var xu=parseInt(e.target.dataset.xu)
  var zhi=e.target.dataset.zhi
  var id=e.target.id
  wx.cloud.callFunction({
    name:"baimingdanxiugaishanchu",
    data:{
      fangshi:fangshi,
      zhi:zhi,
      id:id,

    }
  })
  // console.log(this.data.baimingdantotal,xu,e)
    this.data.baimingdantotal[xu].shenhe=zhi

   this.setData({
    baimingdantotal:this.data.baimingdantotal
   })
  // wx.showToast({
  //   title: '划转成功！',
  //   icon:"none"
  // })

}

})