<template>
    <div class="userinfo">
        <NavBar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="touxiang">
            <div class="tou">头像</div>
            <div class="img1">
                <img :src="$store.state.userInfo.ImgUrl" alt />
            </div>
        </div>
        <Cell title="昵称" is-link :value="$store.state.userInfo.name" />
        <Cell title="真实姓名" is-link value="未设置" />
        <Cell title="性别" is-link value="男" />
        <Cell title="手机号" is-link value="139****4181" />
        <Cell title="修改密码" is-link />

        <Button type="primary" block color="red" @click="exitlogin">退出登录</Button>
    </div>
</template>

<script>
import { Cell } from "vant";
import { Button } from "vant";
import { NavBar } from "vant";

// import Cookie from "js-cookie";
import Store from "store";
import { Dialog } from "vant";

export default {
    components: {
        Cell,
        Button,
        NavBar
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        exitlogin() {
            Dialog.confirm({
                title: "提示",
                message: "确认退出登录吗？"
            })
                .then(() => {
                    Store.remove("userInfo");
                    this.$router.go(-1);
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.touxiang {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 16px;
    margin-bottom: 6px;
    .tou {
        font-size: 14px;
        color: #323233;
        height: 56px;
        line-height: 56px;
    }
    .img1 {
        width: 66px;
        height: 66px;
        margin: 0 auto;
        background-color: green;
        border-radius: 50%;
        margin-right: 18px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
