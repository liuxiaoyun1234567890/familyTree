// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数//初始为白名单
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var jiazumingcheng=event.jiazumingcheng
  const db=cloud.database()
  try { 
    return  await db.collection("baimingdan").where({
      mingcheng: jiazumingcheng
     })
     .remove()
     }
    
    finally { 
      //
      const $=db.command.aggregate
      // const result = await db.collection('books').aggregate()
      const  result= await db.collection("jiazurenyuan").aggregate()
      .match({
        mingcheng:jiazumingcheng
      })
      .group({
       _id:'$_openid'
      })
      .end()
    
      //
     const luru=result.list

    // luru=[
    //    {"_id":"liu123"},
    //    {"_id":"liu1245653"}
    //   ]

       

          for(var i=0;i<luru.length;i++) {

            try{
          //  return 
          await db.collection("baimingdan").add({
            data:{
              mingcheng: jiazumingcheng,
              mingdanopenid:luru[i]._id,
              shenhe:true,
              
            }
            })
            .then(res => {
              console.log(456,res)
            })
            }
            catch (e) {
              console.log(e)
              }
          }
        
    }//xin增
    // catch (e) {
    //   console.log(e)
    // }
  
  }
   
  
 

