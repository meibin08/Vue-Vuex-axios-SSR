<template>
  <div id="app" class="app-content">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="scss" >
  @import './App.scss';

</style>