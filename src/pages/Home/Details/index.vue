<template>
  <div class="list main">
    <section v-if="_details&&Object.keys(_details).length">
      <Alert>
        <p>作者：<strong class="name">{{currentName}}</strong>老师 </p>
        <p>发表时间：{{_details.date}} </p>
      </Alert>

      <Card :bordered="true" >
          <p slot="title"><span class="label">文章标题：</span>{{_details.title}}</p>
          <section>
            {{_details.content}}
          </section>
      </Card>
     </section>
     <h1 v-else>请求出错</h1>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'detail-view',
  computed:{
    ...mapGetters({
      _details: '_details'
    }),
  } ,
  methods:{
    ...mapActions({
        details:'details', 
    })
  } ,
  data(){
    let {name} = this.$route.query;
    return {
      currentName : name
    }
  },
  asyncData ({ store, route: { params: { id }}}) {
    /*
    * @ 初始服务端、客户端 调用该方法
    */
    let {userToken} = store.state.cookies;
    
    return store.dispatch('details', { id, userToken});

  },

}
</script>

<style lang="scss">
  @import "./Details.scss";

</style>
