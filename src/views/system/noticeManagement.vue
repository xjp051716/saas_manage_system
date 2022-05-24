<script setup>
  import useList from '../../hooks/useList'
  const {
    currPage,
    pageSize,
    total,
    pageLayout,
    tableData,
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
      name: 'noticeCreate'
    })
  }
  const release = (val)=> {
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
    <div class="flex justify-between border-b">
      <el-form
        :inline="true"
        :model="formData"
      >
        <el-form-item label="公告名称">
          <el-input v-model="formData.name" placeholder="请输入公告名称"></el-input>
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
      <el-table-column label="公告名称" props="name"></el-table-column>
      <el-table-column label="创建时间" props="name"></el-table-column>
      <el-table-column label="截至时间" props="name"></el-table-column>
      <el-table-column label="状态" props="name"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="release(scope.row.id)">发布</el-button>
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
