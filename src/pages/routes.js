
/*
 * @authors :Bin Mei
 * @date    :2017-07-20
 * @description：pc官网 -> 路由对统一外出口
 */


import Vue from 'vue'
import Router from 'vue-router'
import HomeRoute from "./Home/route.js" //首页模块router
const NotFoundPage = () => import('./NotFoundPage/index.vue') //详情
const Login = () => import('./Login/index.vue') //详情
import iView from 'iview';
import { createStore } from 'src/store/index.js'
import format from 'src/utils/format'
import 'iview/dist/styles/iview.css';    // 使用 CSS

const store = createStore()

Vue.use(iView);
Vue.use(Router);

var router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...HomeRoute,

    
    { path: '/login/:page(\\d+)?',  component: Login,meta: {
        title:"登录页"
    } },
    { path: '/', redirect: '/home' },
    {  
      path: '*',  component:NotFoundPage ,
      meta: {
        requireAuth: false,title:"页面不存在"
      } 
    },

  ]
});
// store.state.cookies
  
  //已在 build => entry => client 页面处理
/*router.beforeEach((to, from, next) => {
  //页面是是否要登录进入，在该处统一处理
  if (to.matched.some(r => r.meta.requireAuth)) {
      // let format

      if (true) {
          next();
      }
      else {

          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
});*/

export function createRouter () {
  return router;
}
