// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数,白名单处理申请同意或拒绝
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var fangshi=event.fangshi
  var id=event.id
  var zhi=event.zhi
  const db=cloud.database()
   if (fangshi=="xiugai"){
            try {
              db.collection("baimingdan").doc(id).update({
              data:{ shenhe:zhi }
              })

            } catch (error) {
              
            }
   }

   if (fangshi=="shanchu"){
      try {
        db.collection("baimingdan").doc(id).remove()

      } catch (error) {
        
      }

  }


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}