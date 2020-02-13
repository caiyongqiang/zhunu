/**
 * Created by 60411 on 2020/1/12.
 */
"use strict"
import Vue from 'vue'
import Vuex from 'vuex'
// 导入各个模块的初始状态和 mutations
import store from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  // 组合各个模块
  // strict: true,
  modules: {
    store
  }
})
