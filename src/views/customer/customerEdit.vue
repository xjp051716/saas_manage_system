<script setup>
  import useEdit from '../../hooks/useEdit'
  import { empower_status } from '../../config/enum';
  const {
    proxy,
    route,
    submitForm,
    goBack,
    submitKeep,
    submit,
    reset
  } = useEdit()
  const id = ref('')
  const api_name = ref('')
  const formData = ref({
    name: '',
    phone: '',
    company_modular: [],
    company_user: '',
    company_user_id: '',
    pid: '',
    app_id: '',
    auth_code: '',
    salesman: '',
    username: '',
    empower_status: 'NO_EMPOWER'
  })
  const validateName = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('客户名称不能为空'))
    }else if(!proxy.$regular.isNumber_AZ_Chinese(value)) {
      callback(new Error('请输入中文、字母、数字，最大50个字符'))
    }else {
      callback()
    }
  }
  const validatePhone = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('客户电话不能为空'))
    }else if(!proxy.$regular.customerPhone(value)) {
      callback(new Error('请输入数字或横线，最小11个字符，最大15个字符'))
    }else {
      callback()
    }
  }
  const validateSalesman = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('客户联系人不能为空'))
    }else if(!proxy.$regular.isNumber_AZ_Chinese(value)) {
      callback(new Error('请输入中文、字母、数字，最大10个字符'))
    }else {
      callback()
    }
  }
  const validateUsername = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('云平台账号不能为空'))
    }else if(!proxy.$regular.isNumber_AZ(value) || value.length < 5) {
      callback(new Error('请输入字母、数字，5-20位字符'))
    }else {
      callback()
    }
  }
  const validatePassword = (rule, value, callback)=> {
    if(!id.value) {
      if(value === '') {
        callback(new Error('密码不能为空'))
      }else if(!proxy.$regular.isNumber_AZdwon(value) || value.length < 6) {
        callback(new Error('请输入数字、字母、下划线，6-20位字符'))
      }else {
        callback()
      }
    }else {
      if(value && (!proxy.$regular.isNumber_AZdwon(value) || value.length < 6)) {
        callback(new Error('请输入数字、字母、下划线，6-20位字符'))
      }else {
        callback()
      }
    }
  }
  const rules = reactive({
    name: [{ validator: validateName, trigger: 'blur', required: true }],
    phone: [{ validator: validatePhone, trigger: 'blur', required: true }],
    company_user: [{ required: true, trigger: 'change', message: '请选择业务员' }],
    salesman: [{ validator: validateSalesman, trigger: 'blur', required: true }],
    username: [{ validator: validateUsername, trigger: 'blur', required: true }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    pid: [{ required: true, message: 'PID不能为空', trigger: 'blur' }],
    app_id: [{ required: true, message: 'APPID不能为空', trigger: 'blur' }],
    auth_code: [{ required: true, message: '授权码不能为空', trigger: 'blur' }],
    empower_status: [{ required: true, message: '请选择是否禁用', trigger: 'change' }]
  })
  const post = {
    touch: 'input',
    action: '/user',
    placeholder: '请选择业务员',
    query: { status: 'NORMOL' },
    search: {key: 'rel_name', label: '业务员'},
    tableParams: [{key: 'rel_name', label: '业务员'}, {key: 'phone', label: '手机号码'}],
  }
  const moduleList = ref([])
  const getModule = ()=> {
    proxy.$apis.modularity().then(res=> {
      moduleList.value = res.data
    })
  }
  const setUser = (val)=> {
    if(val) {
      formData.value.company_user = val.rel_name;
      formData.value.company_user_id = val.id;
    }else{
      formData.value.company_user = '';
      formData.value.company_user_id = '';
    }
  }
  const impower = ()=> {
    window.open('https://openauth.alipay.com/oauth2/appToAppBatchAuth.htm?app_id=2021003126691188&application_type=TINYAPP,WEBAPP,MOBILEAPP,PUBLICAPP&redirect_uri=http%3A%2F%2Fmanage.magexiot.com%2Fv2%2Fali_merchant_authorize','blank')
  }
  onMounted(()=> {
    id.value = route.query.id
    api_name.value = id.value ? 'merchantUpdate' : 'merchantAdd'
    getModule()
    if(id.value) {
      proxy.$apis.merchantDetail(id.value).then(res=> {
        formData.value = res.data
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
      label-width="130px"
    >
      <el-row justify="space-around">
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入客户名称" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="客户手机/电话" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机/电话" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="业务员" prop="company_user">
            <simple-select
              class="w-full"
              v-model="formData.company_user"
              v-bind="post"
              @confirm="setUser"
            ></simple-select>
          </el-form-item>
          <el-form-item label="模块配置" prop="company_modularise">
            <el-checkbox-group v-model="formData.company_modularise">
              <el-checkbox
                v-for="item in moduleList"
                :label="item.id"
              > {{item.name}} </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="mt-10 mb-4 text-sm ml-10">支付宝配置：</div>
          <el-form-item label="PID" prop="pid">
            <el-input v-model="formData.pid" placeholder="请输入PID"></el-input>
          </el-form-item>
          <el-form-item label="APPID" prop="app_id">
            <el-input v-model="formData.app_id" placeholder="请输入APPID"></el-input>
          </el-form-item>
          <el-form-item label="授权码" prop="auth_code">
            <el-input v-model="formData.auth_code" placeholder="请输入授权码"></el-input>
          </el-form-item>
          <el-form-item label="授权状态">
            <span :class="formData.empower_status == 'NO_EMPOWER' ? 'text-red-500' : 'text-green-500'">{{empower_status[formData.empower_status]}}</span>
            <el-button class="ml-4" type="primary" size="small" @click="impower">去授权</el-button>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="客户联系人" prop="salesman">
            <el-input v-model="formData.salesman" placeholder="请输入客户联系人" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="客户云平台账号" prop="username">
            <el-input v-model="formData.username" placeholder="请输入账号" maxlength="20" :readonly="!!id"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password" :placeholder="!id ? '请输入密码' : '不修改请留空'" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button type="success" @click="submitKeep(submitForm, formData, api_name)" v-if="!id">提交并继续添加</el-button>
        <el-button type="primary" @click="submit(submitForm, formData, api_name)">提交</el-button>
        <el-button @click="reset(submitForm)" v-if="!id">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>
