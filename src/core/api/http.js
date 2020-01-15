import axios from "axios";
// 默认全局axios请求对象基本配置
const config = {
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
    responseType: "json", // 默认的
    withCredentials: true,
    transformRequest: [
        function(data) {
            // 对 data 进行任意转换处理
            return data;
        }
    ],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [
        function(data) {
            // 对 data 进行任意转换处理
            return data;
        }
    ]
};

var instance = axios.create(config);
// 拦截器 会拦截到全局所有ajax请求
instance.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        // config.data.timer = Date.now();
        // if(Store.get("userInfo")){
        //     config.headers.token = Store.get("userInfo")
        // }
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;
