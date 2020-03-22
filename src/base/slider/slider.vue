<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"
                  :key="index"></span>
        </div>
    </div>
</template>

<script>
    import {addClass} from "@/common/js/dom";
    import BScroll from 'better-scroll'

    export default {
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 2000
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this._setSliderWidth();
                this._initDots();
                this._initSlider();
                if(this.autoPlay){
                    this._play()
                }
            })

            // setTimeout(() => {
            //     this._setSliderWidth();
            //     this._initDots();
            //     this._initSlider();
            //     if(this.autoPlay){
            //         this._play()
            //     };
            // }, 200)
            //当移动端视口大小变化的时候，轮播图会出错，这里监听视口！
            window.addEventListener('resize',()=>{
                if(!this.slider){//没有初始化，计算框框的宽度
                    return;//直接返回
                }
                this._setSliderWidth(true);//重新计算框的大小！
                this.slider.refresh()//重新初始化
            })
        },
        methods: {
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children
                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slider-item')
                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                if (this.loop && !isResize) {
                    //第一次克隆数+2,后面视口改变的时候不加了
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: true,
                        threshold: 0.3,
                        speed: 400
                    },
                    // bounce: false,
                    // stopPropagation: true,
                    // click: this.click
                })
                this.slider.on('scrollEnd', () => {
                    //当前的索引
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    // if (this.loop) {//如果循环索引-1，克隆多了2个，版本升级后不需要了
                    //     pageIndex -= 1
                    // }
                    this.currentPageIndex = pageIndex;
                    if (this.autoPlay){
                        //清除定时器，防止自动轮播的过程中，用户触碰影响
                        clearTimeout(this.timeId);
                        this._play()
                    }
                })
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _play(){
                this.timeId = setTimeout(()=>{
                    this.slider.next();//自动轮播！
                },this.interval)
            }
        },
    }
</script>
<style lang="stylus">
    @import "~@/common/stylus/variable"
    .slider
        min-height: 1px
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%

        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0

            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l

                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>
