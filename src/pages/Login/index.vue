<template>
	<div class="login">
	<Alert>
	  <h4 class="tit">登录</h4>
	  <Form ref="formInline" >
	    <Form-item prop="user">
	        <Input type="text"  placeholder="Username" v-model="name">
	            <Icon type="ios-person-outline" slot="prepend"></Icon>
	        </Input>
	    </Form-item>
	    <Form-item prop="password">
	        <Input type="password"  placeholder="Password" v-model="password">
	            <Icon type="ios-locked-outline" slot="prepend"></Icon>
	        </Input>
	    </Form-item>
	    <p>{{_Token}}</p>
	    <Form-item>
	        <Button type="primary" @click="login">登录</Button>
	    </Form-item>
	</Form>
	</Alert>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import StaticToast from 'src/components/common/Toast/index';
import {fetchSingle,fetchGroup} from "src/utils/fetch";
import format from 'src/utils/format'
let flag = false;
export default {
  name: 'login-view',
  mounted(){
	  //this.getRepository();
	},
  computed:{
    ...mapGetters({
      _Token: '_Token'
    }),
  } ,
  methods:{

    ...mapActions({
        submit:'submit', 
    }),
  	login(){

  		let {redirect} = this.$route.query;
  		if(!this.name){
  			StaticToast.warning("请输入您的用户名");
  			return ;
  		}else if(!this.password){
				StaticToast.warning("请输入您的密码");
  			return ;
  		};
  		if(flag){
  			return false;
  		};
  		flag = true;
  		this.submit({
  			data:{name:this.name,password:this.password},
  			success:res=>{
  				format.setCookie('userToken',this._Token);
  				this.$router.replace({
		          path: redirect
		      });
  				flag = false;
  			}
  		});
  		

  	}
  } ,
  data(){
    let {name} = this.$route.query;
    return {
      modal:false,
      name:"",
      password :""
    }
  }
}
</script>

<style lang="scss" >
	@import './Login.scss';

</style>
