import Vue from 'vue'
import 'html5-history-api'
import 'es6-promise/auto'
import { createApp } from './app'
import format from 'src/utils/format'
// import ProgressBar from './components/ProgressBar.vue'

(function(){
  // To enable support for HTML5-History-API polyfill in your library
  
  
  // var location = window.history.location || window.location;
  // you library code here
  // ....http://localhost/home/details/230000201310178757?name=Barbara%20Allen#/home/details/230000201310178757?name=Barbara%20Allen
  // ....
  // ....
})();
// global progress bar
// const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
// document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    console.log("home时的哦v内容",this.$store)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.


if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}



// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    });

    const commonBack = ()=>{
      /*
      *@ 客户端 初始化数据 加载；
      *@ asyncData 页面初始化调用的方法，
      *@ asyncDataHooks 查询当前组件内是否有 asyncData 方法，
      *@ callBack 正常逻辑的回调方法
      */
      const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
          return next()
        }
        //bar.start()
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
          .then(() => {
            //bar.finish()
            next()
          })
          .catch(next)
    };
    /*
    *@ 客户端token 权限检验在这里处理；
    *@ userToken 从cookie内取值 ，如果为空，并且当前 目标路由 requireAuth = true,则去登录页，
    *@ commonBack 正常逻辑的回调方法
    */
    if (to.matched.some(r => r.meta.requireAuth)) {
      let userToken = format.getCookie("userToken");
      if (userToken && userToken!='') {
          commonBack();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
      return ;
    }else{
      commonBack();
    }
    
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
