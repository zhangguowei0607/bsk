<template>
    <div id="class">
        <!-- 标题栏 -->
        <ul class="title">
            <li @click="selcTab(true)" :class="{ active:!bool }">自营</li>
            <li @click="selcTab(false)" :class="{ active:bool }">贝式严选</li>
        </ul>
        <!-- 分类 -->
        <div class="class">
            <ul>
                <li v-for="(item, index) in list" :key="index" @click="selecGoods(index)">
                    <div>{{ item.title }}</div>
                    <div class="class_box" v-show="bool1 === index">&nbsp;</div>
                </li>
            </ul>
        </div>
        <!-- 列表 -->
        <ul class="list">
            <li v-for="(item, index) in goodsList" :key="index" class="list_shop">
                <img :src="item.ImgUrl" class="shopImg" @click="toPath(item)" />
                <div class="shopName">
                    <p>{{ item.Name | ellipsis(10) }}</p>
                </div>
                <div class="shopText">
                    <p>{{ item.Means | ellipsis(10) }}</p>
                </div>
                <div class="shopPrice">
                    <span>{{ '￥' + item.CurrentPrice | joint }}</span>
                    <span>{{ ' / ' + item.LabelText | ellipsis(13) }}</span>
                    <img src="https://res.bestcake.com\m-images-2\list-cart.png" class="cartImg" @click="add(item)" />
                </div>
            </li>
        </ul>
        <!-- 温馨提示 -->
        <div class="hint1">
            <div>划线价格</div>
            <div>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
        </div>
        <div class="hint2">
            <div>未划线价格</div>
            <div>商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
        </div>
        <!-- 底部空白 -->
        <div class="footer"></div>
        <!-- class页面遮罩层 -->
        <div>
            <van-overlay :show="markBool" z-index="10000">
                <div class="wrapper" @click.stop>
                    <div class="block">
                        <p>正在获取产品数据,请稍等~</p>
                    </div>
                </div>
            </van-overlay>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
    data() {
        return {
            // 将四个分类存放到数组里
            cakeList: [
                { title: "女神", mark: "NS", list: [] },
                { title: "经典", mark: "KSK", list: [] },
                { title: "伴手礼", mark: "JZ", list: [] },
                { title: "乳品", mark: "RP", list: [] }
            ],
            list: [], // 用于存放分类数据
            goodsList: [], // 用于存放列表商品数据
            bool: true, // 顶部导航显隐效果
            bool1: 0, // 分类显隐效果
            markBool: true // 遮罩层显隐效果
        };
    },
    mounted() {
        this.$apis.getClassData().then(res => {
            var list = res.data.Tag.cakelist;
            // console.log(list);
            this.cakeList.map(item => {
                list.map(value => {
                    if (value.SupplyNo.indexOf(item.mark) !== -1) {
                        item.list.push(value);
                    }
                });
            });
            this.selcTab(true);
        });
        setTimeout(() => {
            this.markBool = false;
        }, 1000);
        // 解决路由传参跳转不在头部问题！！
        this.$router.afterEach(() => {
            window.scrollTo(0, 0);
        });
    },
    methods: {
        // 顶部导航栏点击
        selcTab(bool) {
            this.bool = bool;
            if (bool) {
                this.list = this.cakeList.slice(0, 3);
                this.selecGoods(0);
                // this.goodsList = this.list[0];
                this.bool = !this.bool;
            } else {
                this.list = this.cakeList.slice(3);
                this.selecGoods(0);
                // this.goodsList = this.list[0];
                this.bool = !this.bool;
            }
            // console.log(this.list);
        },
        // 列表商品跳转详情页点击
        toPath(item) {
            // console.log(item);
            // 路由跳转用router,获取参数用route
            this.$router.push({
                path: "/show",
                query: { Name: item.Name, SupplyNo: item.SupplyNo }
            });
        },
        // 分类点击
        selecGoods(index) {
            this.bool1 = index;
            this.goodsList = this.list[index].list;
            // console.log(this.goodsList);
            this.goodsList.map(item => {
                item.ImgUrl = this.setImgUrl(item);
            });
        },
        // 购买点击  将数据传入vuex
        add(item) {
            // console.log(item);
            var temp = {
                id: item.ID,
                ImgUrl: item.ImgUrl,
                name: item.Name,
                size: item.LabelText,
                CurrentPrice: item.CurrentPrice,
                num: 1,
                bool: true
            };
            this.$store.commit("add", temp);
            Toast.success("添加购物车成功！");
        }
    }
};
</script>

<style scoped lang="scss">
#class {
    .title {
        height: 46px;
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        li {
            float: left;
            height: 46px;
            font-size: 14px;
            line-height: 46px;
            width: 50%;
            text-align: center;
            border-bottom: 2px solid transparent; // #1db0b8
        }
        .active {
            border-bottom: 2px solid #1db0b8;
            color: #1db0b8;
        }
    }
    .class {
        width: 100%;
        height: 22px;
        margin: 28px 0 4px 0;
        text-align: center;
        ul {
            position: relative;
            width: auto;
            display: inline-block !important;
            li {
                font-size: 14px;
                float: left;
                margin: 0 20px;
            }
            .class_box {
                position: absolute;
                bottom: -4px;
                width: 30px;
                height: 5px;
                background: linear-gradient(to right, #95d5d8, #1fb1b9);
            }
        }
    }
    .list {
        width: 96.8%;
        margin: 0 auto;
        overflow: hidden;
        .list_shop {
            float: left;
            width: 47.4%;
            height: 232px;
            margin-bottom: 20px;
            .shopImg {
                width: 165px;
                height: 165px;
            }
            .shopName {
                height: 18px;
                padding-left: 5px;
                p {
                    font-size: 14px;
                    line-height: 18px;
                    margin: 0 0;
                    color: #333333;
                }
            }
            .shopText {
                height: 16px;
                padding-left: 5px;
                p {
                    font-size: 12px;
                    line-height: 16px;
                    margin: 0 0;
                    color: #999999;
                }
            }
            .shopPrice {
                height: 25px;
                line-height: 25px;
                span:nth-of-type(1) {
                    color: #ff3384;
                    font-size: 14px;
                    float: left;
                }
                span:nth-of-type(2) {
                    color: #bcbcbc;
                    font-size: 10px;
                    float: left;
                }
                .cartImg {
                    width: 20px;
                    height: 20px;
                    float: right;
                }
            }
        }
        .list_shop:nth-of-type(2n + 1) {
            margin-right: 4%;
        }
    }
    .hint1 {
        width: 92%;
        height: 67px;
        padding: 15px 15px 15px 15px;
        background: #eeeeee;
        div:nth-of-type(1) {
            width: 30%;
            height: 22px;
            float: left;
            line-height: 22px;
            font-size: 14px;
            color: #181818;
        }
        div:nth-of-type(2) {
            width: 70%;
            height: 67px;
            float: left;
            line-height: 22px;
            font-size: 14px;
            color: #a2a2a2;
        }
    }
    .hint2 {
        width: 92%;
        height: 90px;
        padding: 0 15px 15px 15px;
        background: #eeeeee;
        div:nth-of-type(1) {
            width: 30%;
            height: 22px;
            float: left;
            line-height: 22px;
            font-size: 14px;
            color: #181818;
        }
        div:nth-of-type(2) {
            width: 70%;
            height: 67px;
            float: left;
            line-height: 22px;
            font-size: 14px;
            color: #a2a2a2;
        }
    }
    .footer {
        height: 50px;
    }
    .wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .block {
        width: 240px;
        height: 90px;
        background-color: #fff;
        margin: 200px auto;
        text-align: center;
        p {
            line-height: 90px;
            font-size: 14px;
        }
    }
}
</style>
