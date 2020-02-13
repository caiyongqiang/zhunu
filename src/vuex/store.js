/**
 * Created by 60411 on 2018/4/27.
 */
"use strict"

const state = {
  userInfo:{
    name: 'username'
  }
}

const getters = {
  userInfo : state => state.userInfo,
}

const mutations = {
  CHANGE_USER_INFO(state, user){
    state.userInfo = user
  }
}

const actions = {

  changeUserInfo({commit},info){
    commit('CHANGE_USER_INFO',info)
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}
