import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        City: "上海",
        cartList: [],
        userInfo: {},
        showAd: true,
        showTip: true,
        balanceList: [
            { name: "支付宝", bool: false },
            { name: "招商一网通", bool: false },
            { name: "货到付款", bool: false },
            { name: "余额", bool: false },
            { name: "吉致币支付", bool: false }
        ] // 支付方式数组
    },
    mutations: {
        add(state, data) {
            var bool = true;
            state.cartList.map(item => {
                if (item.id === data.id) {
                    if (data.num > 1) {
                        item.num = item.num + data.num;
                    } else {
                        item.num++;
                    }
                    bool = false;
                }
            });
            if (bool) {
                state.cartList.push(data);
            }
            // console.log(state.cartList);
        },
        saveUserData(state, payLoad) {
            state.userInfo = payLoad;
        },
        changeAd(state, payload) {
            state.showAd = payload;
        },
        changeTip(state, payload) {
            state.showTip = payload;
        }
    },
    actions: {},
    modules: {}
});
