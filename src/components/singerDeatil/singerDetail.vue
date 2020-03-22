<template>
    <!--    <music-list></music-list>-->
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script>
    // import musicList from "../musicList/musicList"
    import {mapGetters} from 'vuex'
    // import {getSingerDetail} from '../../api/singer'
    import axios from "axios";
    export default {
        data() {
            return {}
        },
        components: {},
        methods: {
            _getDetail(mid){
                    axios.get("/users/singerDetail", {
                        params: {
                            cid:205360581,
                            g_tk_new_20200303:5381,
                            g_tk:5381,
                            loginUin:0,
                            hostUin:0,
                            format:"json",
                            inCharset:"utf8",
                            outCharset:"utf8",
                            notice:0,
                            platform:"yqq.json",
                            needNewCode:0,
                            singermid:mid,
                            order:"time",
                            begin:0,
                            num:30,
                            cmd:1
                        }
                    }).then((response) => {
                        // let res = response.data.singerList;
                        // let list = res.data.singerlist;
                        // this.singers = this._normalizeSinger(list);
                        console.log(   response.data  )
                    })

                }
        },
        computed:{
            ...mapGetters(['singer'])
        },
        created() {
            this._getDetail(this.singer.mid)
        }

    }
</script>

<style lang="stylus">
    .singer-detail
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0
        z-index: 100
        background-color: rgba(0, 0, 0, 1)

    .slide-enter-active, .slide-leave-active
        transition: all 0.3s ease

    .slide-enter
        transform: translate3d(100%, 0, 0)
    .slide-leave-to
        transform: translate3d(100%, 0, 0)

</style>