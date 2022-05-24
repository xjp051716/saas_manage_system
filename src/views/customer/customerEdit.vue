<script setup>
  import useEdit from '../../hooks/useEdit'
  const {
    proxy,
    route,
    submitForm,
    goBack,
    submitKeep,
    submit,
    reset
  } = useEdit()
  const formData = reactive({
    name: '',
    account: '',
    password: '',
    modules: [],
    status: '未授权'
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
  const rules = reactive({
    name: [{ validator: validateName, trigger: 'blur', required: true }],
    status: [{
      required: true,
      message: '请选择是否禁用',
      trigger: 'change'
    }]
  })
  const post = {
    touch: 'input',
    action: '/get_admin_biz_user',
    placeholder: '请选择业务员',
    search: {key: 'name', label: '业务员'},
    tableParams: [{key: 'name', label: '业务员'}],
  }
  const moduleList = [
    { label: '基础模块', value: '1' },
    { label: '电商模块', value: '2' },
  ]
  const setUser = (val)=> {
    console.log(val)
    if(val) {
      formData.user = val.name;
      formData.user_id = val.id;
    }else{
      formData.user = '';
      formData.user_id = '';
    }
  }
  const impower = ()=> {
    window.open('https://openauth.alipay.com/oauth2/appToAppBatchAuth.htm?app_id=2021003126691188&application_type=TINYAPP,WEBAPP,MOBILEAPP,PUBLICAPP&redirect_uri=http%3A%2F%2Fmanage.magexiot.com%2Fv2%2Fali_merchant_authorize','blank')
  }
  
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
      label-width="120px"
    >
      <el-row justify="space-around">
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入客户名称" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="客户手机/电话" prop="name">
            <el-input v-model="formData.name" placeholder="请输入手机/电话"></el-input>
          </el-form-item>
          <el-form-item label="业务员" prop="name">
            <simple-select
              class="w-full"
              v-model="formData.name"
              v-bind="post"
              @confirm="setUser"
            ></simple-select>
          </el-form-item>
          <el-form-item label="模块配置" prop="modules">
            <el-checkbox-group v-model="formData.modules">
              <el-checkbox
                v-for="item in moduleList"
                :label="item.value"
              > {{item.label}} </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="mt-10 mb-4 text-sm ml-10">支付宝配置：</div>
          <el-form-item label="PID" prop="name">
            <el-input v-model="formData.name" placeholder="请输入PID"></el-input>
          </el-form-item>
          <el-form-item label="APPID" prop="name">
            <el-input v-model="formData.name" placeholder="请输入APPID"></el-input>
          </el-form-item>
          <el-form-item label="授权码" prop="name">
            <el-input v-model="formData.name" placeholder="请输入授权码"></el-input>
          </el-form-item>
          <el-form-item label="授权状态">
            <span :class="formData.status == '未授权' ? 'text-red-500' : 'text-green-500'">{{formData.status}}</span>
            <el-button class="ml-4" type="primary" size="small" @click="impower">去授权</el-button>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="客户联系人" prop="name">
            <el-input v-model="formData.name" placeholder="请输入客户联系人" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="客户云平台账号" prop="account">
            <el-input v-model="formData.account" placeholder="请输入账号" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password" placeholder="请输入密码" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button type="success" @click="submitKeep(submitForm, formData)">提交并继续添加</el-button>
        <el-button type="primary" @click="submit(submitForm, formData)">提交</el-button>
        <el-button @click="reset(submitForm)">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>
