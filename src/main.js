import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png'),
})
Vue.use(VueLazyload)


fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
