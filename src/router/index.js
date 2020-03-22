import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer';
import Search from '../components/search/search';
import Rank from '../components/rank/rank';
import SingerDeatil from '../components/singerDeatil/singerDetail'

const routes = [
  {path:"/",redirect:'/recommend'},
  {path: "/recommend",component:Recommend},
  {path:"/singer",component:Singer,children:[
      {path:":id",component:SingerDeatil}
    ]},
  {path:"/search",component:Search},
  {path:"/rank",component:Rank}
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
