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
    name: '',
    phone: ''
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
      name: 'customerCreate'
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
  const audit = (val)=> {
    
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
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column align="center" label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="客户名称" props="name"></el-table-column>
      <el-table-column align="center" label="手机号码" props="name"></el-table-column>
      <el-table-column align="center" label="客户云平台账号" props="name"></el-table-column>
      <el-table-column align="center" label="业务联系人" props="name"></el-table-column>
      <el-table-column align="center" label="小程序授权状态" props="name"></el-table-column>
      <el-table-column align="center" label="启用状态" props="name">
        <template #default="scope">
          <el-switch v-model="scope.row.name" @change="handelStatus"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" props="name"></el-table-column>
      <el-table-column align="center" label="审核状态" props="name"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="audit(scope.row.id)">审核</el-button>
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
