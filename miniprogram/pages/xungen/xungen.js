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
   daixi:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.jiazumingcheng=app.globalData.jiazumingcheng
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
     var that=this
     var youwu=false
     if (name.length==0 ){
      wx.showToast({
        title: "请输入姓名",
        icon:"none",
      })
      return
     }
     for (var i=0;i<that.data.listtotal.length;i++){
          if(that.data.listtotal[i].name==name ){
            youwu=true
            break
          }
     }
     if (youwu==true ){
          wx.showToast({
            title: "临时库中存在该记录",
            icon:"none",
          })
          return
     }
     
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
              if (that.data.listtotal.length=1){
                that.data.listtotal[0].daixi=1
              }
              
              that.setData({
               listtotal: that.data.listtotal
              })
               return
             }else{

              that.data.listxuhao=1
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
     wx.showModal({
       cancelColor: 'cancelColor',
       title:"请确认：",
       confirmText:"确定",
       canceltext:"取消",
       content:"第"+(parseInt(id)+1)+"位："+that.data.list[id].name,
            success (res) {
                    if (res.confirm) {
                      that.data.listtotal.push(that.data.list[id])
                      if (that.data.listtotal.length=1){
                        that.data.listtotal[0].daixi=1 
                      }
                      that.data.list.splice(0)
                      that.setData({
                       list:that.data.list,
                       listtotal:that.data.listtotal
                      })
                      
                    }else{
                      
                    }
              }

     })
   },
   xuezebianmaid:function(e){
// / 查询指定姓名按编码查询

var that=this
var   id=e.target.id
var bianma=e.target.dataset.bianma
var daixi=parseInt(e.target.dataset.daixi)
var mubiaoid=parseInt(id)+parseInt( e.target.dataset.zhangyou)
var youwu=false
if (bianma.length==0 ){
 wx.showToast({
   title: "没有链接码，核实后再来查询",
   icon:"none",
 })
 return
}
for (var i=0;i<that.data.listtotal.length;i++){
     if(that.data.listtotal[i]._id==bianma ){
       youwu=true
       break
     }
}
if (youwu==true ){
     wx.showToast({
       title: "临时库中存在该记录",
       icon:"none",
     })
     return
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
         wx.showToast({
           title: (res.data.length)+"条记录",
           icon:"none",
         })
        if (res.data.length==1 ){
         
         that.data.listtotal.splice (mubiaoid,0,res.data[0] )
         
         if( daixi!="undefined" ){ 
          that.data.listtotal[mubiaoid].daixi=daixi
          // that.data.listtotal.sort()
         }else{//此句无用
          that.data.listtotal[mubiaoid].daixi=""
          }
         
         that.setData({
           listtotal:that.data.listtotal
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

     
     

   }

})