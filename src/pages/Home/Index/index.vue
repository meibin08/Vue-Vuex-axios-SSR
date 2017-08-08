<template>
  <div class="home">
    <banner></banner>
    <div class="content main">
      <Row type="flex" :gutter="10" v-if="_home&&_home.length">
        <Col span="8" v-for="item in _home" :key="item.id">
            <Card>
                <p slot="title">作者：{{item.title}}</p>
                <p>时间：{{item.date}}</p>
                <p>签名：{{item.content}}</p>
                <p>共发表过<span class="red">{{item.sum}}</span>文章</p>
                <p class="mt-10"><Button type="info" size="small" @click="goToList(item.title)">查看列表</Button></p>
            </Card>
        </Col>
    </Row>
    <h1 v-else>{{home_error}}</h1>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Banner from "src/components/Banner/index.vue";
export default {
  name: 'home-view',
  components: { Banner },
  mounted(){
    let {id} = this.$route.query;
    this.$store.dispatch('home', { id }); 
  },
  computed:{
    //会把 home模块的state 跟主store合并，
    ...mapGetters({
    _home: '_home'
  }),
    //这种方式 不会，要取某模块的state 如home
    home_error () {
      
      return this.$store.state.home.home_error
    }
  } ,
  methods:{
    ...mapActions({
        home:'home',
    }),
    goToList(name){
      return this.$router.push({
          path: '/home/list',
          query: {name}
      });
    },
  } ,
  asyncData ({ store, route: { params: { id }}}) {
    /*
     
     * @ 初始化服务端调用接口
     * @ HOME action 方法

    */
    return store.dispatch('home', { id });

  }
}
</script>
<style lang="scss" >
  @import './Home.scss';

</style>

