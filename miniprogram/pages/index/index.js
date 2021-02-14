//index.js
const app = getApp()

Page({
  data: {
   
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    openid:"",
    jiazumingcheng:"",
    jiazushenqingren:"",
    jiazushenqingrenid:"",
    shenqingrendianhua:"",
    jizuxinxi:[],
    mimazhi:"",
    baimingdan:"",
    baimingdanlist:[]
  },

  onLoad: function() {
    // console.log("1121212，进入了on load")
   var that=this
    

  
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return 
    }
   
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo=res.userInfo
              //  console.log(app.globalData.userInfo,res.userInfo,"qujuuserinfo")
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            } 
          })
        }
      }
    })
    

  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
         openid:   app.globalData.openid 
        })
        
       
      },
      fail: err => {
        // console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
   
  },//// 调用云函数

  
  dengji: function () { 
    // 我想登记一下用户信息
    
    const testDB = wx.cloud.database({
       env: 'liuxiaoyunyun-wsc3r'
    })
    const _ = testDB.command
    var t = new Date()
    var time=""
// getDate()	以数值返回天（1-31）
// getDay()	以数值获取周名（0-6）
// getFullYear()	获取四位的年（yyyy）
// getHours()	获取小时（0-23）
// getMilliseconds()	获取毫秒（0-999）
// getMinutes()	获取分（0-59）
// getMonth()	获取月（0-11）
// getSeconds()	获取秒（0-59）
// console.log(t)
     time=t. getFullYear() +""+ (t.getMonth()+1) +""+t.getDate() +" "+t.getHours() +":"+t.getMinutes()
    
     testDB.collection('userku').where({
    _openid:this.data.openid
   
    
    })
   .get({
      success:res=> {
        // console.log(res,"成功回调1")
      //  wx.showModal({
      //    title: '666:'+this.data.openid,
      //    duration:5000
      //  })
        // res.data 包含该记录的数据
        // console.log(res.data.length,"成功回调2")
        if( res.data.length!=0){ 
         
          //  console.log(res.data,"成功回调3",res.data.length)
       
         var dengji=res.data[0]
         getApp().globalData.cishu=dengji["cishu"]+1

          // console.log(getApp().globalData.cishu,dengji,1234)
         testDB.collection('userku').doc(dengji["_id"]).update({
          // data 传入需要局部更新的数据 
          data: {
            // 表示将 done 字段置为 true
            cishu:dengji["cishu"]+1,
            zjdl:time
          },
          success:function(res) {
            wx.showModal({
              title: '1成功登记数据库title，老人',
              duration:5000
            })
            //  console.log(res,2221)
          }
        
        })
      }else{ 
        // getApp().globalData.cishu=1
        // console.log(res,"成功回调且为新人")
        testDB.collection("userku").add({  
     
          data: {
              // _id: this.data.openid
              //'1t1odo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    
            city:this.data.userInfo.city,
            nickName:this.data.userInfo.nickName,
             zjdl:time,
             cishu:1
          },
          
          success: res => {
            
    
          },
          fail: err => { 
           
          },
        })

      }  //elsejieshu
      },
      fail:res=>{
        wx.showModal({
          title: '4 无法访问数据库444444',
          duration:5000
        })
        
      }
    })

    

    //  我想登记一下用户信息
  },
  shenqingjiazu:function(){
  
    wx.redirectTo({
      url: '../shenqingjiazu/shenqingjiazu'
    })
    
  },
  onShow: function () {
    this.onGetOpenid()
    app.globalData.jiazumingcheng= wx.getStorageSync('jiazumingcheng')
    app.globalData.jiazushenqingren= wx.getStorageSync('jiazushenqingren')
    app.globalData.jiazushenqingrenid= wx.getStorageSync('jiazushenqingrenid')
    app.globalData.shenqingrendianhua= wx.getStorageSync('shenqingrendianhua')
    if (app.globalData.jiazumingcheng!=""){//全局变量家族名称存在
      this.setData({
    jiazumingcheng:app.globalData.jiazumingcheng,
    jiazushenqingren:app.globalData.jiazushenqingren,
    jiazushenqingrenid:app.globalData.jiazushenqingrenid,
    shenqingrendianhua:app.globalData.shenqingrendianhua
   
       })

    } else{
      wx.redirectTo({
        url: '../shenqingjiazu/shenqingjiazu'
      })
    }
    setTimeout(() => {  this.duqujiazuxinxi() }, 500);    //内含读取白名单

  },
  duqujiazuxinxi: function () {
    //与权限设置模块一致，读取家族信息
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
  
   if ( res.data.length==1){
         that.setData({
         jiazuxinxi:res.data ,
         })
          
          that.data.mimazhi=res.data[0].mimazhi,
          that.data.baimingdan=res.data[0].baimingdan

          // if(that.data.mimazhi==underfind){that.data.mimazhi=false }
          // if(that.data.baimingdan==underfind){that.data.baimingdan=false }
          
          that.setData({
          mimazhi:that.data.mimazhi,
          baimingdan:that.data.baimingdan
          })
         // console.log(that.data.jizuxinxi)
          if (that.data.baimingdan==true){

            setTimeout(() => {  that.duqubaimingdan()  }, 1000);
              
          }else{
            //  that.data.baimingdanlist.splice(0,that.data.baimingdanlist.length)
            //  that.data.baimingdanlist.push ({"shenhe":false})
          }
          
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
  //  wx.showToast({
  //    title:".",// '正在调入白名单数据',
  //    icon:"none",
  //  })
  //读取白名单,
  var that=this
  const testDB = wx.cloud.database({
    env: 'liuxiaoyunyun-wsc3r'
  })
  const _ = testDB.command
   testDB.collection('baimingdan').where({
     mingcheng:that.data.jiazumingcheng,
     mingdanopenid:that.data.openid
  })
  .get({
   success:res=> {
    
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
  // console.log(that.data.baimingdanlist,"no123")
  //读取白名单
  },
  shenqingbaimingdan:function(){
    // console.log(12134,this.data.baimingdanlist)
    //申请白名单
    var that=this
    const testDB = wx.cloud.database({
    env: 'liuxiaoyunyun-wsc3r'
  })
  const _ = testDB.command
   testDB.collection('baimingdan').add({
   data:{
     mingcheng:that.data.jiazumingcheng,
     mingdanopenid:that.data.openid,
     nicheng:that.data.userInfo.nickName,
     shenhe:false
   },
success:function(res) {
  // console.log(res,0)
  that.data.baimingdanlist.push({"mingcheng":that.data.jiazumingcheng,"mingdanopenid":that.data.openid,"shenhe":false,"nicheng":that.data.userInfo.nickName})
   that.setData({
     baimingdanlist:that.data.baimingdanlist
     })
       
     
     },
  })
 
  }



})
