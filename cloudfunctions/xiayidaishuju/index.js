// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  var znid=event.znid
 
 
 try {
   
    
  const testDB = wx.cloud.database({
    env: 'liuxiaoyunyun-wsc3r'
 })
  const _ = testDB.command
  return testDB.collection('jiazurenyuan').doc(znid)
  
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
  
 
  } catch (error) {
   
  }

return {
  znid,
  result,
  //  event,
  // openid: wxContext.OPENID,
  // appid: wxContext.APPID,
  // unionid: wxContext.UNIONID,
}
}