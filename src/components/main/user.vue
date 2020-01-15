<template>
    <div id="user">
        <!-- 用户信息 -->
        <div class="user_title">
            <div class="user_img" @click="toPath()">
                <img :src="userInfo.ImgUrl" />
            </div>
            <div class="user_uname">{{ userInfo.uname }}</div>
            <div class="user_data">
                <van-row class="row">
                    <van-col span="6" class="col">
                        <p>余额</p>
                        <span>0.00</span>
                    </van-col>
                    <van-col span="6" class="col">
                        <p>吉致币</p>
                        <span>0</span>
                    </van-col>
                    <van-col span="6" class="col">
                        <p>优惠卷</p>
                        <span>0</span>
                    </van-col>
                    <van-col span="6" class="col">
                        <p>兑换卷</p>
                        <span>0</span>
                    </van-col>
                </van-row>
            </div>
        </div>
        <!-- 订单详情 -->
        <div class="user_text">
            <div class="user_order">
                <img src="https://res.bestcake.com\m-images\order\mw-person-dd.png" />
                <span>我的订单</span>
                <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" />
            </div>
            <div class="user_address">
                <img src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg" />
                <span>收获地址</span>
                <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" />
            </div>
        </div>
        <!-- 服务热线 -->
        <div class="user_service">
            <p>客服热线：400-627-5757</p>
        </div>
    </div>
</template>

<script>
// import Cookie from "js-cookie";
import Store from "store";
export default {
    data() {
        return {};
    },
    beforeMount() {
        // 从本地cookie获取userInfo
        if (Store.get("userInfo")) {
            // 如果本地cookie有数据   将数据解析成json对象后 存入userInfo
            // --------------------------------------------------------------
            // 报错 Error in beforeMount hook: "SyntaxError: Unexpected token o in JSON at position 1"
            // RN解析数据时报错，原因是返回的数据已经是object格式，无需再使用var result = JSON.parse(data.data); 进行转换
            // var userInfo = JSON.parse(Store.get("userInfo"));
            // -------------------------------------------------------------
            var userInfo = Store.get("userInfo");
            // 再将数据存入vuex
            this.$store.commit("saveUserData", userInfo);
        } else {
            // 如果本地cookie没有数据则执行login遮罩层显示
            this.$eventBus.$emit("showLogin", true);
        }
    },
    methods: {
        toPath() {
            this.$router.push({
                path: "/userinfo"
            });
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    }
};
</script>

<style scoped lang="scss">
#user {
    .user_title {
        width: 100%;
        height: 220px;
        overflow: hidden;
        .user_img {
            margin-top: 25px;
            width: 100%;
            height: 80px;
            text-align: center;
            img {
                width: 80px;
                height: 80px;
                border-radius: 40px;
                border: 1px solid #999;
            }
        }
        .user_uname {
            margin-top: 5px;
            line-height: 20px;
            height: 20px;
            text-align: center;
            font-size: 12px;
        }
        .user_data {
            width: 100%;
            height: 40px;
            margin-top: 32px;
            margin-bottom: 15px;
            .row {
                .col {
                    text-align: center;
                    p {
                        text-align: center;
                        height: 14px;
                        line-height: 14px;
                        font-size: 12px;
                        margin: 0;
                        color: #999;
                    }
                    span {
                        margin-top: 7px;
                        height: 20px;
                        line-height: 20px;
                        display: block;
                        font-size: 16px;
                    }
                }
            }
        }
    }
    .user_text {
        width: 100%;
        height: 110px;
        border-top: 15px solid #eeeeee;
        .user_order {
            width: 96%;
            height: 55px;
            margin-left: 4%;
            border-bottom: 1px solid #eeeeee;
            img:first-child {
                width: 15px;
                height: 21px;
                margin-top: 16px;
                float: left;
            }
            span {
                width: 64px;
                height: 25px;
                float: left;
                line-height: 25px;
                font-size: 14px;
                margin: 15px 0;
                margin-left: 10px;
            }
            img:last-child {
                float: right;
                width: 9px;
                height: 15px;
                margin-top: 20px;
                margin-right: 15px;
            }
        }
        .user_address {
            width: 96%;
            height: 55px;
            margin-left: 4%;
            border-bottom: 1px solid #eeeeee;
            img:first-child {
                width: 15px;
                height: 21px;
                margin-top: 16px;
                float: left;
            }
            span {
                width: 64px;
                height: 25px;
                float: left;
                line-height: 25px;
                font-size: 14px;
                margin: 15px 0;
                margin-left: 10px;
            }
            img:last-child {
                float: right;
                width: 9px;
                height: 15px;
                margin-top: 20px;
                margin-right: 15px;
            }
        }
    }
    .user_service {
        width: 100%;
        height: 14px;
        padding-top: 135px;
        text-align: center;
        p {
            height: 14px;
            font-size: 12px;
            line-height: 14px;
        }
    }
}
</style>
