<template>
    <div id="tabbar">
        <!-- 登录页 -->
        <transition enter-active-class="bounceInLeft" leave-active-class="bounceOutLeft">
            <login v-show="bool" class="animated"></login>
        </transition>
        <!-- 底部导航栏 -->
        <div>
            <Tabbar v-model="active" @change="setToPath" :z-index="999" v-show="currentPath !== '/show'">
                <!-- <TabbarItem icon="home-o">标签</TabbarItem> -->
                <TabbarItem :icon="item.ico" v-for="(item, index) in list" :key="index" :info="index === 2 ? sumNum : ''">
                    {{ item.title }}
                </TabbarItem>
            </Tabbar>
        </div>
        <!-- 电视机 -->
        <keep-alive>
            <!-- 被keep-alive包裹的组件生命周期不执行 -->
            <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.name"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.name"></router-view>
    </div>
</template>
<script>
import login from "@/components/main/login"; // 创建自定义组件
import "animate.css";
export default {
    data() {
        return {
            active: 0,
            list: [
                { title: "首页", path: "/index", ico: "home-o" },
                { title: "分类", path: "/class", ico: "search" },
                { title: "购物车", path: "/cart", ico: "shopping-cart" },
                { title: "用户", path: "/user", ico: "friends-o" }
            ],
            bool: false
        };
    },
    beforeMount() {
        this.$eventBus.$on("showLogin", bool => {
            this.bool = bool;
        });
    },
    computed: {
        // computed 初始化会监听  watch 初始化不会监听
        currentPath() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.active = this.list.findIndex(item => {
                return item.path === this.$route.path; // 返回达成条件的索引
            });
            return this.$route.path;
        },
        // eslint-disable-next-line vue/return-in-computed-property
        // 购物车数量角标
        sumNum() {
            var num = 0;
            this.$store.state.cartList.map(item => {
                num += item.num;
            });
            if (num === 0) {
                num = "";
            }
            return num;
        }
    },
    methods: {
        setToPath(active) {
            // console.log(active);
            this.active = active;
            this.$router.push(this.list[this.active].path);
        }
    },
    components: {
        login // 引用自定义组件
    }
};
</script>

<style scoped lang="scss">
// /deep/ .van-tabbar-item__icon {
//     .van-info:last-child {
//         display: none;
//     }
// }
</style>
