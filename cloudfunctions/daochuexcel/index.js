// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//操作excel用的类库
const  xlsx = require('node-xlsx')
const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const  jiazumingcheng=event.jiazumingcheng
  

  const MAX_LIMIT = 20
  const countResult = await  db.collection('jiazurenyuan').where({mingcheng:jiazumingcheng}) .count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total /  MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = await db.collection('jiazurenyuan').where({mingcheng:jiazumingcheng}) .skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
     tasks.push(promise.data)
    }
  
    try{
      await promise.data.all(tasks)
      return tasks
    }catch(res_err){
      console.log('await handle the reject result :',res_err);
    }

  
   const dicarr=[]
    for (var i=0;i<tasks.length;i++){
       for (var j=0;j<tasks[i].length;j++){
        dicarr.push(tasks[i][j]) 
       }
    }

  //  tasks

   const datacvs="test.xlsx"
   const alldata=[]
                // // _id:
                // // _openid:
                // mingcheng:that.chaxunziduanzhi("","mingcheng"),
                // name:that.chaxunziduanzhi("","name"),
                // xingbie:that.chaxunziduanzhi("","xingbie"),
                // chusheng:that.chaxunziduanzhi("","chusheng"),
                // yimin:that.chaxunziduanzhi("","yimin"),
                // dizhi:that.chaxunziduanzhi("","dizhi"),
                // siwang:that.chaxunziduanzhi("","siwang"),
                // dianhua:that.chaxunziduanzhi("","dianhua"),
                // fuqin:that.chaxunziduanzhi("fuqin",""),
                // muqin:that.chaxunziduanzhi("muqin",""),
                // peio:that.chaxunziduanzhi("peio",""),
                // zinv:that.chaxunziduanzhi("zinv",""),
                // tbname:that.chaxunziduanzhi("","tbname"),
                // tbtime:that.chaxunziduanzhi("","tbtime"),

                var t = new Date()
                var time=t. getFullYear() 
                var ls=("00"+ (t.getMonth()+1))
                time=time+ls.slice(ls.length-2) 
                ls="00"+t.getDate() 
                time=time+ls.slice(ls.length-2) 
                // time=time+" "+t.getHours() +":"+t.getMinutes()  //时区+8
               alldata.push([jiazumingcheng,"",'生成时间:'+ time,"","",'【家族内部资料请勿外传】',"","","欲增加请按本表格式填写"])
                const row=["序号","姓名","性别","出生日期","电话","居住地","是否死亡","死亡日期","父亲姓名","母亲姓名","配偶姓名","子女姓名","备注","填报日期及昵称"]
  alldata.push(row)

   
  for (var xu=0;xu<dicarr.length;xu++){//
   let arr=[]

   arr.push(xu+1)//序号
      if (dicarr[xu].name==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].name)//姓名
      }
      if (dicarr[xu].xingbie==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].xingbie)//性别
      }

      if (dicarr[xu].chusheng==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].chusheng)//出生日期
      }
      if (dicarr[xu].dianhua==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].dianhua)//电话
      }
      if (dicarr[xu].dizhi==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].dizhi)//居住地
      }
      if (dicarr[xu].yimin==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].yimin)//是否死亡
      }
      if (dicarr[xu].siwang==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].siwang)//死亡日期
      }
      if (dicarr[xu].fuqin.name==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].fuqin.name)//"父亲姓名"
      }
      if (dicarr[xu].muqin.name==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].muqin.name)//母亲姓名
      }
       var ls=""
       for (var i=0;i<dicarr[xu].peio.length;i++ ){
          if(dicarr[xu].peio[i].name !=undefined) {
            if(i!=0){
              ls=ls+","+dicarr[xu].peio[i].name
            }else{
              ls=dicarr[xu].peio[i].name 
            }
           }
         }
       arr.push(ls)//配偶姓名
      
       var ls=""
       for (var i=0;i<dicarr[xu].zinv.length;i++ ){
          if(dicarr[xu].zinv[i].name !=undefined) {
            if(i!=0){
              ls=ls+","+dicarr[xu].zinv[i].guanxi+dicarr[xu].zinv[i].name
            }else{
              ls=dicarr[xu].zinv[i].guanxi+ dicarr[xu].zinv[i].name 
            }
           }
         }
       arr.push(ls)//子女姓名


     
      if (dicarr[xu].tbname==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].tbname)//备注
      }
      if (dicarr[xu].tbtime==undefined){
        arr.push("")
      }else{
        arr.push(dicarr[xu].tbtime)//填报日期及昵称
      }
   
  
   alldata.push(arr)
 }
 try{
  await arr.all(alldata)
}catch(res_err){
  console.log('await handle the reject result :',res_err);
}
// 
  //  return alldata
 //把数据保存到excel里
 var buffer=await xlsx.build([{
   name:"sheet1",
   data:alldata
 }])
  // return buffer 

 //把excel文件保存到云存储里
 let res=await cloud.uploadFile({
  cloudPath:'liuexcel/'+datacvs,//
  fileContent: buffer,//二进制文件
 })
//  .then(res=>{
//    console.log(res.fileID)
//    return res
//   })
//   .catch(function(err){
//     return err
//   })

//  return  cloudPath
 if (!res.fileID){
   return "上传失败"
 } else{
      let res2=await cloud.getTempFileURL({
        fileList:[res.fileID]
      })
      if(!res2.fileList.length){
       
      } else{
        let fileUrl=res2.fileList[0].tempFileURL
        console.log("文件下载链接"+fileUrl)
        return fileUrl
      }
 }






  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    cloudPath
  }
}