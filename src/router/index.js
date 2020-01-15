import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"), // router-view
        children: [
            {
                path: "index",
                name: "index",
                component: () => import("../components/main/index"),
                meta: {
                    //路由标记,可以配置自定义属性
                    name: "首页"
                }
            },
            {
                path: "class",
                name: "class",
                component: () => import("../components/main/class"),
                meta: {
                    //路由标记,可以配置自定义属性
                    name: "分类"
                }
            },
            {
                path: "cart",
                name: "cart",
                component: () => import("../components/main/cart"),
                meta: {
                    //路由标记,可以配置自定义属性
                    name: "购物车"
                }
            },
            {
                path: "user",
                name: "user",
                component: () => import("../components/main/user"),
                meta: {
                    //路由标记,可以配置自定义属性
                    name: "用户详情"
                }
            },
            {
                path: "show",
                name: "show",
                component: () => import("../components/main/show"),
                meta: {
                    //路由标记,可以配置自定义属性
                    name: "商品详情"
                }
            },
            {
                path: "userinfo",
                name: "userinfo",
                component: () => import("../components/main/userinfo"),
                meta: {
                    //路由标记,可以配置自定义属性
                    name: "个人信息"
                }
            }
        ],
        redirect: "/index"
    }
];

const router = new VueRouter({
    routes
});
export default router;
