// pages/shuzhuangputu/shuzhuangputu.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiaputotal:[],
    maxxzhi:0,
    zuoyizhi:0,
    maxdaixi:0,
    jiazumingcheng:"" ,
    jiazushenqingren:"",
    jiazushenqingrenid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.data.jiazumingcheng=app.globalData.jiazumingcheng
    that.data.jiazushenqingren=app.globalData.jiazushenqingren,
    that.data.jiazushenqingrenid=app.globalData.jiazushenqingrenid
    if (that.data.jiazumingcheng=="") {
     wx.redirectTo({
         url: '/pages/index/index',
     })
    }
    that.data.jiaputotal= wx.getStorageSync('jiaputotal')
  //  console.log(that.data.jiaputotal)
  //  var that=this
   if (that.data.jiaputotal.length!=0) {
     var zuoyizhi=1000
     var maxxzhi=-1000
     for (var ii=0;ii<that.data.jiaputotal.length;ii++){
       zuoyizhi=Math.min(that.data.jiaputotal[ii].x,zuoyizhi)
       maxxzhi=Math.max(that.data.jiaputotal[ii].x,maxxzhi)
      }

        that.setData({
         zuoyizhi:zuoyizhi,
         maxxzhi: maxxzhi,
         maxdaixi:that.data.jiaputotal[that.data.jiaputotal.length-1].daixi,
         jiaputotal: that.data.jiaputotal,
         jiazumingcheng:that.data.jiazumingcheng
     })
     }
     wx.showToast({
       title: '正在加载数据...',
       icon:"none",
       duration:3000
     })
     setTimeout(() => {  that.shengchengzhaopian() }, 3000);
     
     

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
  shengchengzhaopian:function(e){
    var that= this
    var jiaputotal=that.data.jiaputotal
    var zuoyizhi=that.data.zuoyizhi
    var x=0
    var y=0
 const ctx=wx.createCanvasContext('mycanvas')
 ctx.setFillStyle('#F5DEB3')
 ctx.fillRect(0,0,that.data.maxxzhi-zuoyizhi+20,that.data.maxdaixi*90)
  ctx.draw(true)
 if (that.data.maxxzhi-zuoyizhi+20>200 ){
        ctx.setFillStyle("green")
              if (app.globalData.openid==that.data.jiazushenqingrenid){
              ctx.fillText("审核："+that.data.jiazushenqingren,0,20)
              } else{
                ctx.fillText("非完整版家谱，谨慎应用",0,20)
              }
              var t = new Date()
              var time=t. getFullYear() +"年"
              var ls=("00"+ (t.getMonth()+1))
              time=time+ls.slice(ls.length-2)+"月" 
              ls="00"+t.getDate() 
              time=time+ls.slice(ls.length-2) +"日"
             

        ctx.fillText(time,0,40)
 }
 ctx.setFillStyle("black")
ctx.setFontSize(17) 
 for (var i=0;i<jiaputotal.length;i++){
   x=jiaputotal[i].x-zuoyizhi
   y=(jiaputotal[i].daixi-1)*90+20
  
  
  setTimeout(function () {
    //要延时执行的代码
        }, 500)
  for(var zichang=0;zichang<jiaputotal[i].name.length;zichang++){
    if(jiaputotal[i].name.slice(zichang,zichang+1)!="*"){
    ctx.fillText(jiaputotal[i].name.slice(zichang,zichang+1),x,y+zichang*20)
    }
  }
   ctx.draw(true)
 }

 
    for (var i=1;i<jiaputotal.length;i++){
    // if( jiaputotal[i].x!=jiaputotal[jiaputotal[i].fuqinxu].x){

   ctx.beginPath
   ctx.setStrokeStyle("blue")
   ctx.moveTo(jiaputotal[i].x-zuoyizhi+10,(jiaputotal[i].daixi-1)*90+10)
    
     ctx.lineTo(jiaputotal[jiaputotal[i].fuqinxu].x-zuoyizhi+10,(jiaputotal[jiaputotal[i].fuqinxu].daixi-0)*90-30)
    ctx.stroke()
    ctx.draw(true)
    // return
      // }
    }
  },
  baocunxiangpian:function(e){
     wx.canvasToTempFilePath({
    // canvas: canvas,
    canvasId: 'mycanvas',
    // destHeight: 100,
    // destWidth: 100,
    // fileType: 'png',
    // height: 200,
    // quality: 1,
    // width: 400,
    // x: 0,
    // y: 0,
    success: (result) => {
      // console.log(0,result)
      wx.saveImageToPhotosAlbum({
        filePath: result.tempFilePath,
      })
      wx.showToast({
        title: '成功保存了图片',
      })
    },
    fail: (res) => {
      wx.showToast({
        title: '保存图片失败'+res,
      })
      },
    complete: (res) => {console.log(2,res)},
  })//, component

  }
})