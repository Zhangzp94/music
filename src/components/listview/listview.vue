<template>
    <scroll class="listview"
            :data="data"
            ref="listview"
            :listen-scroll="listenScroll"
            @scroll="scroll"
    >

        <ul class="base">
            <li class="list-group" v-for="(group,index) in data" :key="index" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul class="base">
                    <li v-for="(item,index) in group.items" :key="index" class="list-group-item"
                    @click="selectItem(item)"
                    >
                        <img v-lazy="item.avatar" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="list-shortcut"
             @touchstart.stop.prevent="onShortcutTouchStart"
             @touchmove.stop.prevent="onShortcutTouchMove"
        >
            <ul class="base">
                <li v-for="(item, index) in shortcutList" :data-index="index" class="item"
                    :key="index" id="liEle" :class="{'current':currentIndex===index}">{{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
    </scroll>
</template>

<script>
    import Scroll from "../../base/scroll/scroll";
    import {getData} from "../../common/js/dom";

    const ANCHOR_HEIGHT = 26
    /*
    * 右边侧边栏的渲染方法：
    * 拿到data数据，用map方法 把每个items的项遍历出来！
    *
    * 触碰英文数字的时候定位到对应的版块：
    * 可以用scroll的scrollToElement()方法！
    * 在此组件中调用scroll组件中的方法即可！
    * this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
    *
    * 2.如何 触碰侧边栏通过滑动去定位到对应的歌手列表？
    * touchStart事件中，先记录起始位置的index值，
    * 利用touchmove事件，记录第一次触碰和移动过程中的地方this.touch.y=e.touch[0].pageX，得到偏移量。
    * 2）定义一个常量为 每个字母的高度值，高度值是字体的大小+padding值，偏移量/常量=偏移的个数 | 0
    * 然后让开始的 Index+偏移的个数,这里注意获转换成数字再相加！
    *
    * 3.设置滚动位置的高亮显示！
    * 实时监听y轴滚动的位置，在scroll组件中，初始化的时候可以监听scroll事件，
    * */
    export default {
        props: {
            data: {
                type: Array,
                default: () => {
                    []
                }
            }
        },
        data() {
            return {
                // shortcutList:[]
                listenScroll:true,
                currentIndex:0,
                scrollY:-1
            }
        },
        created() {
            this.listHeight= []

            // this.listenScroll=true
        },
        components: {
            Scroll
        },
        computed: {
            //这里一定要放在计算属性里面，时刻计算，因为shortcutList数组内容是根据map改变而变得
            //所以map数据获取有延迟的时候，shortcutList也要跟随改变！
            shortcutList() {//把首字母截取出来
                return this.data.map((item) => {
                    return item.title.substr(0, 1)
                })
            },
            fixedTitle(){
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex]? this.data[this.currentIndex].title : ""
            }
        },
        mounted() {
            this.touch = {}
        },
        methods: {
            onShortcutTouchStart(e) {

                //获取要去的位置索引,返回的是值
                let anchorIndex = getData(e.target, "index")
                let firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;//第一次触碰的位置
                this.touch.anchorIndex = anchorIndex;//记录Index值
                //调用scroll的scrollToElement方法去

                this._scrollTo(anchorIndex)

            },
            _scrollTo(index) { //scrollToElement方法的封装
                if (!index && index !== 0) {//因为点击两边的时候index=null，加上 && index!=0是因为 判断的时候index=0也是false
                    return
                }
                if (index < 0) {//在向上滑的时候Index<0
                    index = 0
                }
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0];
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = delta + parseInt(this.touch.anchorIndex)
                this._scrollTo(anchorIndex)
            },
            /*
            * 需求：当上下滑动列表的时候怎么在右侧的字母栏高亮显示？左右联动
            * 1.在scroll组件中有scroll事件，滑动的时候当前组件获取scrollY值
            * 2.获取A B C ...歌手列表的高度并添加到数组中，相当于每个字母列表都有对应的
            * 高度。滑动的时候scrollY值去和数组中的项比较，然后得出在对应的位置
            * */
            scroll(pos) {
                this.scrollY = pos.y//拿到实时监听的滑动值
            },
            _calculateHeight() {
                //把列表的高度传进来
                let height = 0;
                for (var i = 0; i < this.$refs.listGroup.length; i++) {
                    let item = this.$refs.listGroup[i];//每个字母列表的高度
                    height += item.clientHeight;
                    this.listHeight.push(height)
                }
            },
            selectItem(item){
                this.$emit("select",item)
            }
        },
        watch: {
            data() {//监听数据的变化
                setTimeout( () =>{
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newY){//监听滑动的值
                if (newY>-20){//以为滑动到顶部的时候会>0
                    this.currentIndex = 0;
                    return
                }
                for (let i=0;i<this.listHeight.length-1;i++){
                   let height1 = this.listHeight[i]
                   let height2 = this.listHeight[i+1]
                   if(-newY>=height1 && -newY<height2){
                       this.currentIndex = i+1  ;
                   }else if (-newY>=height2){
                       this.currentIndex=this.listHeight.length-1
                   }
               }
                //滑动到底部的时候 index会大于this.listHeight.length的最大值 是scroll自带的
                //所以这里封死
                // if  (-newY>this.listHeight[this.listHeight.length-1]){
                //     this.currentIndex = this.listHeight.length-1
                // }
                // console.log( newY)


            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background

        .base
            margin: 0
            padding: 0
            list-style: none

        .list-group
            padding-bottom: 30px

            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: #fff
                background: $color-highlight-background

            .list-group-item
                display: flex
                align-items: flex-start
                padding: 20px 0 0 30px

                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%

                .name
                    margin-left: 20px
                    line-height: 50px
                    color: #fff
                    font-size: 20px

        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 50px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica

            .item
                padding: 3px
                padding-right 10px
                line-height: 1
                color: #fff
                font-size: 20px

            .current
                color: $color-theme

        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%

            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: #fff
                background: $color-highlight-background

        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>