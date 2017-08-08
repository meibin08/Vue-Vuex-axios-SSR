/**
 * @author monkeywang
 * Date: 17/3/14
 */
import Vue from 'vue'
import axios from 'axios'
// import { createApp } from 'src/app'
import { createRouter } from 'src/pages/routes'
const router = createRouter()
// const { app, router, store } = createApp();

const  client = process.env.VUE_ENV == "client";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = client?"/zaApi/easy":'https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c';;

// http request 拦截器
axios.interceptors.request.use(
    config => {
      let token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `token ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
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
                  router.replace({
                      path: 'notFound',
                      query: {redirect: router.currentRoute.fullPath}
                  })
              break;

          }
      };

      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)
});

const fetch =(options)=>{
  let { url, type, data, ...others } = options;
  let opts = {
    ...others,
    method: (type || 'get').toUpperCase(),
    // credentials: 'include',
    data,
    url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return axios(opts);
}

export const fetchJson = (options)=>{

  fetch(options).then(resData => toJson(resData, options))
    .then(resData => resHandler(resData, options))
};
export const fetchJsonAll = (queue)=>{
  var promises = (queue||[]).map(function(item){
    return fetch(item);
  });
  axios.all(promises)
  .then(axios.spread((res1, res2)=>{
    console.log(res1)
    console.log(res2)
  })).catch(err=>{ console.log(err) })

  
};




function toJson(resp, options) {
  if (resp.status >= 400) {
    return errorHandler(null, options, resp.status)
  }
  return resp;
}

// 请求成功处理
function resHandler(resData, options) { 
  // Loading(false);
  if (resData.status && resData.status != 200) {
    return errorHandler(resData.error, options, resData.status);
  }
  if (!resData || (resData.data&& resData.data.code > 20000)) {
    // options.error && options.error(resData.data);
    /*router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
    });*/
    return ;
    // StaticToast.error(resData.message);
  } else {
    options.success && options.success(resData.data);
  };

}

// 异常处理
function errorHandler(error, options, status) {
  // Loading(false);
  options.error && options.error(error);
  console.log(`网络异常，请稍后重试(${status})`);
  // ErrorLogs(options._url,{status,error});
}




export default axios;
