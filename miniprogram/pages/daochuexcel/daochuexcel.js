// pages/daochuexcel/daochuexcel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuowuhao:"",
    jiazumingcheng:"",
    openid: getApp().globalData.openid
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openid = getApp().globalData.openid
    this.data.jiazumingcheng=app.globalData.jiazumingcheng
    this.setData({
      openid:this.data.openid,
      jiazumingcheng:this.data.jiazumingcheng
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  daochuexcel:function(){//导出
    var that=this
    wx.cloud.callFunction({
      name:"daochuexcel",
      data:{
        jiazumingcheng:getApp().globalData.jiazumingcheng
        
      },
      success(res){ 
        console.log("保存成功h后返回数据",res)
        // console.log("liu1123",res.fileID)
        console.log("文件下载链接123",res.result,res.tasks)
        //复制文件路径到剪切板 
        that.copyFileUrl(res.result) 
        //下载并预览
        that.downloadExcelFile(res.result)
      },
      fail(res){
        console.log("保存失败",res)
        // console.log("liu123",res.alldata)
        // console.log("err:",res.err)
        wx.showToast({
          title: '转化表格失败',
          icon:"none"
        })

      }
 

    })


  },
  copyFileUrl:function(url){
    // console.log(url,345)
  wx.setClipboardData({
    data: url,
    success(res){
      wx.getClipboardData({
        success: (res) => {
          console.log(res.data,"复制成功，无法预览")
        },
        
      })
    }
  })

  },
  downloadExcelFile(url){
    // console.log(url,"url复制成功111")
  wx.downloadFile({
    url: 'url',
    fileType: "xlsx",
    success(res){
      const tempFilePath=res.tempFilePath
       wx.saveFile({
         tempFilePath: tempFilePath,
         success(res){
           const saveFilePath=res.savedFilePath
           //文件预览
            wx.openDocument({
              filePath: saveFilePath,
               success(res){
                 console.log("打开文档成功")
               }
            })
         }
       })
    },
    fail(err){
      console.log("下载失败",err)
      //由于微信开发平台的地址原因无法下载预览打开，特此备注
    }
  })

  },
  daoruexcel:function(){//导入接口
    // this.jiexi("123") 
    // return//以上2句调试程序用
    var  that=this
    wx.chooseMessageFile({
      count: 1, 
      type:'file',
      success(res){
         var path=res.tempFiles[0].path
         console.log("选择excel成功",path)
         that.uploadexcel(path)
      }
    })


  },
  uploadexcel(path){
  var that=this
  var filename="liuexcel/"+new Date().getTime()+'.xls'
  wx.cloud.uploadFile({
    cloudPath:filename,
    filePath:path,
    success(res){
      console.log("上传成功",res.fileID)
      that.jiexi(res.fileID)
    },
    fail:err=>{
      console.log("上传失败",err)
    } 
  })

  },
  jiexi:function(fileID){
    var that=this
    wx.cloud.callFunction({
      name:"daoruexcel",
      data:{
        fileID:fileID,
        openid:that.data.openid,
        jiazumingcheng:that.data.jiazumingcheng,
      },
      success(res){
            console.log("565",res.result.cuowuhao)
            if(res.result.cuowuhao.length==0){
              that.data.cuowuhao=""  
            }else{
              that.data.cuowuhao=res.result.cuowuhao
            }
            that.setData({
            cuowuhao: that.data.cuowuhao
            })

        console.log("解析并上传成功",res)
                wx.cloud.deleteFile({
                fileList: [fileID],
                  success: res => {
                    // handle success
                    // console.log(res.fileList)
                   
                  },
                    fail: console.error
                  })

      },
      fail(res){ 
        console.log("解析失败",res)
        console.log("解析失败",res.err)
      }
    })
  }

})