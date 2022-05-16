<script setup>
  import useList from '../../hooks/useList'
  const {
    currPage,
    pageSize,
    total,
    pageLayout,
    tableData,
    paramsObj,
    indexMethod,
    handleCurrPage,
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
    <div>
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <el-table
      :data="tableData"
    >
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
      <el-table-column label="客户名称" props="name"></el-table-column>
    </el-table>
    <el-pagination
      class="float-right my-4"
      :layout="pageLayout"
      :default-current-page="1"
      :total="total"
      :page-size="pageSize"
      :current-page="currPage"
      @current-change="handleCurrPage"
    ></el-pagination>
  </el-card>
  
</template>

<style scoped>

</style>
