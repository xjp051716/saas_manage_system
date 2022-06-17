<script setup>
  import useEdit from '../../hooks/useEdit'
  const {
    proxy,
    route,
    submitForm,
    goBack,
    submit,
    reset
  } = useEdit()
  const id = ref('')
  const api_name = ref('')
  const formData = ref({
    biz_no_prefix: '',
    biz_no_suffix_len: '',
    write_off_type: 'qrcode',
    template_style_info: {
      card_show_name: '',
      logo_id: '',
      background_id: '',
      bg_color: 'rgb(55,112,179)',
      feature_descriptions: []
    },
    column_info_list: [{
      code: "BALANCE",
      title: "会员专享"
    }],
    field_rule_list: [{
      field_name: "Balance",
      rule_name: "ASSIGN_FROM_REQUEST",
      rule_value: "Balance"
    }],
    open_card_conf: {
      open_card_source_type: 'ISV',
      open_card_url: 'https://www.alipay.com',
      card_rights: []
    }
  })
  const validateSuffixLen =  (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('业务卡号后缀长度不能为空'))
    }else if(!proxy.$regular.isNumber(value) || value > 32 || value < 8) {
      callback(new Error('请输入数字，取值范围8-32'))
    }else {
      callback()
    }
  }
  const validateCardRights = (rule, value, callback)=> {
    if(value.length) {
      let isTitle = value.some(item=> {
        return item.title == ''
      })
      if(isTitle) callback(new Error('必须输入权益标题'))
      else callback()
    }else {
      callback()
    }
  }
  const rules = reactive({
    biz_no_prefix: [{
      required: true,
      message: '业务卡号前缀不能为空',
      trigger: 'blur'
    }],
    biz_no_suffix_len: [{
      validator: validateSuffixLen,
      required: true,
      trigger: 'blur'
    }],
    'template_style_info.feature_descriptions': [{
      required: true,
      message: '特色信息不能为空',
      trigger: 'blur'
    }],
    'template_style_info.card_show_name': [{
      required: true,
      message: '标题显示不能为空',
      trigger: 'blur'
    }],
    'open_card_conf.card_rights': [{
      validator: validateCardRights,
      required: true,
      trigger: 'change'
    }],
    'template_style_info.logo_id': [{
      required: true,
      message: '请上传LOGO图片',
      trigger: 'change'
    }],
    'template_style_info.background_id': [{
      required: true,
      message: '请上传背景图片',
      trigger: 'change'
    }],
  })
  const addCardRights = ()=> {
    formData.value.open_card_conf.card_rights.push({
      title: '',
      logo_id: '',
      detail: ''
    })
  }
  onMounted(()=> {
    id.value = route.query.id
    api_name.value = route.name=="clubCardUpdate" ? 'cardTemplateSet' : 'cardTemplateSet'
    if(route.name=="clubCardUpdate") {
      proxy.$apis.cardTemplateQuery({company_merchant_user_id: id.value}).then(res=> {
        Object.assign(formData.value, res.data)
        formData.value.company_merchant_user_id = id.value
      })
    }
  })
  
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-sm">{{route.matched[1].meta.title}}</span>
        <el-button @click="goBack">
          <el-icon size="16"><i-ep-arrowLeft /></el-icon>
          返回列表
        </el-button>
      </div>
    </template>
    <el-form
      ref="submitForm"
      :model="formData"
      :rules="rules"
      label-width="140px"
    >
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="标题显示" prop="template_style_info.card_show_name">
            <el-input v-model="formData.template_style_info.card_show_name" placeholder="请输入标题显示" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="特色信息" prop="template_style_info.feature_descriptions">
            <el-input v-model="formData.template_style_info.feature_descriptions" placeholder="请输入特色信息"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="业务卡号前缀" prop="biz_no_prefix">
            <el-input v-model="formData.biz_no_prefix" placeholder="请输入业务卡号前缀" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="业务卡号后缀长度" prop="biz_no_suffix_len">
            <el-input v-model="formData.biz_no_suffix_len" placeholder="请输入业务卡号后缀长度" maxlength="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="领卡权益信息" prop="open_card_conf.card_rights">
        <el-button type="primary" @click="addCardRights">新增</el-button>
        <el-table
          :data="formData.open_card_conf.card_rights"
          stripe
        >
          <el-table-column align="center" label="#" type="index"></el-table-column>
          <el-table-column align="center" label="权益标题" prop="title" width="200">
            <template #default="scope">
              <el-input v-model="scope.row.title" placeholder="请输入权益标题" maxlength="10"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="权益图片" prop="logo_id">
            <template #default="scope">
              <ali-upload v-model:fileList="scope.row.logo_id" :userid="route.query.id" :show-file-list="false"></ali-upload>
            </template>
          </el-table-column>
          <el-table-column align="center" label="权益详情" prop="detail" width="400">
            <template #default="scope">
              <el-input v-model="scope.row.detail" placeholder="请输入权益详情" maxlength="20"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="LOGO图片" prop="template_style_info.logo_id">
        <ali-upload 
          v-model:fileList="formData.template_style_info.logo_id"
          :sizeLimit="1"
          :userid="route.query.id"
          tips="格式jpeg、jpg；尺寸不小于500*500px的正方形；请优先使用商家LOGO"
        ></ali-upload>
      </el-form-item>
      <el-form-item label="背景图片" prop="template_style_info.background_id">
        <ali-upload 
          v-model:fileList="formData.template_style_info.background_id"
          :userid="route.query.id"
          tips="格式jpeg、jpg；尺寸不小于1020*643px；图片不得有圆角，不得拉伸变形"
        ></ali-upload>
      </el-form-item>
      <div class="text-center">
        <el-button type="primary" @click="submit(submitForm, formData, api_name)">提交</el-button>
        <el-button @click="reset(submitForm)" v-if="!id">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>
