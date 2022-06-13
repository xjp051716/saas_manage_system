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
    route
  } = useList()
  const search = ()=> {
    // getTableData()
  }
  const handelStatus = (val)=> {
    console.log(val)
  }
  const buildAll = ()=> {

  }
  const buildApplet = (val)=> {
    console.log(val)
  }
  const auditApplet = (val)=> {
    console.log(val)
  }
</script>

<template>
  <el-card>
    <template #header>
      <span class="text-sm">{{route.matched[1].meta.title}}</span>
    </template>
    <div class="flex justify-between border-b pb-4">
      <div>
        <span class="text-sm">线上版本号：v1.0.0</span>
        <el-button class="ml-4" type="primary" @click="buildAll">构建商家小程序版本</el-button>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
    >
      <el-table-column label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="公司名称" prop="name"></el-table-column>
      <el-table-column label="支付宝APPID" prop="name"></el-table-column>
      <el-table-column label="是否构建" prop="name"></el-table-column>
      <el-table-column label="审核状态" prop="name"></el-table-column>
      <el-table-column label="小程序版本号" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="buildApplet(scope.row.id)">构建小程序</el-button>
          <el-button type="danger" @click="auditApplet(scope.row.id)">提交审核</el-button>
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
