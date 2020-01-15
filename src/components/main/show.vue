<template>
    <div id="show">
        <showtip v-if="$store.state.showTip" v-once />
        <!-- 轮播图 -->
        <!-- v-if =>处理异步，当 bannerImgUrl 不等于空字符串时候渲染页面 -->
        <div class="banner" v-if="bannerImgUrl !== ''">
            <Swiper id="banner" :config="bannerConfig" class="banner_box">
                <div class="swiper-slide" v-for="(item, index) in 4" :key="index">
                    <img @click="showpic(item)" :src="bannerImgUrl + item + '.jpg'" />
                </div>
            </Swiper>
        </div>
        <!-- 商品名字 -->
        <div class="shopText">
            <h4>{{ shopText }}</h4>
        </div>
        <!-- 商品详情 -->
        <div class="shopDetails">
            <!-- 甜度 -->
            <div class="sweet">
                <span>甜度</span>
                <p v-if="sizeList.length !== 0">
                    <img v-if="sizeList.length !== 0" :src="`${Sweet}${goodInfo.Sweet || goodInfo.CakeType[0].Sweet}.png`" />
                </p>
            </div>
            <!-- 口味 -->
            <div class="taste">
                <span>口味</span>
                <p>{{ goodInfo.CategoryName }}</p>
            </div>
            <!-- 原材料 -->
            <div class="materials">
                <div class="materials_l">原材料</div>
                <div class="materials_r">{{ materialsText }}</div>
            </div>
            <!-- 适合人群 -->
            <div class="people">
                <span>适合人群</span>
                <p>所有人群</p>
            </div>
            <!-- 保鲜条件 -->
            <div class="condition">
                <span>保鲜条件</span>
                <p>最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。</p>
            </div>
        </div>
        <!-- 商品评价 -->
        <div class="shopAppraise">
            <div class="shopAppraise_img">
                <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" />
            </div>
            <div class="shopAppraise_text">商品评价</div>
        </div>
        <!-- 商品size -->
        <div class="shopSize">
            <div class="shopSize_top">
                <span v-for="(item, index) in sizeList" :key="index" @click="select(index)" :class="{ active:num === index }">
                    {{ item.Size }}
                </span>
            </div>
            <ul class="shopSize_bottom">
                <li>
                    <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png" />13.5*13.5cm
                </li>
                <li>
                    <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" />适合4-5人分享
                </li>
                <li>
                    <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" />含五人份餐具
                </li>
                <li>
                    <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" />至少需提前一天预约
                </li>
            </ul>
        </div>
        <!-- 商品数量 -->
        <div class="shopNum">
            <div class="shopNum_left">购买数量</div>
            <div class="shopNum_right">
                <button @click="down()" :class="{ mark:shopNum === 1 }">-</button>
                <span>{{ shopNum }}</span>
                <button @click="up()">+</button>
            </div>
        </div>
        <!-- 温馨提示 -->
        <div class="hint">
            <div class="hint1">
                <div>划线价格</div>
                <div>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
            </div>
            <div class="hint2">
                <div>未划线价格</div>
                <div>商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
            </div>
        </div>
        <!-- 购买按钮 -->
        <div class="buy">
            <span>
                <b>{{ currentData.CurrentPrice * shopNum + ".00" }}</b>
                <i>已优惠:&nbsp;0.00</i>
            </span>
            <span @click="getCart">加入购物车</span>
            <span @click="toCart">立即购买</span>
        </div>
        <!-- 返回按钮 -->
        <div class="goBack">
            <i class="fa fa-angle-left" aria-hidden="true" @click="click"></i>
        </div>
        <!-- 底部空白 -->
        <div class="footer"></div>
    </div>
</template>

<script>
import { Dialog } from "vant";
import { ImagePreview } from "vant";
import showtip from "./showtip";
export default {
    data() {
        return {
            bannerImgUrl: "", // 轮播图图片路径
            shopText: "", // 商品名字
            bannerConfig: {
                pagination: ".swiper-pagination", // 分页器
                paginationClickable: true, // 分页点击跳转
                autoplayDisableOnInteraction: false
            },
            goodInfo: [], // 商品详情
            sizeList: [], // size种类
            Sweet: "https://res.bestcake.com/m-images/ww/jz/tiandu_", // 甜度图片
            materialsText: "", // 原材料
            currentData: "", // 价格
            num: 0, // 判断size框是否选中
            shopNum: 1 // 商品数量
        };
    },
    mounted() {
        this.pageInit(); // 调用
    },
    methods: {
        pageInit() {
            var query = this.$route.query; // 地址栏
            this.shopText = query.Name; // 获取商品名字
            var url = "https://res.bestcake.com/m-images"; // 轮播图图片地址相同部分
            var bannerImgUrl = ""; // 轮播图图片路径
            var apiCallBack = null; // 用于存放调接口回来的promise对象
            if (query.SupplyNo.indexOf("KSK") !== -1) {
                bannerImgUrl = `${url}/jd-detail/${query.Name}/${query.Name}-`; // 经典
                apiCallBack = this.$apis.getShowDataTwo({
                    // 调用接口 获取promise对象
                    City: this.$store.state.City,
                    ProName: query.Name,
                    c: "Product",
                    m: "GetCakeByName"
                });
            } else if (query.SupplyNo.indexOf("JZ") !== -1) {
                bannerImgUrl = `${url}/jz-detail/${query.Name}/${query.Name}-`; // 伴手礼
                apiCallBack = this.$apis.getShowDataTwo({
                    // 调用接口 获取promise对象
                    City: this.$store.state.City, // vuex
                    ProName: query.Name, // route
                    c: "IndexCenter", // 参照接口
                    m: "GetjzCakeInfo" // 参照接口
                });
            } else if (query.SupplyNo.indexOf("RP") !== -1) {
                bannerImgUrl = `${url}/rp-detail/${query.Name}/${query.Name}-`; // 乳品
                apiCallBack = this.$apis.getShowDataOne({
                    // 调用接口 获取promise对象
                    Name: query.Name,
                    m: "GetRuPCakeByName"
                });
            } else if (query.SupplyNo.indexOf("NS") !== -1) {
                bannerImgUrl = `${url}/ns-detail/${query.Name}/${query.Name}-`; // 女神
                apiCallBack = this.$apis.getShowDataOne({
                    // 调用接口 获取promise对象
                    Name: query.Name,
                    m: "GetNSCakeByName"
                });
            }
            this.bannerImgUrl = bannerImgUrl; // 存入bannerImgUrl
            apiCallBack.then(res => {
                var tag = res.data.Tag;
                // 获取的tag数据又俩种数据类型  数组/对象
                // console.log(tag);
                // 通过if判断是数组还是对象
                if (tag.length === undefined) {
                    // obj 经典
                    this.goodInfo = tag.infos; // 商品详情
                    this.sizeList = tag.infos.CakeType; // size种类
                } else {
                    // arr 女神 乳品 伴手礼
                    var sizeList = [];
                    tag.map(item => {
                        // 遍历数组 筛选本城市商品
                        if (item.City === this.$store.state.City) {
                            sizeList.push(item);
                        }
                    });
                    // 针对没有城市的商品
                    if (sizeList.length === 0) {
                        sizeList = tag[0].CakeType;
                    }
                    this.sizeList = sizeList; // 商品详情
                    this.goodInfo = tag[0]; // size种类
                }
                var materialsText = "";
                if (this.goodInfo.Resource !== undefined) {
                    materialsText = this.goodInfo.Resource;
                } else {
                    materialsText = this.goodInfo.Resourse;
                }
                this.materialsText = materialsText;
                // console.log(this.goodInfo);
                // console.log(this.sizeList);
                this.select(0); // 初始化 默认选中第一个
            });
        },
        select(index) {
            this.num = index;
            this.currentData = this.sizeList[this.num];
        },
        down() {
            if (this.shopNum > 2) {
                this.shopNum--;
            } else {
                this.shopNum = 1;
            }
        },
        up() {
            this.shopNum += 1;
        },
        getCart() {
            // console.log(this.currentData);
            console.log(this.shopNum);
            var temp = {
                id: this.currentData.Id || this.currentData.ID,
                ImgUrl: this.bannerImgUrl + "1.jpg",
                name: this.goodInfo.Name,
                size: this.currentData.Size,
                CurrentPrice: this.currentData.CurrentPrice,
                num: this.shopNum,
                bool: true
            };
            Dialog.confirm({
                title: "提示",
                message: "是否加入购物车"
            })
                .then(() => {
                    // on confirm
                    this.$store.commit("add", temp);
                    // this.$router.push({ path: "/cart" });
                })
                .catch(() => {
                    // on cancel
                });
        },
        toCart() {
            this.$router.push({
                path: "/cart"
            });
        },
        click() {
            this.$router.go(-1);
        },
        showpic() {
            ImagePreview([
                this.bannerImgUrl + 1 + ".jpg",
                this.bannerImgUrl + 2 + ".jpg",
                this.bannerImgUrl + 3 + ".jpg",
                this.bannerImgUrl + 4 + ".jpg"
            ]);
        }
    },
    components:{
        showtip
    }
};
</script>

<style scoped lang="scss">
#show {
    .goBack {
        width: 100%;
        height: 40px;
        position: fixed;
        top: 0;
        z-index: 100;
        i {
            width: 30px;
            height: 30px;
            display: block;
            margin: 5px 15px;
            border-radius: 15px;
            font-size: 24px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #eeeeee;
        }
    }
    .banner {
        width: 100%;
        height: 445px;
        .banner_box {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .shopText {
        width: 282px;
        height: 62px;
        margin: 8px auto 30px auto;
        h4 {
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            text-align: center;
        }
    }
    .shopDetails {
        width: 100%;
        height: 303px;
        border-top: 15px solid #eeeeee;
        .sweet {
            width: 100%;
            height: 22px;
            margin-top: 35px;
            span {
                float: left;
                width: 60px;
                margin-left: 15px;
                margin-right: 15px;
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: gray;
            }
            p {
                height: 22px;
                img {
                    width: 84px;
                    height: 16px;
                    margin: 3px 0;
                }
            }
        }
        .taste {
            width: 100%;
            height: 22px;
            span {
                float: left;
                width: 60px;
                margin-left: 15px;
                margin-right: 15px;
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: gray;
            }
            p {
                height: 22px;
                font-size: 14px;
                line-height: 22px;
                color: black;
            }
        }
        .materials {
            width: 100%;
            height: auto;
            overflow: hidden;
            margin-top: 14px;
            .materials_l {
                float: left;
                width: 60px;
                margin-left: 15px;
                margin-right: 15px;
                line-height: 22px;
                font-size: 14px;
                color: gray;
            }
            .materials_r {
                width: 271px;
                float: left;
                height: auto;
                font-size: 14px;
                line-height: 22px;
                color: black;
                padding-right: 14px;
            }
        }
        .people {
            width: 100%;
            height: 22px;
            span {
                float: left;
                width: 60px;
                margin-left: 15px;
                margin-right: 15px;
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: gray;
            }
            p {
                height: 22px;
                font-size: 14px;
                line-height: 22px;
                color: black;
            }
        }
        .condition {
            width: 100%;
            height: auto;
            span {
                float: left;
                width: 60px;
                height: 66px;
                margin-left: 15px;
                margin-right: 15px;
                line-height: 22px;
                font-size: 14px;
                color: gray;
            }
            p {
                height: auto;
                font-size: 14px;
                line-height: 22px;
                color: black;
                padding-right: 14px;
            }
        }
    }
    .shopAppraise {
        width: 100%;
        height: 22px;
        padding: 15px 0;
        border-top: 15px solid #eeeeee;
        .shopAppraise_img {
            width: 20px;
            height: 17px;
            float: left;
            margin-left: 15px;
            img {
                width: 20px;
                height: 17px;
                margin-top: 3px;
            }
        }
        .shopAppraise_text {
            margin-left: 10px;
            float: left;
            line-height: 22px;
            font-size: 14px;
            height: 22px;
        }
    }
    .shopSize {
        width: 100%;
        height: 246px;
        border-top: 15px solid #eeeeee;
        .shopSize_top {
            width: 100%;
            height: 80px;
            margin-top: 30px;
            span {
                float: left;
                width: auto;
                height: 28px;
                line-height: 28px;
                text-align: center;
                padding: 0 14px;
                border: 1px solid #999;
                margin-left: 15px;
                border-radius: 2px;
            }
            .active {
                background: #02d4d7;
            }
        }
        .shopSize_bottom {
            height: 93px;
            width: 100%;
            margin-top: 42px;
            li {
                float: left;
                width: 50%;
                height: 50%;
                height: 24px;
                line-height: 24px;
                font-size: 14px;
                margin-bottom: 14px;
                padding-left: 14px;
                box-sizing: border-box;
                img {
                    float: left;
                    width: 22px;
                    height: 22px;
                    margin-right: 5px;
                }
            }
        }
    }
    .shopNum {
        width: 100%;
        height: 22px;
        padding: 15px 0;
        border-top: 15px solid #eeeeee;
        .shopNum_left {
            width: 170px;
            height: 22px;
            margin-left: 14px;
            float: left;
            font-size: 14px;
            line-height: 22px;
        }
        .shopNum_right {
            height: 22px;
            margin-right: 14px;
            float: right;
            button {
                width: 22px;
                height: 22px;
                border: none;
                float: left;
                background: white;
                text-align: center;
                font-size: 20px;
                line-height: 22px;
            }
            .mark {
                color: #eeeeee;
            }
            span {
                float: left;
                width: 28px;
                height: 22px;
                text-align: center;
                line-break: 22px;
                font-size: 18px;
            }
        }
    }
    .hint {
        width: 100%;
        height: 186px;
        padding: 22px 0 7px 0;
        background: #eeeeee;
        border-bottom: 15px solid #eeeeee;
        .hint1 {
            width: 92%;
            height: 67px;
            margin: 0 auto 15px auto;
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
            margin: 0 auto 15px auto;
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
    }
    .buy {
        width: 100%;
        height: 55px;
        position: fixed;
        bottom: 0;
        z-index: 1000;
        span {
            float: left;
        }
        span:nth-of-type(1) {
            width: 135px;
            height: 100%;
            padding-left: 15px;
            background: white;
            b {
                display: block;
                height: 28px;
                line-height: 28px;
                font-size: 14px;
                margin-top: 5px;
                color: red;
            }
            i {
                display: block;
                height: 16px;
                line-height: 16px;
                font-size: 10px;
                font-style: normal;
            }
        }
        span:nth-of-type(2) {
            width: 110px;
            height: 100%;
            font-size: 16px;
            line-height: 55px;
            text-align: center;
            background: white;
        }
        span:nth-of-type(3) {
            width: 115px;
            height: 100%;
            background: #02d4d7;
            font-size: 16px;
            line-height: 55px;
            font-weight: bold;
            text-align: center;
            color: white;
        }
    }
    .footer {
        height: 55px;
    }
}
/*属于Vue组件使用的范畴 ,style加上scoped 情况下,注册组件样式,深度选择器*/
/deep/ .swiper-pagination {
    text-align: right;
    .swiper-pagination-bullet {
        border-radius: 0;
        width: 6px;
        height: 6px;
        margin: 0 3px;
    }
    .swiper-pagination-bullet:last-child {
        margin-right: 15px;
    }
}
/deep/ .swiper-pagination-bullet {
    background: #f2495e;
}
/deep/ .van-stepper__minus {
    width: 28px;
    height: 22px;
    background: white;
}
/deep/ .van-stepper__input {
    width: 28px;
    height: 22px;
    background: white;
}
/deep/ .van-stepper__plus {
    width: 28px;
    height: 22px;
    background: white;
}
</style>
