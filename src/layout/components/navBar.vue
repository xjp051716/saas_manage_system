<script setup>
  const router = useRouter();
  const store = useStore();
  const user = computed(()=> {
    return store.state.user
  })
  const version = computed(()=> {
    return store.state.version
  })
  const logOut = ()=> {
    localStorage.clear()
    router.push({ name: 'login' })
  }
</script>

<template>
  <el-header class="flex justify-between items-center border-b border-gray-300">
    <div class="text-xl font-bold flex items-center">
      <span>SAAS管理后台</span> 
      <el-tag class="ml-3" effect="dark">
        <span class="text-sm font-medium">V{{version}}</span>
      </el-tag>
    </div>
    <div class="flex items-center">
      <img :src="user.header" class="w-10 h-10 mr-2.5">
      <span class="text-sm mr-7">{{user.name}}</span>
      <div @click="logOut" class="cursor-pointer py-1">
        <el-icon size="16" class="mr-1 align-middle">
          <i-ep-close />
        </el-icon>
        <span class="text-sm">退出</span>
      </div>
    </div>
  </el-header>
</template>

<style scoped>

</style>
