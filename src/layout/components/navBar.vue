<script setup>
  const store = useStore();
  const user = computed(()=> {
    return store.state.user
  })
</script>

<template>
  <el-header class="flex justify-between items-center border-b border-gray-300">
    <div class="text-xl font-bold">SAAS管理后台</div>
    <div class="text-base flex items-center">
      <img :src="user.header" class="w-10 h-10 mr-2.5">
      <span class="text-sm mr-7">{{user.name}}</span>
      <el-icon size="16" class="mr-1">
        <i-ep-close />
      </el-icon>
      <span>退出</span>
    </div>
  </el-header>
</template>

<style scoped>

</style>
