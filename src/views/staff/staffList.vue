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
    rel_name: '',
    status: 'NORMOL'
  })
  const search = ()=> {
    getTableData('/user', formData, 'get')
  }
  const reset = ()=> {
    formData.rel_name = ''
    formData.status = 'NORMOL'
    search()
  }
  const deleteRow = (id)=> {
    proxy.$apis.userDel(id).then(res=> {
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
        <el-form-item label="真实姓名">
          <el-input v-model="formData.rel_name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-select v-model="formData.status">
            <el-option label="是" value="DISABLE"></el-option>
            <el-option label="否" value="NORMOL"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="py-2 border-b">
      <el-button type="primary" @click="add('staffCreate')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column align="center" label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="真实姓名" prop="rel_name"></el-table-column>
      <el-table-column align="center" label="性别" prop="sex"></el-table-column>
      <el-table-column align="center" label="手机号码" prop="phone"></el-table-column>
      <el-table-column align="center" label="是否禁用" prop="status">
        <template #default="scope">
          {{scope.row.status == 'NORMOL' ? '否' : '是'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="viewDetail('staffUpdate',scope.row.id)">详情</el-button>
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
