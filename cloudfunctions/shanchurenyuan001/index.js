

const cloud = require('wx-server-sdk')
 
cloud.init({
  // env: '***',//你的开发环境
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  var id = event._id
 
  try {
    return await db.collection('jiazurenyuan').doc(id).remove()
 
  } catch (e) {
    console.log(e)
  }
}