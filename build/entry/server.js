import { createApp } from './app'
import axios from 'axios'


const isDev = process.env.NODE_ENV !== 'production'
const Status = { code: 0,url:"/notFound" };
//
const getCookie = cookies => {
  
  /***
  *@ cookie处理，把json格式的cookie处理成客户端cookie的字条拼接行式;
  */

  let cookie = ''
  Object.keys(cookies).forEach(item => {
      cookie+= item + '=' + cookies[item] + '; '
  })
  return cookie;
};


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    //取页面cookie 存入到state内
    if(context.cookies){
      store.state.cookies = context.cookies
    };
    const { url } = context;
    const route = router.resolve(url).route;
    const fullPath = route.fullPath

    


    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes

      if (!matchedComponents.length) {
        reject({ code: 404,url:"/notFound" })
      };

      /***
      *@ 服务端token 权限检验在这里处理；
      *@ headers - cookie 因服务端获取的cookies userToken 在页面实例化后，再传入store ,所以服务端 axios请求内获取不到token ,要在这里添加，设置cookie;
      *@ r.meta.requireAuth 查询当前路由是否必须登录才能访问，是 -- 查询是否有cookie ,没有直接进入登录页，登录成功后回跳目标地址；
      */
      axios.defaults.headers.cookie = getCookie(store.state.cookies);
      if (route.matched.some(r => r.meta.requireAuth)) {
        let {userToken} = context.cookies||{};
          if(!userToken||userToken=='') {
            console.log("111no matched routes");
            Status.code = 2002;
            Status.url = '/login?redirect='+fullPath;
            /*reject({ url: '/login',query: { redirect: fullPath } })
            return router.push({
              path: '/login',
              query: { redirect: fullPath }
            })
            return false;*/
          };
      }
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.

      
      
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch((err)=>{
        console.log("entry 64",err)
        reject(err&&err.code || Status)
      })
    }, (error)=>{
      console.log(98,"这里报错",error)
      reject(error);
    })
  })
}
