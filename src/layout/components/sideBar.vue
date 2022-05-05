<script setup>
  const router = useRouter();
  const menu = router.options.routes.filter(item=> item.path != '/login')
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
    <el-sub-menu
      v-for="route in menu"
      :index="route.path"
    >
      <template #title>
        <span class="iconfont" :class="route.meta.icon"></span>
        <span>{{route.meta.title}}</span>
      </template>
      <el-menu-item v-for="subRoute in route.children" :index="subRoute.path">
        {{subRoute.meta.title}}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>
