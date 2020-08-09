<template>
  <div id="app">
    <!-- 讀取效果 -->
    <loading :active.sync="isLoading"></loading>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoading() {
      // 宣告常數
      const vm = this;

      // 取得讀取狀態
      return vm.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
