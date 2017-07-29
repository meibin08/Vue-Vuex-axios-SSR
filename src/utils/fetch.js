
/*
 * @authors :Bin Mei
 * @date    :2017-07-20
 * @description：pc官网 -> api请求 -客户、服务端都共用引起页面逻辑
 */

import Vue from 'vue'
import axios from 'axios'
import format from 'src/utils/format'
import { createRouter } from 'src/pages/routes'
import { createStore } from 'src/store/index.js'
const router = createRouter()
const store = createStore()

const  client = process.env.VUE_ENV == "client";



axios.defaults.timeout = 5000;
axios.defaults.baseURL = client?"/zaApi/easy":'https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c';

// http request 拦截器
axios.interceptors.request.use(
    config => {

        if (client) {
            //config.headers.cookie =getCookie(format.getAllCookies());
        };
        
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
  response => {

      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      return Promise.reject(response);
  },
  error => {
    // console.log("57======================",error);


      //单个、多个队列请求可统一在这里处理 登录失效等逻辑
      if (error.response) {
          switch (error.response.status) {
              case 401:
              console.log(error);
                  router.replace({
                      path: 'login',
                      query: {redirect: router.currentRoute.fullPath}
                  })
              break;
              case 404:
              case 500:
              //以提示的方式处理
              
                  /*router.replace({
                      path: 'notFound',
                      query: {redirect: router.currentRoute.fullPath}
                  })*/
              break;

          }
      };

      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error)
});

const fetch =(options)=>{
  /*
  
  * @ 数据请求
  * @ options - url 接口url   结果== baseUrl + url;
  * @ options - type 请求类型 post\get等;
  * @ options - data 请求数据 object类型;
  * @ options - others 其他参数;
    @ options - userToken 用户token 服务端 初始化数据方法，请手动传入，客户端会自动带上；
  */
  let { url, type, data,userToken, ...others } = options;
  let opts = {
    ...others,
    method: (type || 'get').toUpperCase(),
    data,
    url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'

    }
  };

  return new Promise((resolve, reject)=>{
    axios(opts)
    .then(resData =>{
        resolve(resData)
    }).catch((error) => {
      reject((error||{message: '网络异常，请刷新重试', type: 1}));
    });
  });
}



export const fetchSingle = (options)=>{

  /*
  * @ 单个数据请求
  * @ options -- 请参考 fetch 方法
  */
  return fetch(options).then(res=>resHandler(res),(err) =>errorHandler(err, err.status));
};
export const fetchGroup = (queue)=>{
  var promises = (queue||[]).map(function(item){
    return fetch(item);
  });
  return axios.all(promises)
  .then(res=>{
    //多个队列请求，只安第一个返回的结果处理 未登录状态；
    let firstItem = res[0];
    if (firstItem && firstItem.data&& firstItem.data.code > 20000) {
      router.push({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
      });
      return ;
    } ;
    let result = (res||[]).map((item)=>{
      return item.data;
    })
    return Promise.resolve(result);
  },(err) =>errorHandler(err.data||err, err.status))
};




function toJson(resp, options) {
  if (resp.status >= 400) {
    return errorHandler(resp, resp.status)
  }
  return resp;
}

function resHandler(resData, options) { 

  /*

  * @ 请求成功处理
  * @ status -- 当前请求的状态
  * @ data -- 业务接口返回的数据
  * @ code -- 业务接口状态码

  */
  if (resData.status && resData.status != 200) {
    return errorHandler(resData.data||resData, resData.status);
  }
  if (!resData || (resData.data&& resData.data.code > 20000)) {
    router.push({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
    });
    return ;
  } else {
    return Promise.resolve(resData.data);
  };
}

function errorHandler(error, status) {

  /*
  * @ 异常处理
  * @ status -- 当前请求的状态
  * @ error||error.data -- 业务接口返回的数据

  */
  console.log(`网络异常，请稍后重试(${status})`);
   return Promise.reject(error.data||error);
}


axios.prototype.fetchSingle = fetchSingle;
axios.prototype.fetchGroup = fetchGroup;

export default axios;
