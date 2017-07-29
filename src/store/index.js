/*
 * @authors :Bin Mei
 * @email : meibin08@163.com 
 * @QQ群 : 386485473   -- 技术交流群
 * @date    :2017-07-20
 * @description：pc官网 -> store - store 模块
 */

import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index'
import login from './login/index'

Vue.use(Vuex)

export function createStore (){
  return new Vuex.Store({
    modules: {
      home,
      login
    }
  });
} ;