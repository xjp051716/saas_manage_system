<script setup>
  import useList from '../../hooks/useList'
  import { release_status } from '../../config/enum'
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
    getTableData('/notice', formData, 'get')
  }
  const reset = ()=> {
    formData.name = ''
    search()
  }
  const release = (row)=> {
    row.release_status = 'TAKE_RELEASE'
    proxy.$apis.noticeUpdate(row).then(res=> {
      ElMessage({
        type: 'success',
        message: '发布成功'
      })
      search()
    })
  }
  const deleteRow = (id)=> {
    proxy.$apis.noticeDel(id).then(res=> {
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
      <el-button type="primary" @click="add('noticeCreate')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column align="center" label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="公告名称" prop="name"></el-table-column>
      <el-table-column align="center" label="创建时间" prop="created_at"></el-table-column>
      <el-table-column align="center" label="截至时间" prop="end_dt"></el-table-column>
      <el-table-column align="center" label="状态" prop="release_status">
        <template #default="scope">
          {{release_status[scope.row.release_status]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template #default="scope">
          <el-button type="primary" @click="release(scope.row)" v-show="scope.row.release_status === 'NO_RELEASE'">发布</el-button>
          <el-button type="primary" @click="viewDetail('noticeUpdate', scope.row.id)">详情</el-button>
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
