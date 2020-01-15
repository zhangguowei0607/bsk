import request from "./http";
// import qs from "qs";
const Apis = class {
    getIndexData() {
        return request({
            method: "GET",
            url: "/json1811.ashx",
            params: {
                c: "NewIndexController",
                m: "index",
                v: Date.now()
            }
        });
    }
    getClassData() {
        return request({
            method: "GET",
            url: "/json1811.ashx",
            params: {
                c: "NsCakeCenter",
                m: "GetJdListNew",
                v: Date.now()
            }
        });
    }
    getShowDataOne(data) {
        // 分类 女神 乳品的接口
        return request({
            method: "GET",
            url: "/json1811.ashx",
            params: {
                Name: data.Name,
                c: "NsCakeCenter",
                m: data.m,
                v: Date.now()
            }
        });
    }
    getShowDataTwo(data) {
        // 分类 经典 伴手礼的接口
        return request({
            method: "GET",
            url: "/json1811.ashx",
            params: {
                City: data.City,
                ProName: data.ProName,
                c: data.c,
                m: data.m,
                v: Date.now()
            }
        });
    }
};
export default new Apis();
