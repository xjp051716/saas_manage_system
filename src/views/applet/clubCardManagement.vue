<script setup>
  import useList from '../../hooks/useList'
  const {
    currPage,
    pageSize,
    total,
    pageLayout,
    tableData,
    handleCurrPage,
    getTableData,
    router,
    route,
    proxy
  } = useList()
  const dialogVisible = ref(false)
  const common_fields = ref([])
  const id = ref('')
  const cardFields = ref([
    {
      label: '手机号',
      value: 'OPEN_FORM_FIELD_MOBILE'
    },
    {
      label: '性别',
      value: 'OPEN_FORM_FIELD_GENDER'
    },
    {
      label: '姓名',
      value: 'OPEN_FORM_FIELD_NAME'
    },
    {
      label: '生日',
      value: 'OPEN_FORM_FIELD_BIRTHDAY'
    },
    {
      label: '城市',
      value: 'OPEN_FORM_FIELD_CITY'
    }
  ])
  const search = ()=> {
    getTableData('/vip_template', {}, 'post')
  }
  const cardTemplateSet = (data)=> {
    if(data.template_id=='/') {
      router.push({
        name: 'clubCardCreate',
        query: {
          id: data.id
        }
      })
    }else {
      router.push({
        name: 'clubCardUpdate',
        query: {
          id: data.id
        }
      })
    }
  }
  const setCardInfo = (data)=> {
    id.value = data.id
    common_fields.value = data.common_fields == '/' ? [] : data.common_fields
    dialogVisible.value = true
  }
  const submitCardFields = ()=> {
    proxy.$apis.cardFormTemplate({
      company_merchant_user_id: id.value,
      common_fields: common_fields.value
    }).then(res=> {
      if(res.code == 200) {
        ElMessage({
          type: 'success',
          message: '保存成功'
        })
        dialogVisible.value = false;
        search()
      }else {
        ElMessage({
          type: 'error',
          message: res.data.msg
        })
      }
    })
  }
  const getPutLink = (id)=> {
    proxy.$apis.getAliCardUrl({
      company_merchant_user_id: id,
    }).then(res=> {
      search()
    })
  }
  const toolValue = (value, len)=> {
    return len ? decodeURIComponent(value).substring(0, len) + '...' : decodeURIComponent(value)
  }
  onActivated(()=> {
    search()
  })
</script>

<template>
  <el-row :gutter="20">
    <el-col v-for="(item,index) in tableData" :key="index" :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
      <el-card class="mb-4 text-sm">
        <div class="mb-2">商户名称：{{item.name}}</div>
        <div class="mb-2">APPID：{{item.app_id}}</div>
        <div class="mb-2">
          <span class="mr-4">会员卡模板id：
            <span v-if="item.template_id == '/'">无</span>
            <el-tooltip
              effect="dark"
              :content="item.template_id"
              placement="bottom"
              v-else
            >
              {{toolValue(item.template_id, 14)}}
            </el-tooltip>
          </span>
          <el-button type="primary" size="small" @click="cardTemplateSet(item)">{{item.template_id=='/' ? '新增' : '修改'}}</el-button>
        </div>
        <div class="mb-2">
          <span class="mr-4">配置领卡表单：{{item.common_fields == '/' ? '无' : '已完成'}}</span>
          <el-button type="primary" size="small" :disabled="item.template_id == '/'" @click="setCardInfo(item)">{{item.common_fields == '/' ? '新增' : '修改'}}</el-button>
        </div>
        <div class="mb-2">
          <span class="mr-4">投放链接：
            <span v-if="item.activate_url == '/'">无</span>
            <el-tooltip
              effect="dark"
              placement="bottom"
              v-else
            >
              <template #content>
                <div style="width: 400px">
                  <a :href="toolValue(item.activate_url)" target="_blank">{{toolValue(item.activate_url)}}</a>
                </div>
              </template>
              {{toolValue(item.activate_url, 20)}}
            </el-tooltip>
          </span>
          <el-button v-show="item.activate_url == '/' && item.common_fields != '/'" type="primary" size="small" @click="getPutLink(item.id)">获取</el-button>
        </div>
        <div>已发会员卡数量：{{item.issued_card == '/' ? 0 : item.issued_card}}</div>
      </el-card>
    </el-col>
  </el-row>
  <el-pagination
    class="float-right my-4"
    :layout="pageLayout"
    :default-current-page="1"
    :total="total"
    :page-size="pageSize"
    :current-page="currPage"
    @current-change="handleCurrPage"
  ></el-pagination>
  <el-dialog v-model="dialogVisible" title="领卡信息选择（多选，必选一项）" width="400px">
    <el-checkbox-group
      v-model="common_fields"
    >
      <div v-for="item in cardFields" :key="item.value">
        <el-checkbox :label="item.value">{{
          item.label
        }}</el-checkbox>
      </div>
    </el-checkbox-group>
    <div class="text-center">
      <el-button type="primary" @click="submitCardFields">确定</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>