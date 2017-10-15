/*
 * @authors :Bin Mei
 * @email : meibin08@163.com 
 * @QQ群 : 386485473   -- 技术交流群
 * @date    :2017-07-20
 * @description：pc官网 -> store - home 模块
 */
import StaticToast from 'src/components/common/Toast/index';
import {fetchSingle,fetchGroup} from "src/utils/fetch";

/*
* @ home 模块 type 常量; 用于更新不同的操作数据
*/
export const LOGIN = 'LOGIN';
export const SET_HOME = 'SET_HOME';
export const SET_LIST = 'SET_LIST';
export const SET_DETAILS = 'SET_DETAILS';
export const SET_ERROR = 'SET_ERROR';


/*
* @ home 模块 initState; 
*/
const state = {
	home:[],
	home_error:"请求出错啦",
	list:[],
	details:{}
};

/*
* @ home 模块 getters - 对外数据接收器  function 格式 以 _ 开头
*/
const getters = {
	_home (state) {
		/*
	* @ home页面数据 
		*/
		return state.home
	},
	_list(state){
		/*
	* @ home -> list 页面数据 
		*/
		return state.list;
	},
	_details(state){
		/*
	* @ home -> list -> detail 页面数据 
		*/
		return state.details;
	}

};

/*
* @ home 模块 actions  
*/
const actions = {

	
	home: ({commit, state}) =>{
		/*
	* @ 首页初始数据
	*/
		 return fetchSingle({url:'/api/test/homeList', data:{city: state.city}}).then(res=>{
		// console.log(32,'首页初始数据',res);
			if(res.code == 0){
				 commit(SET_HOME, {home: res.data});
			}else{
				 commit(SET_ERROR, {message: res.message,"key":"home_error"});
			};
	 },error=>{
		console.log(1555,error)
	 });
	},
	
	list:({commit, state},{name,userToken})=>{
		/*
	* @ 文章列表页初始数据
	*/
		return fetchSingle({url:'/api/test/sectionList',data:{name,userToken},type:"POST"}).then(res=>{
		// console.log(32,res);
			if(res.code == 0){
				 commit(SET_LIST, {list: res.data});
			}else{
				 commit(SET_ERROR, {message: res.message,"key":"list_error"});
			};
	 },error=>{
		console.log(35,error)
	 });
		return ;
		return fetchGroup([
			{url:'/api/test/section_list', data:{name},type:"POST"},
			{url:'/api/test/list', data:{city: state.city}},
	 ]).then(res=>{
		if(res[0].code == 0){
			 commit(SET_LIST, {list: res[0].data.list});
		}else{

			 commit(SET_LIST, {list: res.data,"key":"list_error"});
		}
	 },error=>{
		console.log(35,error);
	 });
	},
	
	details: ({commit, state},{id,userToken}) =>{
		/*
	* @ 文章详情页数据
	*/
		return fetchSingle({url:`/api/test/details/${id}`,type:"POST",data:{id,userToken}}).then(res=>{
			if(res.code == 0){
				 // console.log(48,res)
				 commit(SET_DETAILS, {details: res.data});
			}else{
				 commit(SET_ERROR, {message: res.message,"key":"home_error"});
			};
	 },error=>{
		console.log(1555,error)
	 });;
	}

};

/*
* @ home 模块 mutations - 数据更新 
*/
const mutations = {
	[SET_HOME](state, { home }) {
    state.home = home
  },
  [SET_LIST](state, { list }) {//console.log("setHome",home);
    state.list = list
  },
  [SET_DETAILS](state, { details }) {//console.log("setHome",home);
    state.details = details
  },
  [SET_ERROR](state, { message,key }) {
    state.home_error = message;
  	console.log("sssetHome",state);
  }

};


export default {
	state,
	getters,
	actions,
	mutations
}
