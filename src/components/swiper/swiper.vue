<template>
    <div class="swiper-container my">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>

        <div class="swiper-pagination"></div>

    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="css">
    @import "../../../node_modules/swiper/css/swiper.css";
</style>
