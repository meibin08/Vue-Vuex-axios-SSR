

import {Bridges} from 'src/utils/bridge.js'
const Layout = () => import('src/components/Layout/index.vue') //共用部分
const Home = () => import('./Index/index.vue') //首页
const List = () => import('./List/index.vue') //列表
const Details = () => import('./Details/index.vue') //详情


// export default [
// 	{
// 		path:'/home', 
// 		component:Home,
// 		name:"home",
// 		...Bridges("首 页",true),
// 		//children 使用注意，内容渲染在home 内的route-view入口 内；
// 		children:[

// 		],
	
// 	},{
// 		path:'/list/:page(\\d+)?', 
// 		name:"list",
// 		component:List,
// 		...Bridges("列表页",true),
// 	},{
// 		path:'/details/:id', 
// 		name:"details",
// 		component:Details,
// 		...Bridges("文章详情页",true),
// 	}
// ];
// import {Bridges} from 'src/utils/bridge.js'
// import Layout from "src/components/Layout/index.vue" //首页
// import Home from "src/pages/Home/Index/index.vue" //首页
// import List from "src/pages/Home/List/index.vue" //列表
// import Details from "src/pages/Home/Details/index.vue" //详情

export default [
	{
		path:'/home', 
		component:Layout,
		// name:"layout",
		//children 使用注意，内容渲染在home 内的route-view入口 内；
		children:[
			{ 
				// name:"",
				path: '/', 
				component: Home,
				...Bridges("首 页"),
			},{
				path:'list', 
				// name:"list",
				component:List,
				...Bridges("列表页",true),
			},{
				path:'details/:id', 
				// name:"details",
				component:Details,
				...Bridges("文章详情页",true),
			}
		],
	}
];