// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数,修改人员数据
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  // var zhi=event.zhi
  var id=event.id
  try {
    return await db.collection('jiazurenyuan').doc(id).update({
      data:{
        name:event.name,
        xingbie:event.xingbie,
        chusheng:event.chusheng,
        yimin:event.yimin,
        dizhi:event.dizhi,
        siwang:event.siwang,
        dianhua:event.dianhua,
        fuqin:event.fuqin,
        muqin:event.muqin,
        peio:event.peio,
        zinv:event.zinv,
        tbname:event.tbname,
        // tbtime:event.tbtime,不能修改时间和昵称
      },
    })
    
 
  }
   catch (e) {
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