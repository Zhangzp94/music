<template>
    <div class="singer">
        <list-view :data="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from "axios"
    import Singer from "../../common/js/singer.js"
    import pinyin from "pinyin"
    import listView from "../listview/listview";
    import {mapMutations} from "vuex"
    const HOT_SINGER_LEN = 10
    const HOT_NAME = '热门'
    export default {
        data() {
            return {
                singers: []
            }
        },
        mounted() {
            this._getSingerList();
        },
        components: {
            listView
        },
        methods: {
            ...mapMutations(['SET_SINGER']),
            selectSinger(item){
               // this.$router.push({path:`/singer/${item.mid}`})
                this.$router.push({path:`/singer/${item.mid}`}).catch((err)=>{
                    console.log(err)
                })
                this.SET_SINGER(item)
            },
            _getSingerList() {
                axios.get("/users/singerList", {
                    params: {
                        "-": "getUCGI7517068112739937",
                        g_tk: 5381,
                        loginUin: 0,
                        hostUin: 0,
                        format: "json",
                        inCharset: 'utf8',
                        outCharset: 'utf-8',
                        notice: '0',
                        platform: "yqq.json",
                        needNewCode: 0,
                        data: "{\"comm\":{\"ct\":24,\"cv\":0},\"singerList\":{\"module\":\"Music.SingerListServer\",\"method\":\"get_singer_list\",\"param\":{\"area\":200,\"sex\":-100,\"genre\":-100,\"index\":-100,\"sin\":0,\"cur_page\":1}}}"
                    }
                }).then((response) => {
                    let res = response.data.singerList;
                    let list = res.data.singerlist;
                    this.singers = this._normalizeSinger(list);
                    // console.log(this._normalizeSinger(list))
                    //console.log(this._normalizeSinger(res))
                })
                //console.log(pinyin('张 SS')[0].toString().substring(0,1).toLocaleUpperCase())
            },
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                //把歌手列表传入到数组中
                for (var i = 0; i < list.length; i++) {
                    let item = list[i];
                    //热门
                    if (i <= HOT_SINGER_LEN) {
                        //这里用的面向对象，items里面就是[{},{},{}]的形式！
                        map.hot.items.push(new Singer({
                            mid: item.singer_mid,
                            name: item.singer_name
                        }))
                    }
                    //这里根据item.singer_name的中文名字，转为英文字母，方便后面排序
                    //使用插件：https://github.com/hotoo/pinyin
                    //npm install pinyin
                    const key = pinyin(item.singer_name)[0].toString().substring(0, 1).toLocaleUpperCase()
                    if (key == "À") {
                        map["A"] = {
                            title: "A",
                            items: []
                        }
                        map["A"].items.push(new Singer({
                            mid: item.singer_mid,
                            name: item.singer_name
                        }))
                        continue;
                    }
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        mid: item.singer_mid,
                        name: item.singer_name
                    }))
                }
                // list.forEach((item,index)=>{
                //     //热门
                //     if (index<=HOT_NAME){
                //         //这里用的面向对象，items里面就是[{},{},{}]的形式！
                //         map.hot.items.push(new Singer({
                //             mid:item.singer_mid,
                //             name:item.singer_name
                //         }))
                //     }
                //     //这里根据item.singer_name的中文名字，转为英文字母，方便后面排序
                //     //使用插件：https://github.com/hotoo/pinyin
                //     //npm install pinyin
                //     const key = pinyin(item.singer_name)[0].toString().substring(0,1).toLocaleUpperCase()
                //     if (!map[key]){
                //         console.log(1)
                //         map[key]={
                //             title: key,
                //             items: []
                //         }
                //     }
                //     map[key].items.push(new Singer({
                //         mid:item.singer_mid,
                //         name:item.singer_name
                //     }))
                // });
                //进行有序的排序 map里面的键如果是字母存放在ret中，如果不是存放在hot
                //1.分离hot 和 ret，map是对象，map.A map.B... 这里是把map里面的所有项
                //拿出来排序，ret里面是 [{title:'',item:''},{}...]
                let ret = [], hot = [];
                for (let key in map) {
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if (val.title == HOT_NAME) {
                        hot.push(val)
                    }
                }
                //排序ret
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                //合并
                return hot.concat(ret);
            },
        },
    }
</script>
<style lang="stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
