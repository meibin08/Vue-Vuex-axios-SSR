
/*
 * @authors :Bin Mei
 * @date    :2017-07-20
 * @description：pc官网 -> bridge 设置标题
 */



function getTitle (vm) {

  const { meta } = (vm&&vm.$route&&vm.$route||{});
  const title = meta&&meta.title;
  return title;
  /*console.log()
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }*/
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      //this.$ssrContext.title = `Vue HN 2.0 | ${title}`
    }
  }
}
/*设置页面title*/
export const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = title||"vue服务端渲染示例";
    }
  }
};

/*
  控制每个页面进入的权限、及页面的title设置
  @requireAuth  页面是否需要登录进入
  @title 当前页面的title;
*/
export const Bridges=(title,auth)=>{
  return {
    meta:{
      requireAuth: auth||false,
      title:title||"vue服务端渲染示例"
    }
  };
}
    
