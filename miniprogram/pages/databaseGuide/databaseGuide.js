// pages/databaseGuide/databaseGuide.js

// const { callFunction } = require("wx-server-sdk")

const app = getApp()

Page({

  data: {
    
    peiosl:1,
    zinvsl:1,
    // xianshibianma:true,
    fangfa:"chaxun",//chaxun,xiugai,zengjia
     openid: '',
     jiazumingcheng:"", 
     jiazushenqingren:"",
     jiazushenqingrenid:"",
     shenqingrendianhua:"",
    
    biaozhunku:[],
    
    listhang:{},
    listxuhao:0,
    // peiouku:{},
    // zinvku:{},
    //idsm 要求：配偶编码姓名必须连续且必须为2，子女编码关系姓名必须连续且只能为3，lei表示为一组数据，同类必须连续，数量为2个（子女为三个）。目前项目总数为19
     idsm:[
     {tb:false,lei:"",name:"_id",tishi:"系统编码",titils:"无需操作者写入",num:false,bianji:false},
     {tb:false,lei:"",name:"_openid",tishi:"操作者",titils:"无需操作者写入",num:false,bianji:false},
     {tb:false,lei:"",name:"mingcheng",tishi:"家族名称",titils:"无需操作者写入",num:false,bianji:false},
     {tb:true,lei:"",name:"name",tishi:"姓名",titils:"最少2个字",num:false,bianji:true},
     {tb:true,lei:"",name:"xingbie",tishi:"性别",titils:"男 或 女",num:false,bianji:true},
     {tb:true,lei:"",name:"chusheng",tishi:"出生日期",titils:"年月日（字符型YYYY MM DD）",num:true,bianji:true},
    
     {tb:true,lei:"",name:"dizhi",tishi:"居住市县",titils:"省、市、县(注意保护隐私）",num:false,bianji:true},
     {tb:true,lei:"",name:"yimin",tishi:"是否死亡",titils:"是 或不填",num:false,bianji:true},
     {tb:true,lei:"",name:"siwang",tishi:"死亡日期",titils:"年月日（字符型YYYY MM DD）健在者不要填写",num:true,bianji:true},
     {tb:true,lei:"",name:"dianhua",tishi:"电话",titils:"11位手机号，慎重填写，可以不填写",num:true,bianji:true},
     {tb:false,lei:"fuqin",name:"id",tishi:"父亲编码",titils:"编码可以在修改中加入，只有先输入姓名才可长按取码",num:false,bianji:true},
     {tb:true,lei:"fuqin",name:"name",tishi:"父亲姓名",titils:"最少两字，可以不填",num:false,bianji:true},
     {tb:false,lei:"muqin",name:"id",tishi:"母亲编码",titils:"编码可以在修改中加入，只有先输入姓名才可长按取码",num:false,bianji:true},
     {tb:true,lei:"muqin",name:"name",tishi:"母亲姓名",titils:"最少两字，可以不填",num:false,bianji:true},
     {tb:false,lei:"peio",name:"id",tishi:"配偶编码",titils:"可以不填，可以多个",num:false,bianji:true},
     {tb:true,lei:"peio",name:"name",tishi:"配偶姓名",titils:"可以不填，可以多个",num:false,bianji:true},
     {tb:false,lei:"zinv",name:"id",tishi:"子女编码",titils:"可以不填，可以多个",num:false,bianji:true},
     {tb:true,lei:"zinv",name:"name",tishi:"子女姓名",titils:"可以不填，可以多个",num:false,bianji:true},
     {tb:true,lei:"zinv",name:"guanxi",tishi:"子女关系",titils:"可以不填，可以多个",num:false,bianji:true},
     {tb:true,lei:"",name:"tbname",tishi:"备注",titils:"填报人或其他备注信息",num:false,bianji:true},
     {tb:true,lei:"",name:"tbtime",tishi:"时间及昵称",titils:"最早录入的时间+微信昵称",num:false,bianji:false},
     ],

     list:[ ],
      tujinbenyefangshi:"",
      tuziid:"",
      tuname:"",
      tufuqinid:"",
      tufuqinname:""

  },

  onLoad: function (options) {
    var that=this
    console.log(options,"20201213" ,options.name)
   if(options.name=="undefined"){
     //直接进入
   }else{
     //家谱图进入
     that.data.tujinbenyefangshi="tu"
     that.data.tuziid=options.id
     that.data.tuname=options.name
     that.data.tufuqinid=options.fuqinid
     that.data.tufuqinname=options.fuqinname
    //  console.log(that.data.tujinbenyefangshi,that.data.tuziid ,that.data.tuname,that.data.tufuqinid,that.data.tufuqinname,999)

     //家谱图进入OK
   }

    if (app.globalData.openid) {
      that.setData({
        openid: app.globalData.openid,
        jiazumingcheng:app.globalData.jiazumingcheng,
        jiazushenqingren:app.globalData.jiazushenqingren,
        shenqingrendianhua:app.globalData.shenqingrendianhua,
        jiazushenqingrenid:app.globalData.jiazushenqingrenid
      }) 
    }
    //联调前删除以下备注，禁止未获取身份或未指定家族进入
    if(that.data.openid.length==0 || that.data.jiazumingcheng.length==0) {
      wx.showModal({
        showCancel:false,
        title:"提示",
        content:"未获取身份或未指定家族",
        confirmtext:"返回",
        success(res){
          if(res.confirm){
            wx.redirectTo({
              url: "../index/index",
            })
          }
        }

      })
    }
//-----

    const testDB = wx.cloud.database({
      env: 'liuxiaoyunyun-wsc3r'
   })
   const _ = testDB.command
   console.log(that.data.tujinbenyefangshi,that.data.tuziid,10101)
   if ( that.data.tujinbenyefangshi=="tu" ){//家谱图进入
   
          testDB.collection('jiazurenyuan').where({
            mingcheng:that.data.jiazumingcheng,
            name:that.data.tuname
          })
          .get({
            success:res=> {
              that.setData({
                list:res.data 
                })
              //首次建立标准项目库
              that.biaozhunku()

              if(that.data.list.length>1){
                 that.chaxunshujudaoru(0) 
                } else if(that.data.list.length==1){
                   
                  that.chaxunshujudaoru(0) 
                  that.setData({ fangfa:"xiugai"})
                 that.fangfa("xiugai")
                 } else{
                  
                   that.setData({ fangfa:"zengjia"})
                 
                  that.fangfa("zengjia")
                  
                 }
            },
            fail:err=>{ }
          })
        }else{//直接进入
          testDB.collection('jiazurenyuan').where({
            mingcheng:that.data.jiazumingcheng
          })
          .get({
            success:res=> {
              that.setData({
                list:res.data 
                })
              //首次建立标准项目库
              that.biaozhunku()
              if(that.data.list.length>=1) { that.chaxunshujudaoru(0) }
            },
            fail:err=>{ }
          })

        }



//   //首次建立标准项目库
//  this.biaozhunku()
  
   
   
  },
  shurutishi:function(e){
 //点击左侧给出项目提示
 
  var  ids=e.target.id
  var ls=this.data.biaozhunku
 
for(var i=0;i<ls.length;i++){
 if(ls[i].name == ids){

   wx.showToast({
     title: ls[i].tishi+":"+ls[i].titils,
     icon:"none"
   })
  
   break
 }
}

},
fangfa:function(e ){
  // console.log("options=",options)
  // 增加 修改 查询之间切换
  var that=this
//  console.log(options,"222",mubiao,options.target.id)
//  console.log("di 2 ci daican zengjia")
  var mubiao=e.target.id
  var fangfa=that.data.fangfa 
  var mubiaotishi=""
  if (mubiao==""){     return}
  if(fangfa!=mubiao){
    
    if(mubiao=="zengjia"){mubiaotishi="增加" }
    if(mubiao=="xiugai"){mubiaotishi="修改" }
    if(mubiao=="chaxun"){
       mubiaotishi="查询" 
       that.data.listxuhao=that.data.listxuhao+1
       that.chaxunxuhao(e)}
            that.setData({
             fangfa:mubiao

            })
            if(mubiao=="zengjia"){
           
                              //一键清零自己填报
                              for (var i=0;i<that.data.biaozhunku.length;i++){
                                
                                that.data.biaozhunku[i].zhi="" 
                                // if (that.data.tujinbenyefangshi=="tu" && that.data.list.length==0){
                                //   console.log("zheli xinzeng")
                                //  if(that.data.biaozhunku[i].name=="name" && that.data.biaozhunku[i].lei==""){
                                //   that.data.biaozhunku[i].zhi=that.data.tuname
                                //  }
                                
                                //  if(that.data.biaozhunku[i].name=="id" && that.data.biaozhunku[i].lei=="fuqin"){
                                //   that.data.biaozhunku[i].zhi=that.data.tufuqinid
                                //   }
                                //  if(that.data.biaozhunku[i].name=="name" && that.data.biaozhunku[i].lei=="fuqin"){
                                //   that.data.biaozhunku[i].zhi=that.data.tufuqinname 
                                //   that.data.tujinbenyefangshi=""//第二次不能带参,且id在前
                                //  }

                                // }//因不能首次
                              }
                              that.data.biaozhunku[1].zhi=this.data.openid
                              
                              that.data.biaozhunku[2].zhi=this.data.jiazumingcheng
                              that.setData({
                                biaozhunku:that.data.biaozhunku
                              })
              
       

            }
             

           
    }
},



 biaozhunku:function(){
//建立标准库 


 var that=this
 var idsm=this.data.idsm
  var biaozhunku=[]
//  var list=this.data.list

for (var i=0;i<idsm.length;i++){
  
 var lsku={}
 if (! (idsm[i].name.slice(0,5)=="peio_"|| idsm[i].name.slice(0,5)=="zinv_") ){
   lsku={}
   lsku.tb=idsm[i].tb
  lsku.lei=idsm[i].lei
  lsku.name=idsm[i].name
  lsku.tishi=idsm[i].tishi
  lsku.titils=idsm[i].titils
  lsku.num=idsm[i].num
  lsku.bianji=idsm[i].bianji
  biaozhunku.push(lsku)

 }else if(idsm[i].name.slice(0,5)=="peio_"){
  // 处理配偶集合
 
  lsku={}
  lsku.tb=idsm[i].tb
  lsku.lei=idsm[i].lei
  //  console.log(i,bxu,"peio 1")
  lsku.name=idsm[i].name
  lsku.tishi=idsm[i].tishi
  lsku.titils=idsm[i].titils
  lsku.num=idsm[i].num
  lsku.bianji=idsm[i].bianji
  biaozhunku.push(lsku)
  
  
  lsku={}
   i++
  // console.log(i,bxu,"di2 至少一个姓名i=13")
  lsku.tb=idsm[i].tb
   lsku.lei=idsm[i].lei
   lsku.name=idsm[i].name
  lsku.tishi=idsm[i].tishi
  lsku.titils=idsm[i].titils
  lsku.num=idsm[i].num
  lsku.bianji=idsm[i].bianji
  biaozhunku.push(lsku)
  i=i-1
  // console.log(i,bxu,"di2 至少一个姓名i=12,wancheng shouci ")
   for ( var po=2;po<=this.data.peiosl;po++){
   
   
     lsku={}
     lsku.tb=idsm[i].tb
     lsku.lei=idsm[i].lei
     lsku.name=idsm[i].name
    lsku.tishi=idsm[i].tishi+"("+po+")"
    lsku.titils=idsm[i].titils
    lsku.num=idsm[i].num
    lsku.bianji=idsm[i].bianji
    biaozhunku.push(lsku)

    lsku={}
     i++
     lsku.tb=idsm[i].tb
    lsku.lei=idsm[i].lei
    lsku.name=idsm[i].name
    lsku.tishi=idsm[i].tishi+"("+po+")"
    lsku.titils=idsm[i].titils
    lsku.num=idsm[i].num
    lsku.bianji=idsm[i].bianji
    biaozhunku.push(lsku)
    i=i-1
    // console.log(i,"wan cheng diyige xuanhuan  i=12, ")
       }
       i=i+2
      //  console.log(i,"wan cheng xuanhuan  i=14, ")
   //peiou wancheng
 }  if(idsm[i].name.slice(0,5)=="zinv_"){
  //  处理子女集合（在姓名、编码、关系后加编号）
 
  lsku={}
  lsku.tb=idsm[i].tb
  lsku.lei=idsm[i].lei
  //  console.log(i,"zinv 编码 1")
  lsku.name=idsm[i].name
  lsku.tishi=idsm[i].tishi
  lsku.titils=idsm[i].titils
  lsku.num=idsm[i].num
  lsku.bianji=idsm[i].bianji
  biaozhunku.push(lsku)
  
  
  lsku={}
   i++
  // console.log(i,bxu,"di2 至少一个关系 i=13")
  lsku.tb=idsm[i].tb
   lsku.lei=idsm[i].lei
   lsku.name=idsm[i].name
  lsku.tishi=idsm[i].tishi
  lsku.titils=idsm[i].titils
  lsku.num=idsm[i].num
  lsku.bianji=idsm[i].bianji
  biaozhunku.push(lsku)
  lsku={}
   i++
  // console.log(i,bxu,"di2 至少一个姓名i=13")
  lsku.tb=idsm[i].tb
   lsku.lei=idsm[i].lei
   lsku.name=idsm[i].name
  lsku.tishi=idsm[i].tishi
  lsku.titils=idsm[i].titils
  lsku.num=idsm[i].num
  lsku.bianji=idsm[i].bianji
  biaozhunku.push(lsku)
  
  i=i-2
  // console.log(i,"di2 至少一个姓名i=12,wancheng shouci ")
   for ( var po=2;po<=this.data.zinvsl;po++){
   //第二个及以后子女
   
     lsku={}
     lsku.tb=idsm[i].tb
     lsku.lei=idsm[i].lei
     lsku.name=idsm[i].name
    lsku.tishi=idsm[i].tishi+"("+po+")"
    lsku.titils=idsm[i].titils
    lsku.num=idsm[i].num
    lsku.bianji=idsm[i].bianji
    biaozhunku.push(lsku)

    lsku={}
     i++
     lsku.tb=idsm[i].tb
    lsku.lei=idsm[i].lei
    lsku.name=idsm[i].name
    lsku.tishi=idsm[i].tishi+"("+po+")"
    lsku.titils=idsm[i].titils
    lsku.num=idsm[i].num
    lsku.bianji=idsm[i].bianji
    biaozhunku.push(lsku)
    lsku={}
     i++
     lsku.tb=idsm[i].tb
    lsku.lei=idsm[i].lei
    lsku.name=idsm[i].name
    lsku.tishi=idsm[i].tishi+"("+po+")"
    lsku.titils=idsm[i].titils
    lsku.num=idsm[i].num
    lsku.bianji=idsm[i].bianji
    biaozhunku.push(lsku)

    i=i-2
    // console.log(i,bxu,"wan cheng diyige xuanhuan  i=12, ")
       }
       i=i+2
        // console.log(i,"wan cheng xuanhuan  i=14, ")
   //peiou wancheng
 }
}
// console.log(biaozhunku,"biaozhunkuwancheng",biaozhunku.length)
biaozhunku[1].zhi=this.data.openid
biaozhunku[2].zhi=this.data.jiazumingcheng
that.setData({
  biaozhunku:biaozhunku
})
  
//根据配偶数量 子女数量和单一项目组成新河标准库完成
// console.log(22324)

 },

 chaxunshujudaoru:function(xu){
    
   var that=this
//导入数据到标准库中

var list =that.data.list
var listhang={}
if (list.length!=0) { 
   listhang=list[xu] 
    }
var biaozhunku=that.data.biaozhunku

  var listhangyuansu=0
   Object.keys(listhang).forEach(function(key){
    listhangyuansu++
    })//统计数据ziduan数量

  if(listhangyuansu==0) {
   wx.showToast({
     title: '无数据不必导入',
     icon:"none",
   })
  } else{ // 有数据可以导入 }
  for(var i=0;i<biaozhunku.length;i++){
      // console.log("daoru shuju le ",i,biaozhunku[i].tishi)
    var lei=biaozhunku[i].lei
     switch(lei){
     case "" ://无类单项数据
     
      biaozhunku[i].zhi=listhang[biaozhunku[i].name]
      // console.log(biaozhunku[i])
      break;
      case "fuqin" ://有类2值型数据 父亲
      biaozhunku[i].zhi=listhang[lei].id
      biaozhunku[i+1].zhi=listhang[lei].name
      i++
      break;
      case "muqin" ://有类2值型数据 母亲
      biaozhunku[i].zhi=listhang[lei].id
      biaozhunku[i+1].zhi=listhang[lei].name
      i++
      break;
      case "peio" ://有类集合型数据 配偶
      var peiosl=this.data.peiosl 
      var povalue=listhang.peio
      if (typeof  povalue!="undefined" ){//有数据
        var listhangpeiosl=0
        var zl=0
        var biaopeiosl=0
        Object.keys(povalue).forEach(function(key){
          listhangpeiosl++
          })//统计数据ziduan数量
          // console.log("zhe1")
          if (peiosl>listhangpeiosl) {
             biaopeiosl=listhangpeiosl
            } else{
             biaopeiosl= peiosl
            }
            // console.log("取最少的数据",biaopeiosl)
            if (biaopeiosl<1)
            { biaopeiosl=1}
            if ( biaopeiosl<listhangpeiosl){ biaopeiosl=listhangpeiosl  }
            // console.log("zhe2")
            var peioku=biaozhunku.splice(i,peiosl*2)

            if (peioku.length>biaopeiosl*2){//删除多余配偶
             peioku.splice(peioku.length-biaopeiosl*2,peioku.length-biaopeiosl*2)
            //  console.log(this.data.listxuhao,peioku.length,biaopeiosl*2,peioku.length-biaopeiosl*2-1,peioku.length-biaopeiosl*2)
            
            }
            // console.log("zhe3",peiosl,biaopeiosl)
            if (peioku.length<biaopeiosl*2){//增加配偶
              for (var j=peiosl;j<biaopeiosl;j++){
                peioku.push(JSON.parse(JSON.stringify(peioku[0])))
                peioku.push(JSON.parse(JSON.stringify(peioku[1])))
                // console.log("zhe3.5",peiosl,biaopeiosl,peioku.length)
                                                 }
              //  console.log("zhe3.6",peiosl,biaopeiosl,peioku.length,peioku)
                                                           
            }

            // console.log("zhe4")
             peioku[0].zhi=""
             peioku[1].zhi=""
             peioku[0].tishi="配偶编码"
             peioku[1].tishi="配偶姓名"
            for (var j=2;j<=biaopeiosl;j++){//加注序号
             peioku[j*2-2].tishi="配偶编码_"+j
             peioku[j*2+1-2].tishi="配偶姓名_"+j
             peioku[j*2-2].zhi=""
             peioku[j*2+1-2].zhi=""
            }
            // console.log("zhe5")
            for(var j=1;j<=listhangpeiosl;j++){//导入查询的值
             peioku[(j-1)*2].zhi =povalue[j-1].id
             peioku[(j-1)*2+1].zhi =povalue[j-1].name

            }
            for (var j=peioku.length-1; j>=0;j=j-1 ){
               biaozhunku.splice(i,0,JSON.parse(JSON.stringify(peioku[j])))
            }
            // console.log("zhe6",biaozhunku)
            peiosl=biaopeiosl
            // console.log("新值",peiosl,"原配偶数量",this.data.peiosl)
            this.setData({
              peiosl:peiosl
            })
            i=i+peiosl*2-1
      }
      
      break;

     
      case "zinv" ://有类集合型数据 子女
      // console.log(i,biaozhunku[i].tishi,biaozhunku )
      var zinvsl=this.data.zinvsl
      var zinvvalue=listhang.zinv
      if (typeof  zinvvalue!="undefined" ){//有数据
        var listhangzinvsl=0
        var zl=0
        var biaozinvsl=0
        Object.keys(zinvvalue).forEach(function(key){
          listhangzinvsl++
          })//统计数据ziduan数量
          if (zinvsl>listhangzinvsl) {
             biaozinvsl=listhangzinvsl
            } else{
             biaozinvsl= zinvsl
            }
            // console.log("取最少的数据",biaozinvsl)
            if (biaozinvsl<2)
            { biaozinvsl=2}
            if ( biaozinvsl<listhangzinvsl){ biaozinvsl=listhangzinvsl  }
            // console.log("取最少的数据>=1",biaozinvsl)
            var zinvku=biaozhunku.splice(i,zinvsl*3)
            if (zinvku.length>biaozinvsl*3){//删除多余zinv
              zinvku.splice(zinvku.length-biaozinvsl*3,zinvku.length-biaozinvsl*3)
            }
            if (zinvku.length<biaozinvsl*3){//增加zinv
              for (var j=zinvsl;j<biaozinvsl;j++){
                zinvku.push(JSON.parse(JSON.stringify(zinvku[0])))
                zinvku.push(JSON.parse(JSON.stringify(zinvku[1])))
                zinvku.push(JSON.parse(JSON.stringify(zinvku[2])))
                                                 }
            }
            // console.log(zinvku)
            zinvku[0].zhi=""
            zinvku[1].zhi=""
            zinvku[2].zhi=""
            for (var j=2;j<=biaozinvsl;j++){//加注序号
              zinvku[j*3-3].tishi="子女编码_"+j
              zinvku[j*3+1-3].tishi="子女姓名_"+j
              zinvku[j*3+2-3].tishi="子女关系_"+j
              zinvku[j*3-3].zhi=""
              zinvku[j*3+1-3].zhi=""
              zinvku[j*3+2-3].zhi=""
            }
            for(var j=1;j<=listhangzinvsl;j++){//导入查询的值
              zinvku[(j-1)*3].zhi =zinvvalue[j-1].id
              zinvku[(j-1)*3+1].zhi =zinvvalue[j-1].name
              zinvku[(j-1)*3+2].zhi =zinvvalue[j-1].guanxi

            }
            for (var j=zinvku.length-1; j>=0;j=j-1 ){//将整理的数据加入标准库
               biaozhunku.splice(i,0,JSON.parse(JSON.stringify(zinvku[j])))
            }
           
            zinvsl=biaozinvsl
            this.setData({
              zinvsl:zinvsl
            })
            i=i+zinvsl*3-1
            
      }// 单项、父、母、配偶 、子女的分类 OK
      
      break;

       //子女数据 OK
     } // 单项、父、母、配偶 、子女的分类 OK  SWITCH

  } //逐个导入数据 ok
}// listhang 有数据可以导入  ok

  this.setData({
    biaozhunku:biaozhunku
  })
//导入数据到标准库中 OK
 },
 shurushuju:function(e){
 //数据输入

 var id=e.target.id
 this.data.biaozhunku[id].zhi=e.detail.value
 this.setData({
   biaozhunku:this.data.biaozhunku
 })
 //数据输入完成
},
chaxunxuhao:function(e){
  // console.log(e.target.id,"fa:")
  // console.log(e)
  //查询数据切换
//  console.log(e)
//  var zhi=parseInt( e.detail.value)-1
var zhi=this.data.listxuhao
if (e.target.id=="+") {
  zhi=zhi+1
}else{
  zhi=zhi-1
}
if(zhi<0) {zhi=0 }
if(zhi>=this.data.list.length ) {zhi=this.data.list.length-1}
this.setData({
  listxuhao:zhi
}) 

if (this.data.list.length<=0) {
  wx.showToast({
    title: '没有数据呢',
    icon:"nono",
  })
} else{ 
//  if (zhi<0 ){zhi=0}
//  if(zhi>this.data.list.length-1){
//    zhi=this.data.list.length-1
   
// }
//  this.data.listhang=this.data.list[zhi]
// return e.detail.value=zhi
 //切换成功后导入数据
//  console.log(zhi,"kai shi daoru shuju ")
 this.chaxunshujudaoru(zhi)
}
  //查询数据切换完成
},
baocunshuju:function(e){ 
//保存数据
var biaozhunku=this.data.biaozhunku

 for (var i=0;i<biaozhunku.length;i++){
  //  console.log(i,biaozhunku[i].tishi,biaozhunku[i].zhi)
    var cuowutishi="" 
    var lei=biaozhunku[i].lei
    switch(lei){//检测数据的规范性
     case "": //'单一项目'
     
       var xiang=biaozhunku[i].name
       if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
       var zhi=biaozhunku[i].zhi
       
       var fangfa=this.data.fangfa
      // console.log(typeof zhi)
       switch (xiang){
        case "_id":
          if (fangfa=="xiugai" &&  zhi.length!=32){
          cuowutishi=i+"：修改数据不能修改编号"
          }
        break; 
        case "_openid":
          if (fangfa=="xiugai" &&  !(zhi==this.data.openid || this.data.openid==this.data.jiazushenqingrenid)){
          cuowutishi=i+"：不是本人创建的数据不能修改"//允许管理员修改数据
          }
          if (fangfa=="zengjia" ){
            biaozhunku[i].zhi=this.data.openid
          }
        break; 

        case "mingcheng":
          if (fangfa=="xiugai" &&  zhi!=this.data.jiazumingcheng){
          cuowutishi=i+"：非本家族数据不能修改"
          }
          if (fangfa=="zengjia" && zhi=="" ){
            biaozhunku[i].zhi=this.data.jiazumingcheng
          }else if (fangfa=="zengjia" && zhi!=this.data.jiazumingcheng ){
            wx.showToast({
              title: biaozhunku[i].zhi +"改为本家族，请谨慎！" ,
              icon:"none",
              duration:5000,
            })
            biaozhunku[i].zhi=this.data.jiazumingcheng
             }
        break; 

        case "name":
          if (!(zhi.length>=1   && zhi.length<=8)){
          cuowutishi=i+"：姓名长度1-8位"
          }
        break; 
        case "xingbie":
          if (!(zhi=="男"   || zhi=="女")){
          cuowutishi=i+"：性别：应为 男 或 女"
          }
        break; 
        case "chusheng":
          if ( zhi.length>8){
          cuowutishi=i+"：出生日期应少于8位"
          }
          break; 
          case "yimin":
            if (!( zhi=="是"|| zhi== "")){
            cuowutishi=i+"：是否死亡：是 或不填"
            }
            break;
            case "dizhi":
              if ( zhi.length>8){
              cuowutishi=i+"：字数限制9个"
              }
              break;
              case "siwang":
                if ( zhi.length>8){
                cuowutishi=i+"：字数限制8个"
                }
                break;
                case "dianhua":
                if ( !(zhi.length==0 || zhi.length==11)){
                cuowutishi=i+"：字数限制11个,可以不填"
                }
                break;
                case "tbname":
                  if ( zhi.length>50){
                  cuowutishi=i+"：字数限制50个,可以不填"
                  }
                  break;
                  case "tbtime":
                    var t = new Date()
                    var time=t. getFullYear() 
                    var ls=("00"+ (t.getMonth()+1))
                    time=time+ls.slice(ls.length-2) 
                    ls="00"+t.getDate() 
                    time=time+ls.slice(ls.length-2) 
                    time=time+" "+t.getHours() +":"+t.getMinutes()
                  biaozhunku[i].zhi=time +app.globalData.userInfo.nickName
                  // console.log(
                  // this.Data.userInfo.nickName
                  // console.log(app.globalData.userInfo,app.globalData.userInfo.nickName)
                  break; 

          

       }//'单一项目' ok

    //_id,_openid,mingcheng,name,xingbie,chusheng,yimin,dizhi,siwang,dianhua,tbname,tbtime
     break;  
     case "fuqin": //父亲，一个项目两值
     if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
        if (!(biaozhunku[i].zhi.length==0 ||  biaozhunku[i].zhi.length==32)){
          cuowutishi=i+"父亲编码不足32位"
        }
         i++
         if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
         if(biaozhunku[i].zhi.length>8){
          cuowutishi=i+"父亲姓名超长"
          }

     break; 
     case "muqin": //母亲，一个项目两值
     if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
      if (!(biaozhunku[i].zhi.length==0 ||  biaozhunku[i].zhi.length==32)){
        cuowutishi=i+"母亲编码不足32位"
      }
      i++
      if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
      if(biaozhunku[i].zhi.length>8){
        cuowutishi=i+"母亲姓名超长"
        }
     break;
     case "peio": //配偶一个项目，值为集合

      for (var hs=1 ;hs<=this.data.peiosl ;hs++){
        if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
              if (!(biaozhunku[i].zhi.length==0 ||  biaozhunku[i].zhi.length==32)){
                cuowutishi=i+"配偶编码不足32位"
              }
              i++
              if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
              if(biaozhunku[i].zhi.length>8){
                cuowutishi=i+"配偶姓名超长"
                }
               i++
      }
      i=i-1
     break;
     case "zinv": //子女一个项目，值为集合
    //  console.log(this.data.zinvsl,i,biaozhunku[i].tishi,biaozhunku)
     for (var hs=1 ;hs<=this.data.zinvsl ;hs++){
      if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
      if (!(biaozhunku[i].zhi.length==0 ||  biaozhunku[i].zhi.length==32)){
        cuowutishi=i+"子女编码不足32位"
      }
      i++
      if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
      if(biaozhunku[i].zhi.length>8){
        cuowutishi=i+"子女姓名超长"
        }
       i++
       if (typeof biaozhunku[i].zhi=="undefined"){ biaozhunku[i].zhi=""}
       if(biaozhunku[i].zhi.length>4){
        cuowutishi=i+"子女关系超长"
        }
       i++
     }
     i=i-1
     break;

    } //每个检测数据的规范性 OK
    if (cuowutishi!="" ){
      wx.showToast({
        title:biaozhunku[i].tishi+"："+ cuowutishi,
        icon:"none",
        duration:2000
      })
      break
    }
//  console.log(cuowutishi,"cuowu：")
 }//全部 检测数据的规范性 OK


this.setData({
  biaozhunku:biaozhunku
})
//已经效验完数据的完整性，准备保存数据 

if (cuowutishi==""){
 if (this.data.fangfa=="zengjia"){//增加数据
 this.baocunshujuzengjia()
 }
 if (this.data.fangfa=="xiugai"){//修改数据保存
 this .baocunshujuxiugai(e)
 }


}

//保存数据 OK
},
baocunshujuzengjia:function(){
  var that=this
//保存增加数据
      var biaozhunku=that.data.biaozhunku
      var name=that.chaxunziduanzhi("","name" )
      // console.log(name,"1111")

      const testDB = wx.cloud.database({
        env: 'liuxiaoyunyun-wsc3r'
      })
      const _ = testDB.command
      testDB.collection('jiazurenyuan').where({
       mingcheng:that.data.jiazumingcheng,
       name:name 
      })
            .get({
            success:res=>{
            // console.log(res)
            if (res.data.length>=1 ) {
             wx.showToast({
               title: '家族内 重名或已经存在',
               icon:"none",
               duration:3000
             })
            }else{//可以存储数据了
              
              testDB.collection('jiazurenyuan').add({
                data:{
                // _id:
                // _openid:
                mingcheng:that.chaxunziduanzhi("","mingcheng"),
                name:that.chaxunziduanzhi("","name"),
                xingbie:that.chaxunziduanzhi("","xingbie"),
                chusheng:that.chaxunziduanzhi("","chusheng"),
                yimin:that.chaxunziduanzhi("","yimin"),
                dizhi:that.chaxunziduanzhi("","dizhi"),
                siwang:that.chaxunziduanzhi("","siwang"),
                dianhua:that.chaxunziduanzhi("","dianhua"),
                fuqin:that.chaxunziduanzhi("fuqin",""),
                muqin:that.chaxunziduanzhi("muqin",""),
                peio:that.chaxunziduanzhi("peio",""),
                zinv:that.chaxunziduanzhi("zinv",""),
                tbname:that.chaxunziduanzhi("","tbname"),
                tbtime:that.chaxunziduanzhi("","tbtime"),
              },
              
              success:res=>{
              // 加入临时数据中不来，可用上边数据  //正式存盘
                console.log("增加临时数据有问题",res)
                
              
              
                      wx.showToast({
                        title: '增加数据成功',
                        duration:5000
                      })

              },
              fail:err=>{//正式存盘失败
                      wx.showToast({
                        icon:"none",
                        title: '存盘失败了'+err,
                        duration:5000
                      })
                 console.log("存盘失败了",err)
              }  
            })
            }//可以存储数据了 OK
            },
            fail: err => { //未能取得数据,
                wx.showToast({
                icon:"none",
                title: '未能联通服务器失败了'+err,
                duration:5000
              })
               
            }
            })
      //保存增加数据 OK
},
baocunshujuxiugai:function(e){
 //保存修改数据 
 var that=this
 var biaozhunku=that.data.biaozhunku
 var listxuhao=that.data.listxuhao
 var listhang=that.data.list[listxuhao]
 var xiugai=[]
 console.log(e,that.data.openid,that.data.jiazushenqingrenid)
    if(!(biaozhunku[1].zhi==that.data.openid || that.data.openid==that.data.jiazushenqingrenid ) ){//允许管理员修改数据
      wx.showToast({
        icon:"none",
        title: '无权修改他人录入的数据',
         })
         return
    }
    if(biaozhunku[2].zhi!=that.data.jiazumingcheng){//多余
      wx.showToast({
        icon:"none",
        title: '无权修改其他家族的数据，家族名称变了',
         })
         return
    }
    if(biaozhunku[0].zhi!=that.data.list[listxuhao]._id){
      wx.showToast({
        icon:"none",
        title: '修改数据不能修改编码',
         })
         return
    }

var bi=0
var li=0

 for (bi=0;bi<biaozhunku.length;bi++){ 

  switch (biaozhunku[bi].lei){
    case "" ://单值
   
   if ( biaozhunku[bi].name!="tbtime"){
    if(biaozhunku[bi].zhi!=listhang[biaozhunku[bi].name]){
      xiugai.push({'tishi': biaozhunku[bi].tishi,'name':biaozhunku[bi].name,'zhi':biaozhunku[bi].zhi} )
    }
  }
      break;
    case "fuqin":
     
      if(biaozhunku[bi].zhi!=listhang.fuqin.id|| biaozhunku[bi+1].zhi!=listhang.fuqin.name )
      {
        xiugai.push({"tishi":"父亲编码及姓名","name":"fuqin","zhi":that.chaxunziduanzhi("fuqin","")} )
      }
      bi++
      break;
      case "muqin":
       
        if(biaozhunku[bi].zhi!=listhang.muqin.id|| biaozhunku[bi+1].zhi!=listhang.muqin.name )
        {
          xiugai.push({"tishi":"母亲编码及姓名","name":"muqin","zhi":that.chaxunziduanzhi("muqin","")} )
        }
        bi++
        break;
        case "peio":
          var bposl=0
          for (var hs=0;hs<this.data.peiosl;hs++){
            if(biaozhunku[bi+hs*2+1].zhi.length>=1){
              bposl++ 
            }
            }
            var gai=false
            
          if (bposl==listhang.peio.length){
            for (var hs=0;hs<bposl;hs++){
            

              if (biaozhunku[bi+hs*2].zhi!=listhang.peio[hs].id||biaozhunku[bi+hs*2+1].zhi!=listhang.peio[hs].name ){
               
                gai=true
                break;
              }
            }
          }else{
            console.log(3)
            gai=true
          }
          if (gai==true){
            xiugai.push({"tishi":"配偶编码及姓名","name":"peio","zhi":that.chaxunziduanzhi("peio","")} )
          }
           bi=bi+that.data.peiosl*2-1
          break;  
          case "zinv":
           
            var bzinvsl=0
            for (var hs=0;hs<that.data.zinvsl;hs++){
              if(biaozhunku[bi+hs*3+1].zhi.length>=1){
                 bzinvsl= bzinvsl+1 
              }
              }
            
              var gai=false
            if (bzinvsl==listhang.zinv.length){
              for (var hs=0;hs<bzinvsl;hs++){
                if (biaozhunku[bi+hs*3].zhi!=listhang.zinv[hs].id||biaozhunku[bi+hs*3+1].zhi!=listhang.zinv[hs].name ||biaozhunku[bi+hs*3+2].zhi!=listhang.zinv[hs].guanxi){
                  gai=true
                 
                  break;
                }
              }
            }else{
             
              gai=true
            }
            if (gai==true){
              xiugai.push({"tishi":"子女编码、姓名、关系","name":"zinv","zhi":that.chaxunziduanzhi("zinv","")} )
            }
            bi=bi+that.data.zinvsl*3-1
            break;  
  }
  
 }
          if (xiugai.length==0){
          wx.showToast({
                icon:"none",
                title: '没有更改项目',
          })
          return
        }
   for (var hs=0;hs<xiugai.length;hs++){
        wx.showToast({
          icon:"none",
          title:( hs+1)+'：'+xiugai[hs].tishi+"__欲更改",
          })
     }

   
// 管理员修改的数据不能真正修改，请使用云函数
    var id=biaozhunku[0].zhi 
    const db=wx.cloud.database({
      env: 'liuxiaoyunyun-wsc3r'
   })
console.log(12345)
   wx.cloud. callFunction ({
     name:"baocunxiugai001",
     data:{
      id:id,
      name:that.chaxunziduanzhi("","name"),
      xingbie:that.chaxunziduanzhi("","xingbie"),
      chusheng:that.chaxunziduanzhi("","chusheng"),
      yimin:that.chaxunziduanzhi("","yimin"), 
      dizhi:that.chaxunziduanzhi("","dizhi"),
      siwang:that.chaxunziduanzhi("","siwang"),
      dianhua:that.chaxunziduanzhi("","dianhua"),
      fuqin:that.chaxunziduanzhi("fuqin",""),
      muqin:that.chaxunziduanzhi("muqin",""),
      peio:that.chaxunziduanzhi("peio",""),
      zinv:that.chaxunziduanzhi("zinv",""),
      tbname:that.chaxunziduanzhi("","tbname"),
      // tbtime:that.chaxunziduanzhi("","tbtime"),不能修改时间和昵称
     }
   })
         wx.showToast({
          icon:"none",
           title: '保存成功',
     })
  //  console.log(123456)
  //  .then(res=>{  
    
  //      console.log(1,res,"保存成功！") 
      
      
  //  })
  //  .catch(err=>{
  //   // console.log(e,app.globalData.jiazumingcheng,2)
  //   //   console.error
  //  })
    // db.collection('jiazurenyuan').doc(id).update({
    //   data:{
    //          // mingcheng:that.chaxunziduanzhi("","mingcheng"),
    //             name:that.chaxunziduanzhi("","name"),
    //             xingbie:that.chaxunziduanzhi("","xingbie"),
    //             chusheng:that.chaxunziduanzhi("","chusheng"),
    //             yimin:that.chaxunziduanzhi("","yimin"),
    //             dizhi:that.chaxunziduanzhi("","dizhi"),
    //             siwang:that.chaxunziduanzhi("","siwang"),
    //             dianhua:that.chaxunziduanzhi("","dianhua"),
    //             fuqin:that.chaxunziduanzhi("fuqin",""),
    //             muqin:that.chaxunziduanzhi("muqin",""),
    //             peio:that.chaxunziduanzhi("peio",""),
    //             zinv:that.chaxunziduanzhi("zinv",""),
    //             tbname:that.chaxunziduanzhi("","tbname"),
    //             tbtime:that.chaxunziduanzhi("","tbtime"),
    //   },
    //   success: res=> {
    //     wx.showToast({
    //       icon:"none",
    //       title: '保存成功',
    // })
    //   },
    //   fail:err=>{
    //     wx.showToast({
    //       icon:"none",
    //       title: '错误信息:'+err,
    // })
    //     //  console.log(err,2)
        
        
    //   }
    // })
    
    //晕函数保存替代部分 OK
 
   




//保存修改数据 OK 
},
chaxunziduanzhi:function(lei,ziduan){
  var biaozhunku =this.data.biaozhunku 
  
for(var i=0;i<biaozhunku.length;i++){//遍历字段
    if (biaozhunku[i].lei=="" && biaozhunku[i].name==ziduan ){//单值字段
        
      return biaozhunku[i].zhi
    }//单一字段 OK
    if (biaozhunku[i].lei=="fuqin" && lei=="fuqin") {//双值字段
         
      return JSON.parse( JSON.stringify({"id":biaozhunku[i].zhi,"name":biaozhunku[i+1].zhi}))
    }
    if ( biaozhunku[i].lei=="muqin"  && lei=="muqin"){//双值字段
      
      return  JSON.parse( JSON.stringify({"id":biaozhunku[i].zhi,"name":biaozhunku[i+1].zhi}))
    }
   
   
    if (biaozhunku[i].lei=="peio" && lei=="peio" ){//集合类字段
     
       var peiozhi=[]
       for (var hs=0;hs<this.data.peiosl;hs++){
          if (biaozhunku[i+1].zhi!=""){
            peiozhi.push({"id":biaozhunku[i].zhi,"name":biaozhunku[i+1].zhi } )
          }
          i=i+2 

          
       }
       
      return JSON.parse( JSON.stringify( peiozhi))
    }//集合类字段ok
    if (biaozhunku[i].lei=="zinv" && lei=="zinv" ){//集合类字段
      var zinvzhi=[]
      for (var hs=0;hs<this.data.zinvsl;hs++){
         if (biaozhunku[i+1].zhi !=""){
           zinvzhi.push({"id":biaozhunku[i].zhi,"name":biaozhunku[i+1].zhi,"guanxi":biaozhunku[i+2].zhi } )
         }
         i=i+3 
      }
     
     return  JSON.parse(JSON.stringify( zinvzhi))
   }//集合类字段ok
}//遍历字段
//取标准库中字段的值
},
shanshuju:function(e){
  var that=this
  var biaozhunku=this.data.biaozhunku
  // var id=biaozhunku[0].zhi
  //删除自己创建的数据
  wx.cloud.callFunction({ 
  name:"shanchurenyuan001", 
  data:{
   _id:biaozhunku[0].zhi
  }
  }) .then(res=>{
    //  console.log( typeof res,res)
    if(res.result.stats.removed!=0){
     wx.showToast({
       title: '删除数据成功', 
       icon:"none"
     }) 
     that.data.list.splice(that.data.listxuhao,1)
     that.setData({
       list:that.data.list,
       listxuhao:that.data.listxuhao
     })
     this.chaxunshujudaoru( this.data.listxuhao)
    }
  })
  
  
  //删除自己创建的数据OK
},
peiozinvzeng:function(e){
  var that=this
  var id=e.target.id

//指定增加配偶数量 子女数量
switch (id ){
  case "peio+" :// 配偶 数量+1
      var peiosl=that.data.peiosl 
      var biaozhunku=that.data.biaozhunku
      var i=0
            if(peiosl>=5) { wx.showToast({
              title: '配偶数量大于5了，系统不支持',
              icon:"none"
            })
            return
            }
      for ( i=0;i<biaozhunku.length;i++){
        if (biaozhunku[i].lei=="peio")
        { break }  
          }

        
       
        var peioku=[]
        //biaozhunku.slice(i,i+2)
       
        peioku.push(JSON.parse(JSON.stringify(biaozhunku[i])))
        peioku.push(JSON.parse(JSON.stringify(biaozhunku[i+1])))
        
  
         peioku[0].zhi=""
         peioku[1].zhi=""
         peioku[0].tishi="配偶编码_"+(peiosl+1)
         peioku[1].tishi="配偶姓名_"+(peiosl+1)
       
           biaozhunku.splice(i+peiosl*2,0,JSON.parse(JSON.stringify(peioku[0])),JSON.parse(JSON.stringify(peioku[1])))
        
        that.setData({
          peiosl:peiosl+1,
          biaozhunku:biaozhunku
        })
     
  break;

 
  case "zinv+" :// 子女数量+1
      var zinvsl=that.data.zinvsl 
      var biaozhunku=that.data.biaozhunku
      var i=0
          if(zinvsl>=9) { wx.showToast({
            title: '子女数量大于9了，系统不支持',
            icon:"none"
          })
          return
          }
      for ( i=0;i<biaozhunku.length;i++){
        if (biaozhunku[i].lei=="zinv")
        { break }  
          }
    
       
        var zinvku=[]//biaozhunku.slice(i,i+3)
                zinvku.push(JSON.parse(JSON.stringify(biaozhunku[i])))
                zinvku.push(JSON.parse(JSON.stringify(biaozhunku[i+1])))
                zinvku.push(JSON.parse(JSON.stringify(biaozhunku[i+2])))

       
        zinvku[0].zhi=""
        zinvku[1].zhi=""
        zinvku[2].zhi=""
        zinvku[0].tishi="子女编码_"+(zinvsl+1)
        zinvku[1].tishi="子女姓名_"+(zinvsl+1)
        zinvku[2].tishi="子女关系_"+(zinvsl+1)
       
           biaozhunku.splice(i+zinvsl*3,0,JSON.parse(JSON.stringify(zinvku[0])),JSON.parse(JSON.stringify(zinvku[1])),JSON.parse(JSON.stringify(zinvku[2])))
        
        that.setData({ 
          zinvsl:zinvsl+1,
          biaozhunku:biaozhunku
        })
       
        break;//子女的增加 OK
  }
 
//指定增加配偶数量 子女数量

},
zhidingxingming:function(e){
 // 查询指定姓名字段
  var   name=""
  // if ( this.data.tujinbenyefangshi!="tu"){
  name=e.detail.value
  // }else{
  //   name=tuname
  // }

  var that=this
  
  const testDB = wx.cloud.database({
    env: 'liuxiaoyunyun-wsc3r'
 })
 const _ = testDB.command
  testDB.collection('jiazurenyuan').where({
  mingcheng:that.data.jiazumingcheng,
  name: testDB.RegExp({
    regexp: '' +name,
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
          
           that.data.listxuhao=1
           that.setData({
            list:res.data, 
                         })
                
           that.chaxunxuhao(e)
                   
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
shurushujulangtap:function(e){
  if (this.data.fangfa=="chaxun"){ return}
  //输入数据框的长按，目的输入编码
  var i=parseInt(e.target.id)
  var biaozhunku=this.data.biaozhunku
  var tishi=biaozhunku[i].tishi
  var zhi=biaozhunku[i].zhi
  var name=biaozhunku[i+1].zhi
  if (biaozhunku[i].name=="id" && name!="" ){
        // wx.showToast({   title: "调取："+name+" "+tishi, icon:'none',  })
      //---- 
      const testDB = wx.cloud.database({
        env: 'liuxiaoyunyun-wsc3r'
     })
     const _ = testDB.command
      testDB.collection('jiazurenyuan').where({
      mingcheng:this.data.jiazumingcheng,
      name:name
    })
    .get({
       success:res=> {
         var huilist=res.data
        //  console.log(res,huilist.length)
       if (huilist.length==0){
        wx.showToast({  title: name+" 的信息尚未登录",  icon:'none',  })
        biaozhunku[i].zhi=""
        this.setData({
          biaozhunku: biaozhunku
        })

      //  console.log("01213")
       } else if(huilist.length==1){
         if (biaozhunku[i].zhi== huilist[0]._id){
          wx.showToast({
            title: "与先前数据一致,无需更改",
            icon:"none",
          })
         } else{
         biaozhunku[i].zhi= huilist[0]._id
         this.setData({
          biaozhunku:biaozhunku
           })
      }
       } else{//因库中无重名不能调试
         for (var hs=0;min(hs<huilist.length,5);hs++){
          wx.showModal({
            titil:"库中重名，请选择"+min(hs<huilist.length,5)+"中的一个",
            content:name +":出生日期为"+huilist[hs].chusheng,
            cancelText:"不是这个",
            confirmText:"是这位",
                success(res){
                      if(confirm) {
                        biaozhunku[i].zhi= huilist[hs]._id 
                            this.setData({
                              biaozhunku:biaozhunku
                            })
                      }
                }
          })

         }

       }

       
      },
      fail:err=>{
        wx.showToast({  title: "网络等原因，调取编码失败", icon:'none',  })
      } 
   
      //----  
  })
}
  //输入数据框的长按，目的输入编码 OK

}







})