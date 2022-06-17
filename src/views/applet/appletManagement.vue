<script setup>
  import { build_status, examine_status } from '../../config/enum'
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
    route,
    proxy
  } = useList()
  const search = ()=> {
    getTableData('/mini_version_upload', {}, 'get')
  }
  const buildAll = ()=> {

  }
  const buildApplet = (row)=> {
    // proxy.$apis.miniVersionUpload({
    //   template_version: '1.0.0',
    //   app_version: row.applet_version,
    //   company_merchant_user_id: row.app_id
    // }).then(res=> {
    //   console.log(res)
    // })
  }
  const auditApplet = (row)=> {
  //   proxy.$apis.miniVersionAudit({
      
  //   }).then(res=> {

  //   })
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
      <el-table-column align="center" label="#" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="公司名称" prop="company_name"></el-table-column>
      <el-table-column align="center" label="支付宝APPID" prop="app_id"></el-table-column>
      <el-table-column align="center" label="是否构建" prop="build_or_not">
        <template #default="scope">
          {{build_status[scope.row.build_or_not]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态" prop="examine_status">
        <template #default="scope">
          {{examine_status[scope.row.examine_status]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="小程序版本号" prop="applet_version"></el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template #default="scope">
          <el-button type="primary" @click="buildApplet(scope.row)">构建小程序</el-button>
          <el-button type="danger" @click="auditApplet(scope.row)">提交审核</el-button>
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
