// 云函数入口文件 tongjiquankurenshu
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const db=wx.database()
  const $=db.command.aggregate
  db.collection("jiazurenyuan").aggregate()
  .group({
    _id:'$mingcheng'
    
  }) 

  .end()



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}