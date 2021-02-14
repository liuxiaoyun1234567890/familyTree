// pages/xungen/xungen.js
 const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   jiazumingcheng:app.globalData.jiazumingcheng,
   list:[],
   listtotal:[],
  //  daixi:0
   xu:0,
   fangshi:0,
   jiazushenqingren:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.jiazumingcheng=app.globalData.jiazumingcheng
    this.data.jiazushenqingren=app.globalData.jiazushenqingren
    this.setData({
     jiazushenqingren:this.data.jiazushenqingren
    })
    if (this.data.jiazumingcheng=="") {
      wx.redirectTo({
          url: '/pages/index/index',
      })
      console.log('去首页')
      wx.showToast({
        title: '家族名称：'+app.globalData.jiazumingcheng,
      })
    }
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
  zhidingxingming:function(e){
    // 查询指定姓名字段
     var   name=e.detail.value
     console.log(e)
     var that=this
    //  var youwu=false
     if (name.length==0 ){
      wx.showToast({
        title: "请输入姓名",
        icon:"none",
      })
      return
     }
     for (var i=0;i<that.data.listtotal.length;i++){
          if(that.data.listtotal[i].name==name ){
           that.setData({xu:i})
            break
          }
     }
    //  if (youwu==true ){
    //       wx.showToast({
    //         title: "临时库中存在该记录",
    //         icon:"none",
    //       })
    //       return
    //  }
     
     const testDB = wx.cloud.database({
       env: 'liuxiaoyunyun-wsc3r'
    })
    const _ = testDB.command
     testDB.collection('jiazurenyuan').where({
     mingcheng:that.data.jiazumingcheng,
     name: testDB.RegExp({
       regexp:''+ name,
       // regexp: '.*' +name,
       // options: 'i',
     })
   })
   .get({
      success:res=> {
            
           if (res.data.length>=1){
              wx.showToast({
                title: (res.data.length)+"条记录,请查阅",
                icon:"none",
              })
             if (res.data.length==1 ){
               
              that.data.listtotal.push(res.data[0] )
             
              // if (that.data.listtotal.length=1){
              //   that.data.listtotal[0].daixi=1
              // }
              
              that.setData({
               listtotal: that.data.listtotal,
               xu:that.data.listtotal.length-1
              })
               return
             }else{

              // that.data.listxuhao=1
              that.setData({
               list:res.data, 
                            })
                   
              }
                      
            }else{
             wx.showToast({
               title: "没有数据●●●！",
               icon:"none",
             })
            }
   
       }
     })
     // 查询指定姓名字段 OK
   
   },
   xuezerenyuan:function(e){
     var that=this
     var id=e.target.id
    //  wx.showModal({
    //    cancelColor: 'cancelColor',
    //    title:"请确认：",
    //    confirmText:"确定",
    //    canceltext:"取消",
    //    content:"第"+(parseInt(id)+1)+"位："+that.data.list[id].name,
    //         success (res) {
                    // if (res.confirm) {
                      that.data.listtotal.push(that.data.list[id])
                      if (that.data.listtotal.length=1){
                        that.data.listtotal[0].daixi=1 
                      }
                      that.data.list.splice(0)
                      that.setData({
                       list:that.data.list,
                       listtotal:that.data.listtotal
                      })
                      
                    // }else{
                      
                    // }
    //           }//

    //  })//
   },
   xuezebianmaid:function(e){
// / 查询指定姓名按编码查询
console.log(e)

var that=this
var   id=e.target.id//xu
var bianma=e.target.dataset.bianma
var name=e.target.dataset.name

if (that.data.fangshi=="1"){
//进入增加修改查询
wx.navigateTo({
  url: '/pages/databaseGuide/databaseGuide?id=' +bianma + "&name=" +  name+ "&fuqinname=''" + "&fuqinid=''" 
 });
  return
}

if (bianma.length==0 ){
 wx.showToast({
   title: "没有链接码，修改后刷新本页试试",
   icon:"none", 
 })
 return
}
for (var i=0;i<that.data.listtotal.length;i++){
     if(that.data.listtotal[i]._id==bianma ){
       that.setData({xu:i})
      
     return
     }
}


const testDB = wx.cloud.database({
  env: 'liuxiaoyunyun-wsc3r'
})
const _ = testDB.command
testDB.collection('jiazurenyuan').where({
mingcheng:that.data.jiazumingcheng,
_id:bianma 
})
.get({
 success:res=> {
       
      if (res.data.length>=1){
        //  wx.showToast({
        //    title: (res.data.length)+"条记录",
        //    icon:"none",
        //  })
        if (res.data.length==1 ){
         
         that.data.listtotal.push(res.data[0] )
         
        //  if( daixi!="undefined" ){ 
        //   that.data.listtotal[mubiaoid].daixi=daixi
        //   // that.data.listtotal.sort()
        //  }else{//此句无用
        //   that.data.listtotal[mubiaoid].daixi=""
        //   }
         
         that.setData({
           listtotal:that.data.listtotal,
           xu:that.data.listtotal.length-1
         })
          return
        }else{
          wx.showToast({
            title: (res.data.length)+"条记录,编码有错",
            icon:"none",
          })
         
              
         }
                 
       }else{
        wx.showToast({
          title: "没有数据，原编码已经删除了",
          icon:"none",
        })
       }

  }
})
// 查询指定姓名按编码查询 OK

     
// console.log(this.data.listtotal,3460)  

   },
   xuezebianmaidshuaxin:function(e){
   this.data.listtotal.splice(0,this.data.listtotal.length)
   console.log(this.data.listtotal,345)
  //  this. xuezebianmaid(e)
   },
   qiehuanmoshi:function(e){
     //三种模式切换
    console.log(e)
    var qiehuan=e.target.id
    switch(qiehuan){
    case "qh0" :
      this.setData({
        fangshi:0
      })
    break
    case "qh1" :
      this.setData({
        fangshi:1
      })
    break
    case "qhfanhui":  
    this.setData({
      xu:0,
      fangshi:0
    })

     break

      
    }

   }

})