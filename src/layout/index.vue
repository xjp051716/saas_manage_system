<script setup>
  import {ArrowRight} from '@element-plus/icons-vue';
  const crumbList = reactive({});
  function getCrumbList(route) {
    let matched = route.matched
    if(matched[0]&&matched[0].name !== 'home') {
      matched = [{ path: '/', meta: {title: '首页'}}].concat(matched)
    }
    return matched
  }
  watch(
    useRoute(),
    (route)=> {
      crumbList.matched = getCrumbList(route)
    }, 
    {
      immediate: true,
      deep: true,
    }
  )
</script>

<template>
  <div class="flex flex-col h-screen">
    <nav-bar></nav-bar>
    <el-container>
      <el-aside width="201px" class="bg-aside">
        <side-bar></side-bar>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <el-breadcrumb :separator-icon="ArrowRight" class="mb-4">
            <el-breadcrumb-item v-for="(item,index) in crumbList.matched" :to="index == crumbList.length - 1 ? '' : item.path">{{item.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view v-slot="{ Component, route }">
            <keep-alive v-if="route.meta.keepAlive">
              <Component :is="Component"/>
            </keep-alive>
            <Component v-else :is="Component"/>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>
