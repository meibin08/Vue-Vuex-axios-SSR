<template>
  <div  class="app-banner">
    <Carousel 
    autoplay 
    :height="300"
    :arrow="'never'">
        <Carousel-item >
            <div class="demo-carousel">
              <img src="./images/img01.png" alt="">
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel"><img src="./images/img02.png" alt=""></div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel c3"><img src="http://img3.job1001.com/zhuanti/android/images/zsj/banner3.png" alt=""></div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel c4"><img src="http://img3.job1001.com/zhuanti/android/images/zsj/banner1.png" alt=""></div>
        </Carousel-item>
    </Carousel>
  </div>
</template>

<style lang="scss" >
  @import './Banner.scss';

</style>