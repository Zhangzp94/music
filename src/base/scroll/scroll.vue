<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        data() {
            return {}
        },
        props: {
            probeType: {
                type: Number,
                default: 3
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
        },
        mounted() {
            this.$nextTick(() => {
                this._initScroll()

            })
            // setTimeout(()=>{
            // },100)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                //初始化scroll
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                if (this.listenScroll){
                    let me = this
                    this.scroll.on("scroll",(pos)=>{//pos.Y 是滑动值 向下是 负的
                        me.$emit("scroll",pos)
                    })
                }
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo(){
                this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
            },
            scrollToElement(){
                this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
            },
        },
        watch: {
            data() {//监听data的变化！
                this.$nextTick(()=>{
                    this.refresh()
                })
                // setTimeout(() => {
                // }, 50)
            }
        }
    }
</script>
<style lang="scss">

</style>
