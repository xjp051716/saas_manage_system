<script setup>
  const menu = useRouter().options.routes;
</script>

<template>
  <el-menu
    :default-active="$route.path"
    class="w-full"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    router
  >
    <template v-for="route in menu" :key="route.path">
      <el-sub-menu
        v-if="!route.meta.hidden"
        :index="route.path"
      >
        <template #title>
          <span class="iconfont" :class="route.meta.icon"></span>
          <span>{{route.meta.title}}</span>
        </template>
        <template v-for="subRoute in route.children" :key="subRoute.path">
          <el-menu-item v-if="!subRoute.meta.hidden" :index="subRoute.path">
            {{subRoute.meta.title}}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>

</style>
