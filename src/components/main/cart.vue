<template>
    <div id="cart">
        <!-- 购物车为空时显示 -->
        <div class="cartNull" v-show="this.$store.state.cartList.length === 0">购物车是空的哦~</div>
        <!-- 商品 -->
        <div class="cartShop">
            <div class="cartShopList" v-for="(item, index) in this.$store.state.cartList" :key="index">
                <div class="cartShopList_l">
                    <!-- <input type="checkbox" v-model="item.bool" /> -->
                    <van-checkbox v-model="item.bool" />
                </div>
                <div class="cartShopList_r">
                    <div class="cartShopList_r_pic">
                        <img :src="item.ImgUrl" />
                    </div>
                    <div class="cartShopList_r_data">
                        <h4>{{ item.name }}</h4>
                        <div class="data">
                            <div class="data_size">{{ item.size }}</div>
                            <div class="data_num">
                                <button @click="down(item, index)" :class="{ mark:item.num === 1 }">-</button>
                                <span>{{ item.num }}</span>
                                <button @click="up(item)">+</button>
                            </div>
                        </div>
                        <div class="price">{{ item.CurrentPrice * item.num + ".00" }}</div>
                    </div>
                </div>
                <div class="cartShopList_b">
                    <b>优惠方式</b>
                    不参与活动
                </div>
            </div>
        </div>
        <!-- 结算 -->
        <div class="cartTotal">
            <div class="cartTotal_a">
                <!-- <input type="checkbox" v-model="bool" @click="setBool" /> -->
                <van-checkbox v-model="bool" @click="setBool" />
                全选
            </div>
            <div class="cartTotal_b" @click="clear()">清空</div>
            <div class="cartTotal_c">
                合计：
                <b>{{ allPrice + ".00" }}</b>
            </div>
            <div class="cartTotal_d" @click="balance()">结算</div>
            <van-action-sheet v-model="show" class="van-action-sheet">
                <!-- @select="onSelect" -->
                <div class="actions_gb">
                    <!-- 关闭按钮 -->
                    <img src="https://res.bestcake.com/act/zf/order-close.png" @click="close()" />
                </div>
                <div class="actions_djs">
                    <!-- 倒计时 -->
                    <div class="actions_djs_box">
                        <span>支付剩余时间:</span>
                        <van-count-down class="actions_djs_time" :time="time" format="mm 分 ss 秒" />
                    </div>
                </div>
                <div class="actions_zj">
                    <!-- 总价 -->
                    ￥<span>{{ allPrice + ".00" }}</span>
                </div>
                <!-- 支付方式 -->
                <div class="actions" :class="{active:num === index}" v-for="(item, index) in this.$store.state.balanceList" :key="index" @click="click(item, index)">
                    <img :src="balanceImgUrl + item.name + '.png'" />
                    <span>{{ item.name }}</span>
                </div>
                <!-- 支付宝弹窗 -->
                <van-popup class="van-popup" v-model="showZ" closeable :round="showR" close-icon-position="top-right" position="bottom" :style="{ height: '82%' }">
                    <img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3746177607,1622111629&fm=111&gp=0.jpg" />
                    <p>推荐使用支付宝,安全又快捷!</p>
                </van-popup>
                <div class="actions_qrzf">
                    <!-- 确认支付 -->
                    <div class="actions_qrzf_box" @click="affirm()">确认支付</div>
                </div>
            </van-action-sheet>
        </div>
        <!-- 底部空白 -->
        <div class="footer"></div>
    </div>
</template>

<script>
import { Dialog } from "vant";
export default {
    data() {
        return {
            bool: false, // 全选框选中属性
            cartList: [], // 用于存放vuex中的数据
            allPrice: 0, // 总价
            show: false, // 结算页显隐
            time: 30 * 60 * 1000, // 倒计时时间bool
            balanceImgUrl: "https://res.bestcake.com/act/zf/", // 支付方式小图标
            num: -1,
            showZ: false,
            showR: true
        };
    },
    mounted() {
        // console.log(this.cartList);
    },
    methods: {
        // 数量减
        down(item, index) {
            if (item.num > 1) {
                item.num--;
            } else {
                Dialog.confirm({
                    title: "提示",
                    message: "确定要删除此款产品吗？"
                })
                    .then(() => {
                        this.$store.state.cartList.splice(index, 1);
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        // 数量加
        up(item) {
            item.num++;
        },
        // 全选框点击
        setBool() {
            this.$store.state.cartList.map(item => {
                item.bool = !this.bool;
            });
        },
        // 全部清除
        clear() {
            if (this.$store.state.cartList.length === 0) {
                Dialog.alert({
                    message: "您的购物车空空如也~"
                }).then(() => {
                    // on close
                });
            } else {
                Dialog.confirm({
                    title: "提示",
                    message: "确定要清空购物车吗？"
                })
                    .then(() => {
                        // 需要清除vuex里的数据
                        this.$store.state.cartList = [];
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        // 结算
        balance() {
            if (this.allPrice !== 0) {
                this.show = true;
            }
        },
        // 关闭按钮
        close() {
            this.show = false;
        },
        // 支付方式点击
        click(item, index) {
            this.num = index;
            this.$store.state.balanceList.map(itm => {
                itm.bool = false;
            });
            this.$store.state.balanceList[index].bool = true;
        },
        // 支付确认点击
        affirm() {
            // console.log(this.$store.state.balanceList);
            this.$store.state.balanceList.map(item => {
                if (item.name === "支付宝" && item.bool === true) {
                    this.showZ = true;
                } else if (item.name === "招商一网通" && item.bool === true) {
                    Dialog.alert({
                        message: "此支付通道正在维护,请选择其它支付方式~"
                    }).then(() => {
                        // on close
                    });
                } else if (item.name === "货到付款" && item.bool === true) {
                    Dialog.alert({
                        message: "请填写正确的收获地址~"
                    }).then(() => {
                        // on close
                    });
                } else if (item.name === "余额" && item.bool === true) {
                    Dialog.confirm({
                        message: "您的余额不足,是否需要充值?"
                    })
                        .then(() => {
                            // on confirm
                        })
                        .catch(() => {
                            // on cancel
                        });
                } else if (item.name === "吉致币支付" && item.bool === true) {
                    Dialog.confirm({
                        message: "您的吉致币不足,是否需要充值?"
                    })
                        .then(() => {
                            // on confirm
                        })
                        .catch(() => {
                            // on cancel
                        });
                }
            });
        }
    },
    beforeMount() {
        // 遍历vuex中的数组  将bool默认为true选中
        this.$store.state.cartList.map(item => {
            item.bool = true;
        });
        this.cartList = this.$store.state.cartList;
    },
    // computed: {
    //     allPrice() {
    //         var allPrice = 0;
    //         // console.log(this.cartList);
    //         var cartListLength = [];
    //         this.$store.state.cartList.map(item => {
    //             if (item.bool) {
    //                 allPrice += item.num * item.CurrentPrice;
    //                 cartListLength.push(item);
    //             }
    //         });
    //         // 全选框   BUG!!!
    //         if (this.cartList.length !== 0) {
    //             if (this.cartList.length === cartListLength.length) {
    //                 this.bool = true;
    //             } else {
    //                 this.bool = false;
    //             }
    //         }
    //         return allPrice;
    //     }
    // }
    watch: {
        // 新增属性会影响 watch 的监听
        cartList: {
            handler() {
                var allPrice = 0;
                var cartListLength = [];
                this.$store.state.cartList.map(item => {
                    if (item.bool) {
                        allPrice += item.num * item.CurrentPrice;
                        cartListLength.push(item);
                    }
                });
                // console.log(this.cartList);
                if (cartListLength.length === this.cartList.length) {
                    this.bool = true;
                } else {
                    this.bool = false;
                }
                if (this.cartList.length === 0) {
                    this.bool = false;
                }
                this.allPrice = allPrice;
            },
            deep: true
        }
    }
};
</script>

<style scoped lang="scss">
#cart {
    label {
        display: block;
        width: 19px;
        height: 19px;
        line-height: 19px;
        cursor: pointer;
        position: absolute;
        border: 1px solid #ccc; /*改变复选框的边框颜色也可以不要边框*/
        top: 6px;
        left: 6px;
        border-radius: 10px;
        margin-top: 11px;
        margin-left: 3px;
    }
    .cartNull {
        width: 100%;
        height: 60px;
        background: white;
        font-size: 14px;
        line-height: 60px;
        text-align: center;
    }
    .cartShop {
        .cartShopList {
            width: 100%;
            height: 183px;
            border-bottom: 15px solid #eeeeee;
            .cartShopList_l {
                padding-top: 70px;
                box-sizing: border-box;
                float: left;
                width: 20px;
                height: 120px;
                margin: 0 11px 15px 15px;
                position: relative;
                input {
                    margin-top: 63px;
                    width: 19px;
                    height: 19px;
                }
            }
            .cartShopList_r {
                float: left;
                width: 324px;
                height: 120px;
                margin-bottom: 15px;
                .cartShopList_r_pic {
                    width: 115px;
                    height: 120px;
                    margin-right: 15px;
                    float: left;
                    img {
                        width: 115px;
                        height: 105px;
                        margin-top: 15px;
                    }
                }
                .cartShopList_r_data {
                    width: 193px;
                    height: 78px;
                    float: left;
                    margin-top: 20px;
                    h4 {
                        width: 100%;
                        height: 18px;
                        font-size: 16px;
                        line-height: 18px;
                        margin: 0;
                        font-weight: normal;
                    }
                    .data {
                        width: 100%;
                        height: 26px;
                        margin: 4px 0;
                        .data_size {
                            float: left;
                            width: 50%;
                            height: 12px;
                            font-size: 12px;
                            line-height: 12px;
                            margin-top: 6px;
                            color: #666666;
                        }
                        .data_num {
                            float: right;
                            width: 50%;
                            height: 26px;
                            button {
                                width: 22px;
                                height: 22px;
                                float: left;
                                border: none;
                                background: white;
                                text-align: center;
                                line-height: 22px;
                                font-size: 16px;
                            }
                            span {
                                width: 32px;
                                height: 26px;
                                float: left;
                                display: block;
                                text-align: center;
                                line-height: 26px;
                                font-size: 16px;
                            }
                        }
                    }
                    .price {
                        width: 100%;
                        height: 14px;
                        margin-top: 10px;
                        font-size: 12px;
                        font-weight: bold;
                        line-height: 14px;
                    }
                }
            }
            .cartShopList_b {
                clear: both;
                width: 328px;
                height: 48px;
                margin-left: 46px;
                border-top: 1px solid #eeeeee;
                font-size: 14px;
                line-height: 48px;
                b {
                    color: red;
                }
            }
        }
    }
    .cartTotal {
        width: 100%;
        height: 56px;
        position: fixed;
        bottom: 50px;
        background: #eeeeee;
        .cartTotal_a {
            margin: 0 15px 0 11px;
            width: 60px;
            height: 56px;
            font-size: 16px;
            line-height: 56px;
            float: left;
            input {
                float: left;
                width: 19px;
                height: 19px;
                margin-top: 18px;
            }
        }
        .cartTotal_b {
            float: left;
            width: 30px;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            text-align: left;
        }
        .cartTotal_c {
            float: left;
            width: 132px;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            text-align: right;
            padding-right: 10px;
            b {
                font-size: 16px;
                color: red;
            }
        }
        .cartTotal_d {
            float: left;
            color: white;
            width: 117px;
            height: 56px;
            line-height: 56px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            background-color: #02d3d6;
        }
        .van-action-sheet {
            width: 100%;
            .van-popup {
                img {
                    display: block;
                    width: 70%;
                    margin: 60px auto;
                }
                p{
                    text-align: center;
                    font-size: 16px;
                }
            }
            .actions_gb {
                width: 100%;
                height: 30px;
                img {
                    float: right;
                    width: 16px;
                    height: 16px;
                    margin: 7px 10px;
                }
            }
            .actions_djs {
                width: 100%;
                height: 25px;
                text-align: center;
                .actions_djs_box {
                    width: auto;
                    height: 25px;
                    display: inline-block !important;
                    span {
                        float: left;
                        line-height: 25px;
                        height: 25px;
                        font-size: 16px;
                    }
                    .actions_djs_time {
                        height: 25px;
                        float: left;
                        line-height: 25px;
                        font-size: 16px;
                        margin-left: 4px;
                    }
                }
            }
            .actions_zj {
                width: 100%;
                height: 60px;
                text-align: center;
                line-height: 60px;
                span {
                    font-size: 28px;
                }
            }
            .actions_qrzf {
                width: 100%;
                height: 60px;
                .actions_qrzf_box {
                    width: 345px;
                    height: 44px;
                    border-radius: 4px;
                    background: #02d3d6;
                    margin: 8px auto;
                    text-align: center;
                    font-size: 16px;
                    color: white;
                    line-height: 44px;
                }
            }
            .actions {
                width: 274px;
                height: 44px;
                border: 1px solid #ddd;
                margin: 18px auto 0 auto;
                background: white;
                img {
                    float: left;
                    width: 24px;
                    height: 24px;
                    margin: 10px 14px 10px 74px;
                }
                span {
                    float: left;
                    text-align: left;
                    line-height: 44px;
                    height: 44px;
                    font-size: 14px;
                }
            }
            .active {
                border: 1px solid rgb(221, 66, 66) !important;
                // box-shadow: 0px 0px 5px #999 !important;
            }
        }
    }
    .footer {
        height: 91px;
    }
}
/deep/ .van-popup {
    height: 550px;
    background: #eeeeee;
    border-radius: 0;
}
/deep/ .van-checkbox {
    display: inline-block;
}
</style>
