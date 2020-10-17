// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
     openid: '',
     jiazumingcheng:"碱厂刘", 
     jiazushenqingren:"",
     shenqingrendianhua:"",
     id:"",
     openid:"",
     mingcheng:"",
     name:"",
     xingbie:"",
     chusheng:"",
     siwang:"",
     dianhua:"",
     fuqinid:"",
     fuqinname:"",
     muqinid:"",
     muqinname:"",
     peiou:[],
     zinv:[],
     ldsm:{
     ids:{tishi:"系统编码",titils:"无需操作者写入"},
     openids:{tishi:"操作者身份",titils:"无需操作者写入"},
     mingchengs:{tishi:"家族名称",titils:"无需操作者写入"},
     names:{tishi:"姓名",titils:"最少2个字"},
     xingbies:{tishi:"性别",titils:"男 或 女"},
     chushengs:{tishi:"出生日期",titils:"年月日（字符型YYYY MM DD）"},
     siwangs:{tishi:"死亡日期",titils:"年月日（字符型YYYY MM DD）健在者不要填写"},
     dianhuas:{tishi:"电话",titils:"11位手机号，慎重填写，可以不填写"},
     fuqinids:{tishi:"父亲编码",titils:"父亲、母亲、子女编码，待后续修改连接"},
     fuqinnames:{tishi:"父亲姓名",titils:"最少两字，可以不填"},
     muqinids:{tishi:"母亲编码",titils:"父亲、母亲、子女编码，待后续修改连接"},
     muqinnames:{tishi:"母亲姓名",titils:"最少两字，可以不填"},
     peious:{tishi:"配偶信息",titils:"可以不填，可以多个"},
     zinvs:{tishi:"子女信息",titils:"可以不填，可以多个"},

     },

     list:[ {
     _id: "1b64dd7b5f884416018ebb1a5fc01f17",
     _openid: "oF85t5a4erKVv0JB3CnvujSN6WJw",
     mingcheng: "碱厂刘",
     name: "刘晓云",
     xingbie: "男",
     chusheng: "19640801", 
     siwang: "",
     dianhua: "13832429913",
     fuqin: {id: "", name: "刘守智"},
     muqin: {id: "", name: "张素梅"},
     peiou: [{id: "", name: "沈艳华"}],
     zinv: [{guanxi: "长子", id: "", name: "刘士博"}]  
    }]

  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
        jiazumingcheng:app.globalData.jiazumingcheng,
        jiazushenqingren:app.globalData.jiazushenqingren,
        shenqingrendianhua:app.globalData.shenqingrendianhua
      })
    }
    //联调前删除以下备注，禁止未获取身份或未指定家族进入
    // if(this.data.openid.length==0 || this.data.jiazumingcheng.length==0) {
    //   wx.showModal({
    //     showCancel:false,
    //     title:"提示",
    //     content:"未获取身份或未指定家族",
    //     confirmtext:"返回",
    //     success(res){
    //       if(res.confirm){
    //         wx.redirectTo({
    //           url: "../index/index",
    //         })
    //       }
    //     }

    //   })
    // }

    const testDB = wx.cloud.database({
      env: 'liuxiaoyunyun-wsc3r'
   })
   const _ = testDB.command
    testDB.collection('jiazurenyuan').where({
    mingcheng:this.data.jiazumingcheng
  })
  .get({
     success:res=> {
      console.log(res,22234)
      console.log(this.data.list,2234-1)
        this.setData({
        list:res.data 
        })
       console.log(this.data.list,234)
       
     },
     fail:err=>{
     console.log(err,123) 
     }
  })


  },
  shurutishi:function(e){
  console.log(e.target.id)
  var  ids=e.target.id
  var ls=this.data.idsm

for(let i in ls){
 if(ls.name == ids){
   wx:showModal({
     
     confirmText: '确定',
     title: ls.tishi,
     content: ls.title,
     showCancel: false,
     
     
   })
 }
}

}
 
  

})