export default {
    data() {
        return {};
    },
    filters: {
        ellipsis(val, length) {
            var str = "";
            if (val.length > length) {
                str = val.slice(0, length) + "...";
            } else {
                str = val;
            }
            return str;
        },
        joint(val) {
            return val + ".00";
        }
    },
    methods: {
        setImgUrl(item) {
            // https://res.bestcake.com/m-images/ww /jd/ 草莓拿破仑.png                             SupplyNo:KSK-0975-1
            // https://res.bestcake.com/m-images/ww /jz/ 杯子蛋糕.png                               SupplyNo:JZ-0044-9
            // https://res.bestcake.com/m-images/ww /rp/ 可莱思迪客英国进口冰淇淋(125mlx4).jpg       SupplyNo:RP-0011-147
            // https://res.bestcake.com/m-images/ww /ns/ 宠爱少女.jpg      SupplyNo:RP-0011-147    SupplyNo:NS-0119-1
            // 共同部分 https://res.bestcake.com/m-images/ww
            // 不同部分 SupplyNo:KSK => jd   SupplyNo:JZ => jz   SupplyNo:RP => rp   SupplyNo:NS => ns
            var url = "https://res.bestcake.com/m-images/ww";
            if (item.SupplyNo.indexOf("KSK") !== -1) {
                return url + "/jd/" + item.Name + ".png";
            } else if (item.SupplyNo.indexOf("JZ") !== -1) {
                return url + "/jz/" + item.Name + ".png";
            } else if (item.SupplyNo.indexOf("RP") !== -1) {
                return url + "/rp/" + item.Name + ".jpg";
            } else if (item.SupplyNo.indexOf("NS") !== -1) {
                return url + "/ns/" + item.Name + ".jpg";
            }
        }
    }
};
