import { isNotEmpty, isIdCard } from './validate';

const  client = process.env.VUE_ENV == "client";
 let format = {

  // 格式化日期
  date: function (date, fmt) {
	if (!date || !fmt) {
	  return date;
	}
	if (date.length == 8) {
	  date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
	}
	date = new Date(date.toString().replace(/-/g, "/"));
	var o = {
	  "M+": date.getMonth() + 1, //月份
	  "d+": date.getDate(), //日
	  "h+": date.getHours(), //小时
	  "m+": date.getMinutes(), //分
	  "s+": date.getSeconds(), //秒
	  "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	  "S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
  },

  // 根据身份证获取出生年月
  getBirthdayByIdCard(idCard) {
	if (!isIdCard(idCard)) {
	  return;
	}
	let tmpStr;
	if (idCard.length == 15) {
	  tmpStr = idCard.substring(6, 12);
	  tmpStr = "19" + tmpStr;
	  tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	  return tmpStr;
	} else {
	  tmpStr = idCard.substring(6, 14);
	  tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	  return tmpStr;
	}
  },

  // 根据身份证获取性别
  getSexByIdCard(idCard) {
	if (!isIdCard(idCard)) {
	  return;
	}
	return (parseInt(idCard.substr(16, 1)) % 2)
  },
   setCookie(name,value) 
	{ 
	    var Days = 7; 
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/"; 
	}, 

	//读取cookies 
	 getCookie(name) 
	{ 
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
	    if(arr=document.cookie.match(reg))
	 
	        return unescape(arr[2]); 
	    else 
	        return null; 
	} ,
	//删除cookies
	 removeCookie(name) 
	{ 
	 
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/";
	} ,
	clientCookie(){
		let result = {};
		let cookies = document.cookie;
		if(!cookies){
			return result;
		};
		let str = cookies.split(";");
		for(var i=0;i<str.length;i++){
			let item = str[i].split("=");
			result[item[0]] = item[1];
		};
		return result;
	},
	getAllCookies(cookies){

		const  client = process.env.VUE_ENV == "client";
		if(client){
			return format.clientCookie();
		};

		return cookies||{};

	},
	n(num){
		if(num<10){
			return '0'+num;
		};
		return ''+num;
	}
};

export default format;