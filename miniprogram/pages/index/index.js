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
    shenqingrendianhua:""
  },

  onLoad: function() {
   
    

  
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return 
    }
    this.onGetOpenid()
    if (app.globalData.jiazumingcheng!=""){
      this.setData({
    jiazumingcheng:app.globalData.jiazumingcheng,
    jiazushenqingren:app.globalData.jiazushenqingren,
    shenqingrendianhua:app.globalData.shenqingrendianhua
       })
    } else{
      wx.redirectTo({
        url: '../shenqingjiazu/shenqingjiazu'
      })
    }
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
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
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
         openid:   app.globalData.openid 
        })
        
        //  this.dengji()
        // wx.navigateTo({
        //   // url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  //   wx.getStorage  ({
  //     key: 'jiazumingcheng',
  //     success (res) { 
  //       console.log(res.data)
  //       app.globalData.jiazumingcheng=res.data
  //       this.setData({
  //         jiazumingcheng:app.globalData.jiazumingcheng
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'jiazushenqingren',
  //     success (res) { 
  //        console.log(res.data)
  //       app.globalData.jiazushenqingren=res.data
  //       this.setData({
  //         jiazushenqingren:app.globalData.jiazushenqingren
  //       })
  //     }
  //   })
  //   wx.getStorage({ 
  //     key: 'shenqingrendianhua',
  //     success (res) {
  //       console.log(res.data)
  //       app.globalData.shenqingrendianhua=res.data
  //     this.setData({
  //     shenqingrendianhua:app.globalData.shenqingrendianhua
  //   })
  // }
  //   })

  },

  
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
    //  wx.showModal({
    //   title: this.data.openid+"0000",
    //   duration: 8000
    // })
     testDB.collection('userku').where({
    _openid:this.data.openid
   
    
    })
   .get({
      success:res=> {
        console.log(res,"成功回调1")
      //  wx.showModal({
      //    title: '666:'+this.data.openid,
      //    duration:5000
      //  })
        // res.data 包含该记录的数据
        console.log(res.data.length,"成功回调2")
        if( res.data.length!=0){ 
         
           console.log(res.data,"成功回调3",res.data.length)
       
         var dengji=res.data[0]
         getApp().globalData.cishu=dengji["cishu"]+1

          console.log(getApp().globalData.cishu,dengji,1234)
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
             console.log(res,2221)
          }
        
        })
      }else{ 
        // getApp().globalData.cishu=1
        console.log(res,"成功回调且为新人")
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
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res, "添加xinren成功5")
            
            // wx.showModal({
            //   title: '2成功登记数据库title，新人',
            //   duration:5000
            // })
    
          },
          fail: err => { 
            // wx.showModal({
            //   title: '3 失败？？？？登记数据库，新人',
            //   duration:5000
            // })
           
             console.error('[数据库] [新增记录] 失败：', err,6)
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
    
  }



})
