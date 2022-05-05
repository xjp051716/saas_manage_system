<script setup>
defineProps({
  msg: String
})

const count = ref(0)

onMounted(()=> {
  ElMessage.warning('哈哈哈哈')
})

</script>

<template>
  <h1 class="text-sm">{{ count }}</h1>
</template>

<style scoped>

</style>
