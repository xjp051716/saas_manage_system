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
    router,
    route
  } = useList()
  const formData = reactive({
    name: ''
  })
  const search = ()=> {
    // getTableData()
  }
  const reset = ()=> {
    formData.name = ''
    // getTableData()
  }
  const add = ()=> {
    router.push({
      name: 'moduleCreate'
    })
  }
  const handelStatus = (val)=> {
    console.log(val)
  }
  const viewDetail = (val)=> {
    console.log(val)
  }
  const deleteRow = (val)=> {
    console.log(val)
  }
</script>

<template>
  <el-card>
    <template #header>
      <span class="text-sm">{{route.matched[1].meta.title}}</span>
    </template>
    <div class="flex justify-between border-b pb-2">
      <el-form
        :inline="true"
        :model="formData"
      >
        <el-form-item label="模块名称">
          <el-input v-model="formData.name" placeholder="请输入模块名称"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="py-2 border-b">
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="模块名称" props="name"></el-table-column>
      <el-table-column label="包含页面" props="name"></el-table-column>
      <el-table-column label="启用状态" props="name">
        <template #default="scope">
          <el-switch v-model="scope.row.name" @change="handelStatus"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="viewDetail(scope.row.id)">详情</el-button>
          <el-button type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
