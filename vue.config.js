var path = require("path");
const px2rem = require("postcss-px2rem");
const postcss = px2rem({
    remUnit: 75 / 2 // 基准大小 baseSize，需要和rem.js中相同
});
var userInfo = require("./data/index.json"); // 存放用户接口的json文件
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: "./", //不配置publicPath  "/img/1.jpg"   || 配置public "./img/1.jpg"
    devServer: {
        // 配置当前项目
        host: "0.0.0.0", // 允许所有本地访问主机
        port: "8899", // 本地项目端口
        proxy: {
            // http://m.bestcake.com/json1811.ashx?v=1577777810221&c=NewIndexController&m=index
            "/apis": {
                //url里面要拼接进去,约定的标记,本项目里面发送的所有的ajax,检查 url里面 有没有  /apis
                target: "http://m.bestcake.com", // 需要代理接口域名
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    "^/apis": "" //需要rewrite的,
                }
            }
        },
        before(app) {
            // app代表Node.js_express
            app.get("/login", (req, res) => {
                // 用户借口
                console.log(req);
                res.json(userInfo);
            });
        }
    },
    // 设置别名
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
    },
    css: {
        loaderOptions: {
            // 自动转换rem
            postcss: {
                plugins: [postcss]
            }
        }
    }
};
