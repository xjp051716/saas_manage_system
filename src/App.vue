<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component, route }">
      <keep-alive v-if="route.meta.keepAlive">
        <Component :is="Component"/>
      </keep-alive>
      <Component v-else :is="Component"/>
    </router-view>
  </el-config-provider>
</template>

<style>
@import url(../src/assets/icon/iconfont.css);
@import url(../src/assets/css/common.css);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
