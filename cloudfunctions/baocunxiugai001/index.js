// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  var zhi=event.zhi
  var id=event.id
  try {
    return await db.collection('jiazurenyuan').doc(id).update({
      data:{
        name :'132',
        chusheng:"19990101",
      },
    })
    
 
  } catch (e) {
    console.log(e)
  }

  
  

  return {
    id,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    chenggong:"chenggong",

  }
}