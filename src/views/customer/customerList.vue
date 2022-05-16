<script setup>
  import useList from '../../hooks/useList'
  const {
    currPage,
    pageSize,
    total,
    pageSizes,
    pageLayout,
    tableData,
    paramsObj,
    indexMethod,
    handleCurrPage,
    handlePageSize,
    getTableData,
    route
  } = useList()
  const formData = reactive({
    user: ''
  })
</script>

<template>
  <el-card>
    <template #header>
      <div>{{route.matched[1].meta.title}}</div>
    </template>
    <div class="">
      <el-form></el-form>
      <div>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
  </el-card>
  
</template>

<style scoped>

</style>
