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
    viewDetail,
    add,
    router,
    route,
    proxy
  } = useList()
  const formData = reactive({
    name: ''
  })
  const search = ()=> {
    getTableData('/modularity', formData, 'get')
  }
  const reset = ()=> {
    formData.name = ''
    search()
  }
  const handelStatus = (row)=> {
    proxy.$apis.modularityUpdate(row).then(res=> {
      ElMessage({
        message: row.enable_status == 'NO_ENABLE' ? '关闭成功' : '启用成功',
        type: 'success',
      })
      search()
    })
  }
  const deleteRow = (id)=> {
    proxy.$apis.modularityDel(id).then(res=> {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      search()
    })
  }
  onActivated(()=> {
    search()
  })
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
        <el-form-item label="模块名称">
          <el-input v-model="formData.name" placeholder="请输入模块名称" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="py-2 border-b">
      <el-button type="primary" @click="add('moduleCreate')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column align="center" label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="模块名称" prop="name"></el-table-column>
      <el-table-column align="center" label="包含页面" prop="pages"></el-table-column>
      <el-table-column align="center" label="启用状态" prop="enable_status">
        <template #default="scope">
          <el-switch v-model="scope.row.enable_status" active-value="TAKE_ENABLE" inactive-value="NO_ENABLE" @change="handelStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="viewDetail('moduleUpdate', scope.row.id)">详情</el-button>
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
