/**
 * @author monkeywang
 * Date: 17/3/14
 */
import Vue from 'vue'
import $http from 'vue-resource'
// import { createAPI } from 'create-api'
Vue.use($http)

const logRequests = !!process.env.DEBUG_API
const  client = process.env.VUE_ENV == "client";

/*const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c'
  }
})*/
let vm = new Vue()

const configPath = client?"/zaApi/easy":'https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c';
// const configPath = 'https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c';

export class Utils {
  get (url, data = {}) {
    url = configPath + url;
    
    return new Promise((resolve, reject) => {
      vm.$http.get(url, {params: data, credentials: true}).then((response) => {
        //console.log(18,response);
        resolve(response.body)
      }, function (error) {
        console.log('接口异常')
      }).catch(function () {
     console.log("Promise Rejected");
});

    })
  }
}
