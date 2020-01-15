<template>
    <div class="swiper-container" :id="id" :style="this.config.style || {}">
        <div class="swiper-wrapper">
            <!-- <div class="swiper-slide swiper-slide1" mark="0">Slide 1</div> -->
            <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
    props: ["config", "id"],
    mounted() {
        new Swiper("#" + this.id, this.config || {});
    }
};
</script>
