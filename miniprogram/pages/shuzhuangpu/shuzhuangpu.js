// pages/shuzhuangpu/shuzhuangpu.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dai:[1,2,3,4,5,6,7,8],
    dairen:[],
    list:[],
    jiaputotal:[],
    jiaputotalyuan:[],
    listxuhao:0,
    xiayidaixi:0,//tiaoshhou wei 0
    jiazumingcheng:"" ,
    jiazushenqingren:"",
    nvziburupu:true,
    chayuejiapu:false, // tiaoshihou wei false
    maxdaixi:0,//调试后改为0
    maxhang:0,//调试后改为0,
    zuoyizhi:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this
  that.setData({
    jiazushenqingren:app.globalData.jiazushenqingren,
    jiazumingcheng:app.globalData.jiazumingcheng
  })
   
   
   if (that.data.jiazumingcheng=="") {
    wx.redirectTo({
        url: '/pages/index/index',
    })
    // console.log('去首页')
  

    

    // wx.showToast({
    //   title: '家族名称：'+app.globalData.jiazumingcheng,
    // })
  }
  that.data.jiaputotalyuan= wx.getStorageSync('jiaputotal')
  if (that.data.jiaputotalyuan.length!=0) {
    
    that.setData({
      // chayuejiapu:true,
      jiaputotalyuan: that.data.jiaputotalyuan
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
    // 查询指定姓名字段,不是代码导入！！！！！！！！！！！
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
               that.setData({
               jiaputotal: that.data.jiaputotal,
                xiayidaixi:1
              })
               
               return
             }else{

              
              wx.showToast({
                title: "姓名重复，不支出模糊查询",
                icon:"none",
              })
                   
              }
                      
            }else{
             wx.showToast({
               title: "没有数据●●●！"+this.data.jiazumingcheng,
               icon:"none",
             })
            }
   
       }
     })
     // 查询指定姓名字段 OK
   
   },
   xiayidaishujuyanshi:function(){//尝试解决延时问题
    var that =this
       wx.showToast({
       title: '正在加载数据...',
       icon:"none",
       duration:1000
        })
        this.xiayidaishuju()
    
   

   },
   
   async xiayidaishuju(){
     //调入下一代数据，按编码导入
        
      wx.showLoading
     var that=this
     var jiaputotal=that.data.jiaputotal 
     var bendaixi=jiaputotal[jiaputotal.length-1].daixi
     var qiandaishu=jiaputotal.length
     var nvziburupu=that.data.nvziburupu
    
             for (var i=0;i<qiandaishu;i++){
              // async ()
             var xingbie=jiaputotal[i].xingbie
             var fuqin={"name":jiaputotal[i].name,"id":jiaputotal[i]._id}
              if (jiaputotal[i].daixi==bendaixi){//属于本代人员
                   //删除子女名单的女儿
                   if(nvziburupu==true){
                      for(var znl=0;znl<jiaputotal[i].zinv.length;znl++ ){
                        if(jiaputotal[i].zinv[znl].guanxi.indexOf('女')!=-1) {
                          jiaputotal[i].zinv.splice(znl,1)
                          znl=znl-1
                          }
                        }
                     }
                                 
                 if (jiaputotal[i]._id!=""){//上代有编码
                 
                     for (var znl=0;znl<jiaputotal[i].zinv.length;znl++){//遍历子女
        
                       if (jiaputotal[i].zinv[znl].id==""){//子女无编码
                      
                        var linshi={}
                         linshi._id=""
                        
                         linshi.name= jiaputotal[i].zinv[znl].name+"*"
                        
                         linshi.fuqin=fuqin //父名字或母亲名字均设置为父亲
                          

                           linshi.muqin={} //无关
                          linshi.peio=[] //无关
                          linshi.zinv= []
                          if(jiaputotal[i].zinv[znl].guanxi.indexOf('子')!=-1) {
                             linshi.xingbie="男"
                          }else{
                            linshi.xingbie="女"
                          }
                         
                          linshi.chusheng=""
                           linshi.daixi=bendaixi+1
                          
                          jiaputotal.push (linshi)
                          
                          that.setData({
                            jiaputotal: jiaputotal,
                            
                          })

                       }else {  //子女有编码 


                        
                        const testDB = wx.cloud.database({
                          env: 'liuxiaoyunyun-wsc3r'
                       })
                        const _ = testDB.command
                       const liu=await testDB.collection('jiazurenyuan').doc(jiaputotal[i].zinv[znl].id)
                        
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
                        .get()//get
                        .then (res => {
                          // console.log(res,liu) 
                            var linshi={}
                            linshi = res.data
                          
                            if (linshi.name!= "") {
                              linshi.daixi=bendaixi+1
                               
                                if (xingbie!="男"){
                                 linshi.fuqin=fuqin//将母亲名字替换到父亲位 
                                 
                                  }

                              jiaputotal.push(linshi)
                              // console.log(jiaputotal)
                              that.setData({
                                jiaputotal: jiaputotal,
                                
                              })
                              
                            } else { //0,>=2
                              
                              wx.showToast({  title: (res.data.length) + "条记录,编码重复", icon: "none",  })
                            }
                          
                          })
                       }//子女有编码 ok
                           
                      }//遍历子女 ok
                      
                      
                      
                 }//上代有编码 ok
              }//属于本代人员 OK

             }

     //调入下一代数据 ok
       
    
              that.setData({
                jiaputotal: jiaputotal,
                xiayidaixi:bendaixi+1
              })
       
             
              wx.hideLoading({
                success: (res) => {},
              }) 
        
   },
   chayuejiapu:function(e){
     //表格家谱,数据已生成，加工代码等
    
    var that =this
    var jiaputotal=that.data.jiaputotal
    var maxhang=jiaputotal.length
    var maxdaixi=jiaputotal[jiaputotal.length-1].daixi
    var dai=[]
    var dairen=[]
    for (var daii=1;daii<=maxdaixi;daii++){
    dai.push(daii )
    dairen.push(0)
    }
   
    that.setData({
      chayuejiapu:true,
      maxdaixi:maxdaixi,
      maxhang:maxhang,
      dai:dai,
     
     })
    
     if( jiaputotal.length==0){
      wx.showToast({
        title: "没有数据●●●！",
        icon:"none",
      })
      return
     }else{
     jiaputotal[0].beifenma="1"
     }
     dairen[0]=1 
 
      for (var i=1;i<jiaputotal.length;i++ ){
        
        dairen[jiaputotal[i].daixi-1]=dairen[jiaputotal[i].daixi-1]+1
                 for (var zhangi=i-1; zhangi>=0;zhangi=zhangi-1){
                 if (jiaputotal[zhangi]._id==jiaputotal[i].fuqin.id){ //muqin
                
                var znl=0
                 for (var znl=0;znl<jiaputotal[zhangi].zinv.length;znl++){
                 
                   if (jiaputotal[i]._id==jiaputotal[zhangi].zinv[znl].id ||jiaputotal[i].name==jiaputotal[zhangi].zinv[znl].name+"*"){
                   jiaputotal[i].beifenma=jiaputotal[zhangi].beifenma+(znl+1)
                    break;
                   }
                   
                 } 
                
              }

           }
                  
      }//生成完辈份代码

      //,以下代码为生成同代序号
      this.paixujiapu0()
      jiaputotal=this.data.jiaputotal
      var zhangdai=0
      var tongdaixu=1//为排序准备？
      var sehao=0//同一父亲下子女显示颜色
      var fuqinname=""//父亲名字+muqin
      var fuqinxu=0//父亲序号
      
      var  pingkuan=1000//屏幕宽度
      
      var zinvxu=0//同代同父序号，
      var sunyishu=0
      for (var i=0;i<jiaputotal.length;i++ ){
       
        wx.showToast({title:"正在调用数据请稍候...", icon: "none", duration:3000 })
       
        if(i==0){ //第一行
          jiaputotal[i].x=pingkuan// 祖先位置
          fuqinxu=0
           } else { //第2行到左后
                
        if (jiaputotal[i].daixi!=zhangdai){ //同代序号，并更换上代序号
        
           tongdaixu=1  
           jiaputotal[i].tongdaixu= tongdaixu
           zhangdai=jiaputotal[i].daixi
         }else{
           tongdaixu++  
           jiaputotal[i].tongdaixu= tongdaixu
        } //同代序号，并更换上代序号 OK
       
        if (jiaputotal[i].fuqin.name!=fuqinname){//判断父亲是否为同一人，并更换父亲名字
           fuqinname=jiaputotal[i].fuqin.name  

          for (var hs=i-1;hs>0 ;hs=hs-1){ //寻找父亲序号
            if (jiaputotal[i].fuqin.id==jiaputotal[hs]._id){
              fuqinxu=hs
              break
            }
         } //寻找父亲序号OK，
                    
        //  // 判断父亲是不是同一人即长子
           sehao=(sehao+1) % 3
            jiaputotal[i].sehao= sehao
              zinvxu=1 
              sunyishu=0
             
              jiaputotal[i].x=jiaputotal[fuqinxu].x
            
            
            
        }else{//判断父亲同一人的非长子
          zinvxu=zinvxu+1
          
          jiaputotal[i].sehao= sehao
          
          jiaputotal[i].x=jiaputotal[fuqinxu].x+20*(sunyishu+zinvxu-1)

             
        }//判断父亲同一人的非长子OK
        jiaputotal[i].fuqinxu=fuqinxu
        if (jiaputotal[i].zinv.length>=2){
          sunyishu=sunyishu+jiaputotal[i].zinv.length-1
        }

         if (jiaputotal[i].zinv.length>=2){//子女数量大于2，以前X均调整 原>=2
          var yiqianx=jiaputotal[i].x
          var zuoyizhi=20*(jiaputotal[i].zinv.length-1)//-0.001
             for (var hs=i;hs>=0;hs=hs-1){
                  if (jiaputotal[hs].x<= yiqianx  ){// 
                jiaputotal[hs].x= jiaputotal[hs].x-zuoyizhi//左移 子女数量-1*20，先长后自己
                
                  
                
                
                }
                
            }
           // 左移 子女数量-1*20，先长后自己

        }//父亲子女数量大于2，以前X均调整ok
        
     
      }
     
      // setTimeout(function () {
      //   //要延时执行的代码
      //   },500) 
    }
    
    // console.log(jiaputotal)
    var zuoyizhi=1000
    var maxxzhi=-1000
    for (var ii=0;ii<jiaputotal.length;ii++){
     zuoyizhi=Math.min(jiaputotal[ii].x,zuoyizhi)
     maxxzhi=Math.max(jiaputotal[ii].x,maxxzhi)
    }

    jiaputotal[0].x=(zuoyizhi+ maxxzhi)/2
    for (var ii=1;ii<jiaputotal.length-1;ii++){
      if (jiaputotal[ii].daixi==jiaputotal[ii+1].daixi &&  jiaputotal[ii].zinv.length>1 ){ // && jiaputotal[ii].fuqin.name== jiaputotal[ii+1].fuqin.name
        jiaputotal[ii].x=(jiaputotal[ii].x+jiaputotal[ii+1].x-20)/2
      }
      if (jiaputotal[ii].daixi!=jiaputotal[ii+1].daixi &&  jiaputotal[ii].zinv.length>=2 ){ // && jiaputotal[ii].fuqin.name== jiaputotal[ii+1].fuqin.name
         jiaputotal[ii].x=(jiaputotal[ii].x+ maxxzhi)/2
      }

    }


   
   
wx.showToast({  
       title: "生成家谱完成",
       icon:"none",
     })

    this.setData({
      dairen:dairen,
      jiaputotal:jiaputotal,
      zuoyizhi:zuoyizhi
    })

     
     wx.setStorage({
       key:"jiaputotal",
       data:jiaputotal 
     })

    //表格家谱  家谱 树    树    树ok
   },
   paixujiapu:function(e){  //建议删除
     //直系关系排序
     var that=this
     var jiaputotal=this.data.jiaputotal
    jiaputotal.sort(function(a, b) {
      var nameA = a.beifenma//.toUpperCase(); // ignore upper and lowercase
      var nameB = b.beifenma//.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
        // names must be equal
          return 0;
    });
    
     that.setData({
      jiaputotal:jiaputotal 
     })

   },
   paixujiapu0:function(e){
    //按同辈聚齐
    var that=this
    var jiaputotal=this.data.jiaputotal
   jiaputotal.sort(function(a, b) {
     var nameA = a.daixi+ a.beifenma//.toUpperCase(); // ignore upper and lowercase
     var nameB = b.daixi+ b.beifenma//.toUpperCase(); // ignore upper and lowercase
    //  console.log(nameA,nameB)
     if (nameA < nameB) {
       return -1;
     }
     if (nameA > nameB) {
       return 1;
     }
       // names must be equal
         return 0;
   });
   
    that.setData({
     jiaputotal:jiaputotal 
    })

  },
  tupujiediantap:function(e){
    // console.log(e,e.detail.x,e.detail.y)
    var xu=e.target.id
    var jiaputotal=this.data.jiaputotal

    var fuqinname=jiaputotal[xu].fuqin.name
    var fuqinid=jiaputotal[xu].fuqin.id
    var name=jiaputotal[xu].name
    var ziid=jiaputotal[xu]._id
//  console.log(ziid,"tu999")
    var x=jiaputotal[xu].x
    
    if (name.slice(name.length-1)=="*"){
     
     name=name.slice(0,name.length-1)
    }else{
     
    }

    
    wx.navigateTo({
      url: '/pages/databaseGuide/databaseGuide?id=' + ziid + "&name=" + name+ "&fuqinname=" + fuqinname+ "&fuqinid=" + fuqinid
     });
  },
  shiyongyuanpu:function(){
    this.setData({
     jiaputotal:this.data.jiaputotalyuan
  })
  },
  shengchengzhaopian:function(e){
    wx.navigateTo({
      url: '../shuzhuangputu/shuzhuangputu',
     // events: events,
      success: (result) => {},
      fail: (res) => {
        //  console.log(12)
        },
      complete: (res) => {},
    })
  },
  nvziburupu:function(e){
   //女儿不入谱
    this.setData({
       nvziburupu: !this.data.nvziburupu
    })
    
  }

})