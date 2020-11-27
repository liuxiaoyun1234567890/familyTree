// pages/guanliyuan/guanliyuan.js
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    yehao:0,
    jiazutotal:0,
    pagejilu:20,
    totalpage:0,
    jiazumingcheng:"",
    // jiazushenqingrenid:"",
    openid:"",
    renyuanlist:[],
    nian:new Date(). getFullYear()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
     if (app.globalData.openid){
       this.setData({
      openid: app.globalData.openid,
      jiazumingcheng:app.globalData.jiazumingcheng,
      // jiazushenqingrenid:app.globalData.jiazushenqingrenid
    })
     }
      wx.setNavigationBarTitle({
      title: this.data.jiazumingcheng+ '管理员专区' 
    })
    var jiazutotal=0
    var totalpage=0
    const testDB = wx.cloud.database({
      env: 'liuxiaoyunyun-wsc3r'
    })
    testDB.collection('jiazurenyuan').where({
      mingcheng:this.data.jiazumingcheng
    }) .count().then(res => {
       jiazutotal=res.total
      this.setData({
        jiazutotal:res.total
      })
       totalpage =Math.floor((this.data.jiazutotal)/this.data.pagejilu+0.999)
          
        this.setData({  totalpage:totalpage        })
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
     // 读取 人员录入统计数据
    

      this.diaoquyeshusuju(yehao)
    //选择页号OK
  },
   diaoquyeshusuju:function(yeshu){
    //调取 家族登记人数
    var renyuanlist=[]
    // console.log("res" ,555)
    // var that=this 
    
    const testDB=wx.cloud.database({
      env:'liuxiaoyunyun-wsc3r'
    })
    // console.log(this.data.jiazumingcheng,yeshu,this.data.pagejilu)
    testDB.collection("jiazurenyuan").orderBy('chusheng', 'asc')
    .where({mingcheng:this.data.jiazumingcheng})
    // .sort ( name ) desc
    .skip(yeshu*this.data.pagejilu)
    .limit(this.data.pagejilu)
    .get()
    .then(res => { 
       renyuanlist=res.data
       var date=new Date()
       var nian=date.toString()
      //  parseInew Date()(new Date().getFullYear.toString)
      //  console.log(typeof nian,nian,"ou")
       for(var hs =0;hs<renyuanlist.length;hs++){
         var ls=renyuanlist[hs].name+"，"+renyuanlist[hs].xingbie+"，"
            ls=ls+"出生于"+renyuanlist[hs].chusheng.slice(0,4)+"年"+renyuanlist[hs].chusheng.slice(4,6)+"月"+renyuanlist[hs].chusheng.slice(6)+"日"+"，"
          if (renyuanlist[hs].siwang!="") {
             ls=ls+"死亡于"+renyuanlist[hs].siwang.slice(0,4)+"年"+renyuanlist[hs].siwang.slice(4,6)+"月"+renyuanlist[hs].siwang.slice(6)+"日"+"，"
          }
           ls=ls+renyuanlist[hs].yimin+"，"
           
            if ( renyuanlist[hs].dizhi!="" ){   ls=ls+"居住在："+renyuanlist[hs].dizhi+","}
          
           if (renyuanlist[hs].dianhua!=""){ ls=ls+"电话"+renyuanlist[hs].dianhua}
           if(renyuanlist[hs].fuqin.name!=""){ls=ls+"\r\n父亲："+ renyuanlist[hs].fuqin.name }
           if(renyuanlist[hs].muqin.name!=""){ls=ls+"\r\n"+"母亲："+ renyuanlist[hs].muqin.name }
           var posl=0
           Object.keys(renyuanlist[hs].peio).forEach(function(key){
             posl++;
           })
            if (posl >=1){
            ls=ls+"\r\n"+"配偶："
              for (var i=0;i<renyuanlist[hs].peio.length;i++){
               ls=ls+renyuanlist[hs].peio[i].name+" " 
              }
             }
             var znsl=0
           Object.keys(renyuanlist[hs].zinv).forEach(function(key){
             znsl++;
           })
            if (znsl >=1){
            ls=ls+"\r\n子女："
              for (var i=0;i<renyuanlist[hs].zinv.length;i++){
               ls=ls+renyuanlist[hs].zinv[i].guanxi+renyuanlist[hs].zinv[i].name+" " 
              }
             }
             if ( renyuanlist[hs].tbtime!="" ){   ls=ls+"\r\n"+renyuanlist[hs].tbtime}
             if(this.data.openid==renyuanlist[hs]._openid){
               ls=ls+"(我的数据)"
             }
            


         renyuanlist[hs].jianjie=ls

       }




      
      this.setData({
        renyuanlist:renyuanlist
      })
      // console.log(this.data.renyuanlist,res.data,333,res)
     })
    .catch(err=>{ console.log(err)   })
    
     
      
    
    //调取 家族指定名称页数内的数据
    } 
})