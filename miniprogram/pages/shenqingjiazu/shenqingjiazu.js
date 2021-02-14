// pages/shenqingjiazu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   lurumima:"",
   jianchen:"",
   jiazumingcheng:"",
   jiazushenqingren:"",
   jiazushenqingrenid:"",
   shenqingrendianhua:"",
   list:[{"mingcheng":"碱厂刘","chuangjianzhe":"刘晓云","dianhua":"13832429913"}]
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
 this.chaxun()
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
  jiazumingchenginput:function(e){
    // console.log(e)
   var ls=e.detail.value
   if ( ls.length!=0 ){
     this.setData({
    jiazumingcheng:ls
      })
      // this.jiazushenqingrenblur(e)
   }

  },
  jiazushenqinginput:function(e){
    // console.log(e)
   var ls=e.detail.value
   if ( ls.length!=0 ){
     this.setData({
    jiazushenqingren:ls
      })
   }
  
  },

  jiazushenqingrenblur:function(e){
    // console.log(e)
   var ls=e.detail.value
    this.setData({
    jiazushenqingren:ls
      })
   if ( ls.length!=0 ){
     
     var jiazushenqingren=ls
     var  jiazumingcheng=this.data.jiazumingcheng

      if (jiazumingcheng!=""){
      //  lsls="刘晓云1213".substr(0,2)
      //
        ls=jiazumingcheng.substr(jiazumingcheng.length-1, 1)
      //  console.log(ls,"ls",jiazumingcheng)
        // if (ls!=jiazushenqingren.substr(0,1)){
        //   wx.showModal({
        //     showCancel:false,
        //     title:"提示：",
        //     content:"家族名称最后一字须等于姓名的首字符，即申请人须为直系家族人士",
        //     confirmText:'同意修改',
            
            
        //   })
          
        // }

      }
   }


  },
  shenqingrendianhuablur:function(e){
    var ls=e.detail.value
    this.setData({
      shenqingrendianhua:ls
        })
    // console.log(e)
    if (!(ls.length==0 || ls.length==11)){
      wx.showModal({
        showCancel:false,
        title:"提示："+ls,
        content:"手机号码约定为11位，除非不填",
        confirmText:'好的',
        
        
      })
    }


  },
  shenqingrendianhuainput:function(e){
    var ls=e.detail.value
    this.setData({
      shenqingrendianhua:ls
        }) 
   
    


  },
  zhucejiazu:function(e){
  var mingcheng=this.data.jiazumingcheng
  var chuangjianzhe=this.data.jiazushenqingren
  var dianhua=this.data.shenqingrendianhua
  // console.log(mingcheng,chuangjianzhe,dianhua,"liu")

  if(mingcheng.length==0 ){
    wx.showModal({
      showCancel:false,
      title:"提示:",
      content:"家族名称至少2个字",
      confirmText:"申请失败",
    })
  }else if( chuangjianzhe.length==0)  {
    wx.showModal({
      showCancel:false,
      title:"提示:",
      content:"创建者至少1个字",
      confirmText:"申请失败",
    }) 

  // }  else if( chuangjianzhe.substr(0,1)!=mingcheng.substr(mingcheng.length-1,1)){
  //   wx.showModal({
  //     showCancel:false,
  //     title:"提示:",
  //     content:"家族名称最后一字须等于姓名的首字符，即申请人须为直系家族人士",
  //     confirmText:'申请失败',
  //     })

  }else if(!(dianhua.length==0 || dianhua.length==11)){
    wx.showModal({
      showCancel:false,
      title:"提示："+ls,
      content:"手机号码约定为11位，除非不填",
      confirmText:'申请失败',
      
    })
  }else{

    this.dengji()
// ------
  } //申请注册完毕

  },
  dengji: function () {
    var mingcheng=this.data.jiazumingcheng
    var chuangjianzhe=this.data.jiazushenqingren
    var dianhua=this.data.shenqingrendianhua
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
    
     testDB.collection('jiazumingcheng').where({
    mingcheng:mingcheng
   
    
    })
   .get({
      success:res=> {
        // console.log(res,"成功连接数据库")
       
        // res.data 包含该记录的数据 
         
        if( res.data.length!=0){
          wx.showModal({
            showCancel:false,
            title: '该家族名已存在，申请注册失败',
            duration:5000
          })
     
      }else{
        
        testDB.collection("jiazumingcheng").add({ 
     
          data: {
            //  _id: 
    
             mingcheng:mingcheng,
             chuangjianzhe:chuangjianzhe,
             dianhua:dianhua,
             time:time
          },
          // console.log(123),
          success: res => {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            // console.log(res, "申请注册成功")
            
           wx.showToast({
             title: '成功！第1条就是您注册的',
             icon:"none"
           })
            this.data.list.unshift(
              {"mingcheng":mingcheng,
              "chuangjianzhe":chuangjianzhe,
              "dianhua":dianhua,
              "time":time } 
            )
            this.setData({
              list:this.data.list
            })
    
          },
          fail: err => { 
            wx.showModal({
              showCancel:false,
              title: '已核准增加，但未知原因未能成功',
              duration:5000
            })
           
            // console.error('[数据库] [新增记录] 失败：', err,333)
          },
        })
      }  //elsejieshu
      },
      fail:res=>{
        wx.showModal({
          showCancel:false,
          title: '无法访问数据库,申请失败',
          duration:5000
        })
        
      }
    })

    

    //  我想登记一下用户信息
  },
  jiancheninput:function(e){
 this.setData({
   jianchen:e.detail.value
 })
 this.chaxun(e)
  },
  chaxun:function(e){
    // console.log(this.data.jianchen)
    const testDB = wx.cloud.database({
      env: 'liuxiaoyunyun-wsc3r'
   }) 
  testDB.collection('jiazumingcheng') 
   .where({
     
     mingcheng: testDB.RegExp({
      regexp: '.*' + this.data.jianchen,
      options: 'i',
    })
   }) 
   .get({
      success:res=> {
        // console.log(res)
        this.setData({
          list:res.data
        })
      }
    })
    
  },
  xuandingjiazu:function(e){
   
    var id=e.currentTarget.id
    var that=this
    if (that.data.list[id].mima!=that.data.lurumima & that.data.list[id].mimazhi==true ){
      console.log(that.data.list,id,that.data.list[id].mima,that.data.lurumima,that.data.list[id].mimazhi)

      wx.showToast({
        title: '密码错禁入！联系电话：'+that.data.list[id].chuangjianzhe+that.data.list[id].dianhua,
        icon:"none",
        duration:3000
      })
      return  
    }

    getApp().globalData.jiazumingcheng=that.data.list[id].mingcheng,
    getApp().globalData.jiazushenqingren=that.data.list[id].chuangjianzhe,
    // 
    getApp().globalData.jiazushenqingrenid=that.data.list[id]._openid,
    getApp().globalData.shenqingrendianhua=that.data.list[id].dianhua

          wx.redirectTo({
            url: '../index/index'
          })
          wx.setStorage({
            key:"jiazumingcheng",
            data:getApp().globalData.jiazumingcheng
          })
          wx.setStorage({
            key:"jiazushenqingren",
            data:getApp().globalData.jiazushenqingren})
            wx.setStorage({
              key:"jiazushenqingrenid",
              data:getApp().globalData.jiazushenqingrenid})

            wx.setStorage({
              key:"shenqingrendianhua",
              data:getApp().globalData.shenqingrendianhua
            })
          
        //待跳转
      //   } else if(res.cancel){//

      //   }//
      // }//
      //   })//
     
    
  },
  lurumimainput:function(e){
    // console.log(e)
   var ls=e.detail.value
   if ( ls.length!=0 ){
     this.setData({
    lurumima:ls
      })
   }
  
  },
 
})