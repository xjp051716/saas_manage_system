<script setup>
  const cardList = ref([{}])
  const getCardId = ()=> {

  }
  const setCardInfo = ()=> {
    
  }
  const getPutLink = ()=> {
    
  }
</script>

<template>
  <el-row :gutter="20">
    <el-col v-for="(item,index) in cardList" :key="index" :span="6">
      <el-card class="mb-4 text-sm">
        <div class="mb-2">商户名称：111</div>
        <div class="mb-2">APPID：222</div>
        <div class="mb-2">
          <span class="mr-4">会员卡模板id：无</span>
          <el-button type="primary" size="small" @click="getCardId(item)">{{item.id ? '修改' : '新增'}}</el-button>
        </div>
        <div class="mb-2">
          <span class="mr-4">配置领卡表单：无</span>
          <el-button type="primary" size="small" @click="setCardInfo(item)">{{item.status ? '修改' : '新增'}}</el-button>
        </div>
        <div class="mb-2">
          <span class="mr-4">投放链接：无</span>
          <el-button v-show="!item.link" type="primary" size="small" @click="getPutLink(item)">获取</el-button>
        </div>
        <div>已发会员卡数量：0</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>