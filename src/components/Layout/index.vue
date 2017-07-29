<template>
  <div class="layout">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="/static/logo-48.png" alt="logo">
        </router-link>
        <router-link to="/login">登录页</router-link>
        <router-link to="/details">详情页</router-link>
        <router-link to="/noFound">错误404页</router-link>
        <a class="github" href="https://github.com/meibin08" target="_blank" title="GitHub" rel="noopener">
          <Icon type="social-github" size="26" color="#fff"></Icon>
        </a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <Alert show-icon class="main">
        <h3>该项目示例说明：</h3>
        <template slot="desc">
          <p>1、该示例由官方 vue-hackernews-2.0 示例根据公司实际项目需要进行优化改进过，非原创，</p>
          <p>2、实现的功能点列表：</p>
          <p>&#12288;1)、项目目录结构进行了变更，让整个项目分类看起来更一目了然，</p>
          <p>&#12288;2)、处理了500、404等页面的跳转逻辑，</p>
          <p>&#12288;3)、融入了axios，进行多队列请求、单个请求的回调封装逻辑处理</p>
          <p>&#12288;4)、引入了scss的支持，页面title的修改优化，无需在每个组件内部设置，直接在路由配置页配置添加即可，</p>
          <p>&#12288;5)、路由划分为按功能模块分类，便于维护</p>
          <p>&#12288;6)、store的维护，变更，不同模块写在不同文件内，分开处理</p>
          <p>&#12288;7)、引入了mock.js数据……</p>
          <p>&#12288;8)、其他还有很多细节，有兴趣的同学自己去慢慢发现吧……</p>
          <p>3、如果觉得该示例不错，对您有一定的帮助，记得帮 <span class="red">star、star、star</span> 哦 ^_^ ^_^ ^_^ ^_^~~</p>
          <br>
          <h6>想了解更多吗？<strong><a href="https://github.com/meibin08">请猛戳我吧！</a></strong></h6>
        </template>
    </Alert>
  </div>
</template>

<style lang="scss" >
  @import './Layout.scss';

</style>