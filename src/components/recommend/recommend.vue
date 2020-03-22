<template>
    <div class="recommend">
        <scroll class="recommend-content" :data="discList" ref="scroll">
            <div >
            <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                <Slider>
                    <div v-for="(item,index) in recommends" :key="index">
                        <a href="">
                            <img :src="'http://localhost:3000/'+item.Image" alt="" @load="loadImage">
                        </a>
                    </div>
                </Slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li  v-for="(item,index) in discList" class="item" :key="index">
                        <div class="icon">
                            <img width="60" height="60" v-lazy="item.picurl">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.singername"></h2>
                            <p class="desc" v-html="item.mvdesc"></p>
                        </div>
                    </li>
                </ul>
            </div>
            </div>

        </scroll>

        <div class="loading-container" id="loading" v-show="!discList.length">
            <loading :tll="data" ref="load"></loading>
        </div>



    </div>
</template>

<script>
    import axios from 'axios'
    // import Myswiper from '../swiper/swiper'
    // import Swiper from "swiper"
    import Slider from "@/base/slider/slider";
    import Scroll from "@/base/scroll/scroll";
    import Loading from "@/base/loading/loading";
    export default {
        data() {
            return {
                recommends: [],
                discList:[],
                confirm:0,
                data:"正在加载..."
            }
        },
        components: {
            Slider,
            Scroll,
            Loading,
        },
        mounted() {
            this.init();
            setTimeout(()=>{
                this.getDiscList();
            },500)
            //  this.swiper()
        },
        methods: {

            init() {
                axios.get('/users/pic').then(response => {
                    var res = response.data.result;
                    this.recommends = res;
                    //console.log(res)
                })

            },
            // swiper(){
            //     new Swiper ('.my', {
            //         loop: true, // 循环模式选项
            //         // 如果需要分页器
            //         pagination: {
            //             el: '.swiper-pagination',
            //         },
            //         observer:true,
            //         observeParents:true
            //     })
            // }
            //https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
            getDiscList(){
                axios.get('/users/getDiscList',{
                    params:{
                        g_tk: 5381,
                        loginUin:0,
                        hostUin:0,
                        format:'json',
                        inCharset: 'utf8',
                        outCharset: 'GB2312',
                        notice: 0,
                        platform:'yqq.json',
                        needNewCode:0,
                        cmd:'shoubo',
                        lan:'all'
                    }
                }).then(response=>{
                    let res = response.data;
                    this.discList=res.data.mvlist;
                    //console.log(res.data)
                })
            },
            loadImage() {
                this.confirm++;
                if (this.confirm>1){
                    return
                }
                this.$refs.scroll.refresh()

                // if (!this.checkloaded) {
                //     console.log(this.checkloaded)
                //     this.checkloaded = true
                //     this.$refs.scroll.refresh()
                //     console.log(this)
                // }
                //
            },
        }
    }
</script>
<style lang="stylus">
    @import "~@/common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
        .loading-container
                position: absolute
                width: 100%
                top: 70%
                transform: translateY(-50%)
</style>
