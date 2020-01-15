import Apis from "./api";
import "@/components/common";
import Common from "@/components/common";
// function Common(){

// }
// Common()
// const fn = Vue =>{
//   console.log(Vue);
// }
// fn("Msea");
export default Vue => {
    Common(Vue);
    Vue.prototype.$eventBus = new Vue();
    Vue.prototype.$apis = Apis;
};
