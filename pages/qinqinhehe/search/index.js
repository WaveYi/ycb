// pages/search/index.js
import {
  search_company,
  appRole
} from '../../../api/qqhh_user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    type: 'boss',
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.setData({
        type: options.type
      })
    }
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
    this.getSearchList();
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    this.getSearchList();
  },
  getSearchList(){
    search_company({
      pageNum: this.data.page,
      pageSize: 20
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            searchList: res.data.records
          })
        }else{
          this.setData({
            searchList: this.data.searchList.concat(res.data.records)
          })
        }
      }
    })
  },
  inviteAgent(e){
    let index = e.currentTarget.dataset.index;
    invite_agent({
      agentId: this.data.searchList[index].agentId
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '请求成功',
          icon: 'none',
          duration: 2000
        })
        this.data.searchList[index].status = '0';
        this.setData({
          searchList: this.data.searchList
        })
      }
    })
  },
  addRole(e){
    let index = e.currentTarget.dataset.index;
    // wx.navigateTo({
    //   url: '/pages/applyCompany/index?c_type='+this.data.searchList[index].companyType
    // })
    appRole({
      bossUnionId: this.data.searchList[index].businessId,
      type: 3
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '请求成功',
          icon: 'none',
          duration: 2000
        })
        // this.data.searchList[index].status = '0';
        this.setData({
          searchList: this.data.searchList
        })
      }
    })
    // wx.showActionSheet({
    //   itemList: roleList,
    //   success (res){
        
    //   }
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})