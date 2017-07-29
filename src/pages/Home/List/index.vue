<template>
  <div class="list main">
    <Alert type="success" show-icon>参与人：<strong class="name">{{currentName}}</strong>老师发表的文章列表</Alert>
    <section v-if="_list&&_list.length">
      
    
    <Card :bordered="(index%2!=0?false:true)" v-for="(item, index) in _list" :key="item.id">
        <p slot="title">标题：{{item.title}}</p>
        <router-link :to="{ path: '/home/details/'+item.id+'', params: { id: item.id },query:{name:currentName}}" class="a-block">
        <Row>
          <Col span="2" >
            <img v-on:click.stop="open(getImg(item.number))" class="user-icon" v-bind:src="getImg(item.number)" >
          </Col>
          <Col span="18">
            概要：{{item.content}}
          </Col>
          <Col span="2" offset="1">
           <i-circle :percent="item.percent" :stroke-width="3" :trail-width="3" :size="60" :stroke-color="color(item.percent)">
              <Icon v-if="item.percent == 100" type="ios-checkmark-empty" size="40" style="color:#5cb85c"></Icon>
              <span v-else >{{item.percent}}%</span>
          </i-circle>
          </Col>
      </Row>
      </router-link>
    </Card>
     </section>
     <h1 v-else>请求出错</h1>
     <Modal
        title="图片预览哦"
        v-model="modal"
        class-name="vertical-center-modal">
        <p><img class="preview-img" v-bind:src="previewUrl" ></p>
    </Modal>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'list-view',
  computed:{
    ...mapGetters({
      _list: '_list'
    }),
  } ,
  methods:{
    ...mapActions({
        list:'list', 
    }),
    color(percent) {
        let color = '#2db7f5';
        if (percent == 100) {
            color = '#5cb85c';
        }
        return color;
    },
    getImg(number){
      return require('./images/a'+number+'.jpg');
    },
    open(url){
      event.preventDefault();
      this.previewUrl = url;
      this.modal=true;
      return false;
    }
  } ,
  data(){
    let {name} = this.$route.query;
    return {
      modal:false,
      previewUrl:"",
      currentName : name
    }
  },
  asyncData ({ store, route: { query: { name }}}) {
    /*
    * @ 初始服务端、客户端 调用该方法
    */
    // console.log("初始服务端、客户端",this.$store)
    let {userToken} = store.state.cookies;
    return store.dispatch('list', { name,userToken });

  },

}
</script>

<style lang="scss">
  @import "./List.scss";

</style>
