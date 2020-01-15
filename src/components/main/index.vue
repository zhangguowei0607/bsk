<template>
    <div id="index">
        <adalert v-if="$store.state.showAd" v-once />
        <!-- 头部 -->
        <div class="header">
            <div class="address">
                <img src="https://res.bestcake.com/images/newIndex/localtion.png" />
                <p>上海</p>
                <img src="https://res.bestcake.com/images/newIndex/more.png" />
            </div>
        </div>
        <!-- 轮播图 -->
        <div class="banner" v-if="SwiperBannerList.length !== 0">
            <Swiper id="banner" :config="bannerConfig" class="banner_box">
                <div class="swiper-slide" v-for="(item, index) in SwiperBannerList" :key="index">
                    <img :src="item.ImgUrl" @click="toPathClass" />
                </div>
            </Swiper>
        </div>
        <!-- 广告 -->
        <div class="new">
            <img src="https://res.bestcake.com/images/newIndex/title.png" class="new_small" />
            <img src="https://res.bestcake.com/images/app/banner/684da16794264dbf8ae6105f6ffdf291.gif" class="new_big" @click="toPathClass" />
        </div>
        <!-- 分类 -->
        <div class="list">
            <div>
                <van-col span="6" v-for="(item, index) in listList" :key="index" class="list_img">
                    <img :src="item.ImgUrl" @click="toPathClass" />
                    <p>{{ item.ActName }}</p>
                </van-col>
            </div>
        </div>
        <!-- 通知 -->
        <div class="inform">
            <div class="inform_box">
                <span>通知</span>
            </div>
            <!-- <van-notice-bar>{{ NoticeList }}</van-notice-bar> -->
            <van-notice-bar
                :text="NoticeList"
                color="#1fb1b8"
                background="white"
                class="inform_notice"
            />
        </div>
        <!-- 商品 -->
        <div class="shop">
            <div v-for="(item, index) in CenterContentList" :key="index" class="shop_pic" @click="toPathClass">
                <img :src="item.ImgUrl" />
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="sliview">
            <div v-for="(item, index) in SaleList" :key="index">
                <!-- 大图 -->
                <div class="title_pic">
                    <img :src="item.TabImgUrl" @click="toPathClass" />
                </div>
                <!-- 轮播小图 -->
                <div class="carousel_pic">
                    <Swiper :id="'carousel' + index" :config="carouselConfig">
                        <div class="swiper-slide carousel_box" v-for="(value, idx) in item.CakeList" :key="idx" @click="toPathTwo(value)">
                            <img :src="value.ImgUrl" />
                            <div class="carousel_text">{{ value.Name }}</div>
                            <div class="carousel_price">
                                <i class="fa fa-jpy" aria-hidden="true"></i>
                                {{ value.Price }} / {{ value.Size | ellipsis(8) }}
                            </div>
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
        <!-- 底部空白 -->
        <div class="footer"></div>
    </div>
</template>

<script>

import adalert from "./indexalert";

export default {
    data() {
        return {
            SwiperBannerList: [],
            NoticeList: "",
            bannerConfig: {
                pagination: ".swiper-pagination", // 分页器
                paginationClickable: true, // 分页点击跳转
                //播放速度
                loop: true,
                // 自动播放时间
                autoplay: true,
                // 播放的速度
                speed: 1500,
                style: {
                    width: "91.5%",
                    height: 180 / 37.5 + "rem"
                },
                autoplayDisableOnInteraction: false
            },
            SaleList: [],
            carouselConfig: {
                // slidesPerView: 3,
                spaceBetween: 12,
                slidesPerView: "auto" // 宽度自适应
            },
            listList: [],
            CenterContentList: []
        };
    },
    mounted() {
        this.$apis.getIndexData().then(res => {
            var mainresult = res.data.Tag.mainresult;
            // 获取接口api
            console.log(mainresult);
            // 获取轮播图数组
            this.SwiperBannerList = mainresult.SwiperBannerList;
            // 获取通知栏文本信息
            this.NoticeList = mainresult.NoticeList;
            // 获取主体内容大图数组
            var SaleList = mainresult.SaleList;
            // 遍历SaleList数组
            SaleList.map(item => {
                // 小图对象转JSON
                item.CakeList = JSON.parse(item.CakeList);
                // 小图遍历图片地址
                // 因地址不同 封装一个setImgUrl函数
                item.CakeList.map(value => {
                    value.ImgUrl = this.setImgUrl(value);
                });
            });
            this.SaleList = SaleList;
            this.listList = mainresult.TopIconList;
            this.CenterContentList = mainresult.CenterContentList;
            console.log(this.CenterContentList);
        });
        // 解决路由传参跳转不在头部问题！！
        this.$router.afterEach(() => {
            window.scrollTo(0, 0);
        });
    },
    methods: {
        toPathTwo(item) {
            // 路由跳转用router,获取参数用route
            this.$router.push({
                path: "/show",
                query: { Name: item.Name, SupplyNo: item.SupplyNo }
            });
            // console.log(this.$route);
        },
        toPathClass() {
            this.$router.push({
                path: "/class"
            });
        }
    },
    components : {
        adalert
    }
};
</script>

<style scoped lang="scss">
#index {
    width: 100%;
    height: 100%;
    .header {
        height: 44px;
        width: 91.7%;
        margin: 0 auto;
        .address {
            float: left;
            width: 70px;
            height: 100%;
            img {
                float: left;
            }
            p {
                float: left;
                margin: 0 5px;
                line-height: 44px;
                font-size: 14px;
            }
            img:first-child {
                width: 19px;
                height: 22px;
                margin-top: 10px;
            }
            img:last-child {
                width: 9px;
                height: 16px;
                margin-top: 14px;
            }
        }
    }
    .banner {
        .banner_box {
            border-radius: 7px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .new {
        .new_small {
            width: 100%;
        }
        .new_big {
            width: 91.5%;
            display: block;
            margin: 0 auto;
        }
    }
    .list {
        width: 91.7%;
        height: 196px;
        margin: 0 auto;
        .list_img {
            text-align: center;
            height: 50%;
            display: block;
            img {
                width: 52px;
                height: 52px;
                margin-top: 10px;
            }
            p {
                font-size: 12px;
                line-height: 14px;
                margin-top: 6px;
            }
        }
    }
    .inform {
        height: 40px;
        border-top: 8px solid #fafafa;
        border-bottom: 8px solid #fafafa;
        background: white;
        .inform_box {
            float: left;
            padding-left: 20px;
            padding-top: 11px;
            span {
                line-height: 18px;
                text-align: center;
                display: block;
                width: 32px;
                height: 18px;
                background: #1fb1b8;
                border-radius: 5px;
                color: white;
            }
        }
    }
    .shop {
        width: 91.5%;
        margin: 16px auto;
        overflow: hidden;
        .shop_pic {
            width: 48%;
            float: left;
            margin-bottom: 12px;
            border-radius: 5px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .shop_pic:nth-of-type(2n-1) {
            margin-right: 12px;
        }
    }
    .sliview {
        .title_pic {
            img {
                width: 100%;
                height: 100%;
            }
        }
        .carousel_pic {
            img {
                width: 120px;
                height: 120px;
            }
            .carousel_box {
                width: 156px;
                height: 190px;
                border-radius: 5px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                margin: 12px 0 24px 0;
                text-align: center;
                padding: 15px 0;
                .carousel_text {
                    width: 120px;
                    height: 40px;
                    text-align: left;
                    margin: 0 auto;
                    line-height: 20px;
                    font-size: 12px;
                }
                .carousel_price {
                    height: 26px;
                    width: 120px;
                    text-align: left;
                    margin: 0 auto;
                    line-height: 26px;
                }
            }
            .carousel_box:first-of-type {
                margin-left: 12px;
            }
            .carousel_box:last-of-type {
                margin-right: 12px;
            }
        }
    }
    .footer {
        height: 50px;
    }
    .van-tabbar {
        z-index: 1000 !important;
    }
}
</style>
