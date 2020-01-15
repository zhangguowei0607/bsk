import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import core from "./core";
import vueWechatTitle from "vue-wechat-title";
import "lib-flexible/flexible.js";
import "font-awesome/css/font-awesome.css";
import mixins from "@/mixins";
Vue.mixin(mixins);
Vue.use(vueWechatTitle);
//use 传入一个函数并执行,并传入Vue原型
Vue.use(core);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
