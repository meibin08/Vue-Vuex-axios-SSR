/*
 * @authors :Bin Mei
 * @email : meibin08@163.com 
 * @QQ群 : 386485473   -- 技术交流群
 * @date    :2017-07-20
 * @description：pc官网 -> store - login 模块
 */
import StaticToast from 'src/components/common/Toast/index';
import {fetchSingle,fetchGroup} from "src/utils/fetch";

/*
* @ 登录模块 type 常量; 用于更新不同的操作数据
*/
export const LOGIN = 'LOGIN';


/*
* @ 登录模块 initState; 
*/
const state = {
  userToken:""
};

/*
* @ 登录模块 getters - 对外数据接收器 
*/
const getters = {
  _Token (state) {
    return state.userToken
  }

};

/*
* @ 登录模块 actions  
*/
const actions = {

  submit({commit, state}, options){

  	const {data,success,error} = options||{};
		// 登录成功后更新userToken
    return fetchSingle({url:'/api/test/userToken',type:"POST",data}).then(res=>{
	   	if(res.code == 0){
	       commit(LOGIN, {userToken: res.data.userToken});
	   	}else{
	       StaticToast.warning(res.message);
	   	};
	   	success&&success(res);
   },error=>{
   	error&&error(error);
   	console.log("1555login",error)
   });
  }

};

/*
* @ 登录模块 mutations - 数据更新 
*/
const mutations = {

  [LOGIN](state, { userToken }){

		// 登录成功后更新userToken
    state.userToken = userToken
  }

};



export default {
  state,
  getters,
  actions,
  mutations
}
