<template>
  <div>
    <div class="error-tips">
    	<Card>
	        <div class="err-inner">
	        	<p>
	        		<router-link :to="{ path: '/home'}" class="a-block">返回首页</router-link>
	        		<span><strong class="red">{{second}}</strong>秒后自动回到首页</span>
	        	</p>
	        </div>
	    </Card>

    </div>
  </div>
</template>

<script>

let timer = null;
export default {
  name: 'noFound-view',
  mounted(){
    this.down();
  },
  data(){
    return {
      second:5,
    }
  },
   methods:{
    down(){
      timer = setInterval(()=>{
        if(this.second<=0){
          clearInterval(timer);
          this.$router.replace({
              path: '/home'
          })
          return false;
        };
        this.second--;
      },1000);
    }
  }
}
</script>

<style lang="scss">
	@import './NotFoundPage.scss';

</style>
