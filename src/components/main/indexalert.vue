<template>
    <div id="loading">
        <div>
            <div class="exit" @click="exit"></div>
            <img src="https://res.bestcake.com/m-images/banner_list/375864371077503800.jpg" alt />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        exit() {
            // this.$eventBus.$emit("exit", false);
            this.$store.commit("changeAd", false);
        }
    }
};
</script>

<style lang="scss" scoped>
#loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    /* background-color: black; */
    background-color: rgba(0, 0, 0, 0.6);
    div {
        width: 300px;
        height: 435px;
        margin: 70px auto;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0);
        text-align: center;
        line-height: 80px;
        font-size: 16px;
        .exit {
            position: absolute;
            top: -26px;
            right: 20px;
            width: 60px;
            height: 60px;
            /* background-color: red; */
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
