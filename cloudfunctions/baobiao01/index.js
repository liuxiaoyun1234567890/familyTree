const cloud = require('wx-server-sdk')
 
cloud.init({
  // env: '***',//你的开发环境
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
// const db = cloud.database()
    const $ = db.command.aggregate
exports.main = async(event, context) => {
  var jiazumingcheng = event.jiazumingcheng
 
  try {
    return await 
    
    
    db.collection('jiazurenyuan').aggregate()
    .match({
      mingcheng:jiazumingcheng
    })
    // .addFields({
    //   siwang:
    // })
      .group({
       
        _id:{ 
          xingbie:'$xingbie',
          yimin:'$yimin',
          
        },
        sum:$.sum(1)
      })
      .end()
    // //
 
  } catch (e) {
    console.log(e)
  }
}