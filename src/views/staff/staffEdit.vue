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
    status: '0',
    gender: '1'
  })
  const fileList = ref([])
  const validateName = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('真实姓名不能为空'))
    }else if(!proxy.$regular.isNumber_AZ_Chinese(value)) {
      callback(new Error('请输入中文、字母、数字，最大10个字符'))
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
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入真实姓名" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="name">
            <el-input v-model="formData.name" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="formData.gender" label="1">男</el-radio>
            <el-radio v-model="formData.gender" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="是否禁用" prop="status">
            <el-radio v-model="formData.status" label="1">是</el-radio>
            <el-radio v-model="formData.status" label="0">否</el-radio>
          </el-form-item>
          <div class="border-t text-sm font-semibold py-4 text-own-green">更多信息</div>
          <upload v-model:fileList="fileList"></upload>
        </el-col>
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="账号" prop="account">
            <el-input v-model="formData.account" placeholder="请输入账号" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password" :placeholder="route.query.id ? '不修改请留空' : '请输入密码'" maxlength="20" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="formData.repassword" :placeholder="route.query.id ? '不修改请留空' : '请输入确认密码'" maxlength="20" autocomplete="new-password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center mt-6">
        <el-button type="success" @click="submitKeep(submitForm, formData)">提交并继续添加</el-button>
        <el-button type="primary" @click="submit(submitForm, formData)">提交</el-button>
        <el-button @click="reset(submitForm)">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>
