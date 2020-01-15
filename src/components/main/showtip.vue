<template>
  <div id="showtip">
    <div @click="exit">
      <img src="https://res.bestcake.com/m-images/listpage-tc.png?v=21" alt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      // this.$eventBus.$emit("exit", false);
      this.$store.commit("changeTip", false);
    }
  }
};
</script>

<style lang="scss" scoped>
#showtip {
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
    margin: 80px auto;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    line-height: 80px;
    font-size: 16px;
    img {
      margin-top: 80px;
      width: 187px;
      height: 69px;
    }
  }
}
</style>
