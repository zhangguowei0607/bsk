<template>
    <div id="login">
        <!-- 验证码登录 -->
        <div class="verify" v-if="bool">
            <div class="goback" @click="goback">
                <i class="fa fa-angle-left fa-lg"></i>
            </div>
            <div class="quick">快速登录</div>
            <div class="phone">手机号</div>
            <div class="inp">
                <div class="numphone">+86</div>
                <input type="number" />
                <div class="send">发送验证码</div>
            </div>
            <div class="tipc">
                温馨提示：未注册的手机号，登录时将自动注册，且代表您已同意
                <a href="http://m.bestcake.com/policy">《贝思客用户协议》</a>
            </div>
            <div class="usepwd" @click="useselect">使用密码登录</div>
        </div>
        <!-- 密码登录 -->
        <div class="password" v-if="!bool">
            <div class="goback" @click="goback">
                <i class="fa fa-angle-left fa-lg"></i>
            </div>
            <div class="quick">密码登录</div>
            <div class="phone">手机号</div>
            <div class="inp">
                <div class="numphone">+86</div>
                <input type="number" placeholder="13994124181" />
            </div>
            <div class="mm">密码</div>
            <div class="mi">
                <input type="text" placeholder="123456" />
            </div>
            <div class="last">
                <div class="qie" @click="useselect">切换快速登录</div>
                <div class="logins" @click="login">
                    <i class="fa fa-angle-right fa-lg"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Cookie from "js-cookie";
import Store from "store";
export default {
    data() {
        return {
            bool: true // 控制登录框显隐
        };
    },
    methods: {
        goback() {
            this.$router.go(-1);
            this.$eventBus.$emit("showLogin", false);
        },
        useselect() {
            this.bool = !this.bool;
        },
        login() {
            // 此处有BUG 手机无法存放cookie!!!!
            var userInfo = {
                name: "zgw",
                iphone: "13994124181",
                ImgUrl:
                    "https://b-ssl.duitang.com/uploads/item/201509/30/20150930175854_w3CsQ.thumb.224_0.jpeg",
                uname: "13994124181",
                upwd: "123456"
            };
            Store.set("userInfo", userInfo);
            this.$store.commit("saveUserInfo", userInfo);
            this.$eventBus.$emit("showLogin", false);
        }
    }
};
</script>

<style lang="scss" scoped>
#login {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(54, 209, 220, 1);
    .verify {
        margin: 0 16px;
        margin-top: 10px;
        .goback {
            font-size: 24px;
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .quick {
            font-size: 36px;
            margin-left: 10px;
            color: #ffffff;
            margin-bottom: 4px;
        }
        .phone {
            margin-left: 10px;
            color: #ffffff;
            font-weight: 500;
        }
        .inp {
            margin-left: 10px;
            margin-top: 10px;
            display: flex;
            border-bottom: 1px solid #ffffff;
            padding-bottom: 6px;
            .numphone {
                width: 44px;
                height: 28px;
                background-color: #fff;
                font-size: 18px;
                border-radius: 2px;
                text-align: center;
                line-height: 28px;
                color: rgb(21, 127, 131);
            }
            input {
                width: 200px;
                border: none;
                font-size: 18px;
                font-weight: 600;
                color: #fff;
                height: 28px;
                margin-left: 10px;
                background-color: rgba(54, 209, 220, 1);
            }
            .send {
                line-height: 30px;
                color: #fafafa;
            }
        }
        .tipc {
            margin-top: 10px;
            margin-left: 10px;
            color: #fff;
        }
        .usepwd {
            width: 130px;
            height: 28px;
            border: 2px solid #fff;
            margin: 0 auto;
            margin-top: 15px;
            border-radius: 10px;
            text-align: center;
            line-height: 28px;
            font-size: 18px;
            color: #fff;
            font-weight: 500;
        }
    }
    .password {
        margin: 0 16px;
        margin-top: 10px;
        .goback {
            font-size: 24px;
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .quick {
            font-size: 36px;
            margin-left: 10px;
            color: #ffffff;
            margin-bottom: 4px;
        }
        .phone {
            margin-left: 10px;
            color: #ffffff;
            font-weight: 500;
        }
        .inp {
            margin-left: 10px;
            margin-top: 10px;
            display: flex;
            border-bottom: 1px solid #ffffff;
            padding-bottom: 6px;
            .numphone {
                width: 44px;
                height: 28px;
                background-color: #fff;
                font-size: 18px;
                border-radius: 2px;
                text-align: center;
                line-height: 28px;
                color: rgb(21, 127, 131);
            }
            input {
                width: 200px;
                border: none;
                font-size: 18px;
                font-weight: 600;
                color: #fff;
                height: 28px;
                margin-left: 10px;
                background-color: rgba(54, 209, 220, 1);
            }
        }
        .mm {
            margin-left: 10px;
            color: #fff;
            margin-top: 16px;
        }
        .mi {
            margin-top: 10px;
            margin-right: 10px;
            input {
                margin-left: 10px;
                border: none;
                background-color: rgba(54, 209, 220, 1);
                border-bottom: 1px solid #fff;
                width: 100%;
                color: #fff;
                font-size: 18px;
            }
        }
        .last {
            margin-top: 16px;
            display: flex;
            justify-content: space-between;
            margin-left: 10px;
            .qie {
                width: 130px;
                height: 28px;
                border: 2px solid #fff;
                margin-top: 15px;
                border-radius: 10px;
                text-align: center;
                line-height: 28px;
                font-size: 18px;
                color: #fff;
                font-weight: 500;
            }
            .logins {
                margin-right: 20px;
                height: 58px;
                width: 58px;
                text-align: center;
                vertical-align: middle;
                line-height: 50px;
                font-size: 36px;
                font-weight: 700;
                color: rgba(54, 209, 220, 1);
                background-color: skyblue;
                border-radius: 50%;
            }
        }
    }
}
</style>
