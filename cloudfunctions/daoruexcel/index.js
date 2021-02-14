// 云函数入口文件//批量导入数据 excel.xls
const cloud =  require('wx-server-sdk')

cloud.init()
const xlsx =require('node-xlsx')
const db =cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
 


  var  fileID=event.fileID
  var openid=event.openid
  var jiazumingcheng=event.jiazumingcheng
  var cuowuhao=""
  
 //1.通过fileId下载云存储里的excel文件
 const res=await cloud.downloadFile({fileID})
 const buffer=res.fileContent
 const tasks=[]//用来存储所有的添加数据操作
 //2解析excel文件里的数据
 var sheets=xlsx.parse(buffer)//获取到所有sheets
 var biao= sheets[0].data
 var  row ={}
 var rowmax=0
 Object.keys(biao).forEach(function(key){
  rowmax++
  })//统计数量
 

  row = biao[0]//第几行数据sheet['data']
  // return row
  if ( row[0]!=jiazumingcheng){
    cuowuhao=cuowuhao+  "1行1列未标注家族名称；"
  }
  row=biao[1]
  if (row[0]!="序号" || row[1]!="姓名" || row[2]!="性别" ){//其他标题行不在核实
    cuowuhao=cuowuhao+  "2行项目名称不规范，序号 姓名 性别有误"
  }
  for (var rowid=2;rowid<=rowmax;rowid++ ){//检验数据规范性
    row=biao[rowid]
        for (var i=0;i<=13;i++){
          var linshi=row[i]
        switch(i){
          case 0://序号
            break;
          case 1://姓名
          if (linshi.length==0 || linshi.length>=6) {
           cuowuhao=cuowuhao+ (rowid+1) +"行姓名必填大于5个汉子;"
          }
           break;  
           case 2://性别
           if (["男","女"].indexOf(linshi) ==-1) {
            cuowuhao=cuowuhao+ (rowid+1) +"行性别仅限男女;"
           }
           break;  
           
           case 3://出生日期
           if (linshi.length>=9) {
            cuowuhao=cuowuhao+ (rowid+1) +"行出生日期大于8位;"
           }
           break;
           case 4://电话
           if (linshi.length>=12) {
            cuowuhao=cuowuhao+ (rowid+1) +"行电话大于11位;"
           }
           break;
           case 5://居住地
           if (linshi.length>9) {
            cuowuhao=cuowuhao+ (rowid+1) +"行居住地大于9位;"
           }
           break;
           case 6://是否死亡 
           if(["是",""," "].indexOf(linshi) ==-1) { 
            cuowuhao=cuowuhao+ (rowid+1) +"行是否死亡仅限是或不填;"

           }
           break;
           case 7://死亡日期
           if (linshi.length>=9) {
            cuowuhao=cuowuhao+ (rowid+1) +"行死亡日期大于8位;"
           }
           break;
           case 8://父亲姓名
           if (linshi.length>=6) {
            cuowuhao=cuowuhao+ (rowid+1) +"行父亲姓名大于5位;"
           }
           break;
           case 9://母亲姓名
           if (linshi.length>=6) {
            cuowuhao=cuowuhao+ (rowid+1) +"行母亲姓名大于5位;"
           }
           break;
           case 10://配偶姓名
            var douqi=1
            var douzhong=0
            while  (linshi.indexOf(",",douqi)<linshi.length  && douqi <=0) {
             var zc=linshi.slice(douqi,douzhong)
              if (zc.length>=6) {
                cuowuhao=cuowuhao+ (rowid+1) +"行配偶母亲姓名大于5位或缺英文逗号;"
               }

              douqi=douzhong+1
              }
            

           break;
           case 11://子女姓名
           break;
           case 12://备注
           break;
           case 13://填报日期及昵称
           break;


        }

        }//校验完1行
   

   if (cuowuhao.length!=0) { break }//检验完每一行发现错误即可退出，后续不在检查
  }//检验数据规范性 OK



  if (cuowuhao.length==0) {//没有错误的时候导入
        for (var rowld=2;rowld<=3;rowld++ ){//rowmax 调试仅限2行！！
          
          
          if (rowld>=2 ){//第1,2行是表格标题，所以我们要从第3行开始读
            //3把解析到的数据存到excellist数据表里
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

            
              row=biao[rowld]//第几行数据sheet['data']
            
            db.collection("user")
          
            .add({
              data:{
                name:row[1],//姓名
                xiebie:row[2],//row[1],//年龄
                dianhua:row[4],//地址
                yinmim:row[5],//wechat

              }
            })
            //  tasks.push(promise)
          }
        }
  }  




  return {
    cuowuhao,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}