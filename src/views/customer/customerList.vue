<script setup>
  import useList from '../../hooks/useList';
  import { empower_status, examine_status } from '../../config/enum';
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
    name: '',
    phone: ''
  })
  const search = ()=> {
    getTableData('/merchant', formData, 'get')
  }
  const reset = ()=> {
    formData.name = ''
    formData.phone = ''
    search()
  }
  const handelStatus = (row)=> {
    proxy.$apis.merchantExamine({
      enable_status: row.enable_status,
      examine_status: row.examine_status,
      company_merchant_user_id: row.id
    }).then(res=> {
      ElMessage({
        message: row.enable_status == 'NO_ENABLE' ? '关闭成功' : '启用成功',
        type: 'success',
      })
      search()
    })
  }
  const deleteRow = (id)=> {
    proxy.$apis.merchantDel(id).then(res=> {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      search()
    })
  }
  const audit = (val)=> {
    proxy.$apis.merchantExamine({
      enable_status: row.enable_status,
      examine_status: 'TAKE_EXAMINES',
      company_merchant_user_id: row.id
    }).then(res=> {
      ElMessage({
        message: '审核成功',
        type: 'success',
      })
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
        <el-form-item label="客户名称">
          <el-input v-model="formData.name" placeholder="请输入客户名称" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="formData.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <div class="py-2 border-b">
      <el-button type="primary" @click="add('customerCreate')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column align="center" label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="客户名称" prop="name"></el-table-column>
      <el-table-column align="center" label="手机号码" prop="phone"></el-table-column>
      <el-table-column align="center" label="客户云平台账号" prop="username"></el-table-column>
      <el-table-column align="center" label="业务联系人" prop="salesman"></el-table-column>
      <el-table-column align="center" label="小程序授权状态" prop="empower_status">
        <template #default="scope">
          {{empower_status[scope.row.empower_status]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="启用状态" prop="enable_status">
        <template #default="scope">
          <el-switch v-model="scope.row.enable_status" active-value="TAKE_ENABLE" inactive-value="NO_ENABLE" @change="handelStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" prop="created_at"></el-table-column>
      <el-table-column align="center" label="审核状态" prop="examine_status">
        <template #default="scope">
          {{examine_status[scope.row.examine_status]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template #default="scope">
          <el-button type="primary" @click="audit(scope.row.id)" v-show="scope.row.examine_status == 'NO_EXAMINES'">审核</el-button>
          <el-button type="primary" @click="viewDetail('customerUpdate', scope.row.id)">详情</el-button>
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
