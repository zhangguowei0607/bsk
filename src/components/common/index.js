import { Tabbar, TabbarItem } from "vant";
import { Row, Col } from "vant";
import { NoticeBar } from "vant";
import { Stepper } from "vant";
import { Overlay } from "vant";
import { ActionSheet } from "vant";
import { CountDown } from "vant";
import { Popup } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
// 自定义组件
import Swiper from "./swiper";
export default function(Vue) {
    // 底部导航条组件
    Vue.component("Tabbar", Tabbar);
    Vue.component("TabbarItem", TabbarItem);
    Vue.component("Swiper", Swiper);
    Vue.use(Stepper);
    Vue.use(Overlay);
    Vue.use(Row).use(Col);
    Vue.use(NoticeBar);
    Vue.use(ActionSheet);
    Vue.use(CountDown);
    Vue.use(Popup);
    Vue.use(Checkbox).use(CheckboxGroup);
}
