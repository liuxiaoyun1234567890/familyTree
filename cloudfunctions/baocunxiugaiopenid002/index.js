// 云函数入口文件//修改RENYUAN集合重openid
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  var openid=event.openid
  var id=event.id
  try {
    return await db.collection('jiazurenyuan').doc(id).update({
      data:{
        _openid :openid
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
    unionid: wxContext.UNIONID
    

  }
}