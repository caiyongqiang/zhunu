/**
 * Created by 60411 on 2018/4/27.
 */
"use strict"

const state = {
  userInfo:{
    name: 'username'
  },
  // 用户的账号信息
  userData:[ 
    { "PKID":'0',"name":"王阿丽","Phone":"13697418595","sex":"女","birth":'1990-12-12',"city":'广东省广州市',"baduser":"小刘：120000"},
    { "PKID":'1',"name":"王阿丽","Phone":"13697418595","sex":"女","birth":'1990-12-12',"city":'广东省广州市',"baduser":"小刘：120000"},
    { "PKID":'2',"name":"王阿丽","Phone":"13697418595","sex":"女","birth":'1990-12-12',"city":'广东省广州市',"baduser":"小刘：120000"},
  ],
  // 推广数量
  extensionData:[
    { "PKID":'0',"name":"张三","extention_url":"https://www/baidu.com","extention_visit":"150","extention_Down":'150'},
    { "PKID":'1',"name":"李四","extention_url":"https://www/baidu.com2","extention_visit":"50","extention_Down":'150'},
    { "PKID":'2',"name":"张三","extention_url":"https://www/baidu.com3","extention_visit":"100","extention_Down":'150'},
  ],
    // 推广数量
    labelData:[
      { "PKID":'0',"name":"张三","numb":1},
      { "PKID":'1',"name":"李四","numb":2},
      { "PKID":'2',"name":"张三","numb":3},
    ],
    // 推广数量
    materialData:[
      { "PKID":'0',"name":"张","numb":1},
      { "PKID":'1',"name":"力","numb":2},
      { "PKID":'2',"name":"奥","numb":3},
    ]
}

const getters = {
  userInfo : state => state.userInfo,
  userData:state=>state.userData,
  extensionData:state=>state,
  labelData:state=>state.labelData
}

const mutations = {
  CHANGE_USER_INFO(state, user){
    state.userInfo = user
  },
  CHANGE_USER_DADA(state, user_data){
    state.userData = user_data
  },
  CHANGE_EXTENSION(state,  extension_data){
    state.extensionData = extension_data
  },
  CHANGE_LABELDATA(state,  label_data){
    state.labelData = label_data
  },
}

const actions = {

  changeUserInfo({commit},info){
    commit('CHANGE_USER_INFO',info)
  },
  
  changeUserData({commit},user_D){
    commit('CHANGE_USER_DADA',user_D)
  },
  changeextensionData({commit}, extension_D){
    commit('CHANGE_EXTENSION',extension_D)
  },
  changelabelData({commit}, extension_D){
    commit('CHANGE_LABELDATA',extension_D)
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
