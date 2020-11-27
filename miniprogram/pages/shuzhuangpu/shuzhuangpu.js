// pages/shuzhuangpu/shuzhuangpu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiaputotal:[],
    list:[],
    listxuhao:0,
    xiayidaixi:0
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
   
      // const query = wx.createSelectorQuery()
      // query.select('#myCanvas')
      //   .fields({ node: true, size: true })
      //   .exec((res) => {
      //     const canvas = res[0].node
      //     const ctx = canvas.getContext('2d')
  
      //     const dpr = wx.getSystemInfoSync().pixelRatio
      //     canvas.width = res[0].width * dpr
      //     canvas.height = res[0].height * dpr
      //     ctx.scale(dpr, dpr)
  
      //     ctx.fillRect(1, 5, 500, 200)
      //      console.log(dpr,"liuxiaoyun ",res)
      //   })
   

    //   wx.showLoading({
    //     title: 'title',
    //   })
    //   var mychart=echarts.init(document.getElementById('yemianzhong fr divde id'))
    //  $.get('data/asset/data/flare.json',function(data){
    //    twx.hideLoading({
    //      success: (res) => {},
    //    })
    //  }
    //  )
     
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
     for (var i=0;i<that.data.jiaputotal.length;i++){
          if(that.data.jiaputotal[i].name==name ){
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
   .field({
     _id:true,
    name: true,
    fuqin:true,
    muqin:true,
    peio:true,
    zinv: true,
    xingbie:true,
    chusheng:true
  })
   .get({
      success:res=> {
            
           if (res.data.length>=1){
              wx.showToast({
                title: (res.data.length)+"条记录,请查阅",
                icon:"none",
              })
             if (res.data.length==1 ){
               
              that.data.jiaputotal.push(res.data[0] )
              if (that.data.jiaputotal.length=1){
                that.data.jiaputotal[0].daixi=1
              }
              that.data.xiayidaixi=2
              that.setData({
               jiaputotal: that.data.jiaputotal,
               xiayidaixi:2
              })
              // console.log(that.data.jiaputotal)
               return
             }else{

              // that.data.listxuhao=1
              // that.setData({
              //  list:res.data, 
              //               })
              wx.showToast({
                title: "姓名重复，不支出模糊查询",
                icon:"none",
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
   xiyidaishuju:function(e){
     //调入下一代数据
     var that=this
     var bendaixi=that.data.xiayidaixi-1
     var jiaputotal=that.data.jiaputotal 
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"提示：",
      content:"请确认调用第"+that.data.xiayidaixi+"代数据吗？",
      confirmText:"确定",
      cancelText:"取消",
      success(res){
        if(res.confirm){
          // console.log(bendaixi,that.data.xiayidaixi)
            var qiandaishu=jiaputotal.length
             for (var i=0;i<qiandaishu;i++){
              if (jiaputotal[i].daixi==bendaixid){
                 if (jiaputotal[i]._id!=""){
                     for (var znl=0;znl<jiaputotal[i].zinv.length;znl++){

                       if (jiaputotal[i].zinv[znl].id=""){
                        var linshi={}
                         linshi.id=""
                         linshi.name= jiaputotal[i].zinv[znl].name+"*"
                          linshi.fuqin.name=jiaputotal[i].name
                          linshi.muqin=[]
                          linshi.peio=[]
                          linshi.zinv= []
                          linshi.xingbie="男",
                          linshi.chusheng=""
                          linshi.daixi=xiayidaixi

                       }else{


                       }

                      }
                   
                 }
              }

             }


        }else{
          return
        }

      }
    })
     //调入下一代数据 ok
   }
})