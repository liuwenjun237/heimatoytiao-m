<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route v-model="active" class="layout-tabbar">
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        问答</van-tabbar-item
      >
      <van-tabbar-item to="/vedio">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        视频</van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        {{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
.layout-container {
  .layout-tabbar {
    // font-size: 20px !important;
    .toutiao {
      font-size: 40px;
    }
  }
}
</style>
