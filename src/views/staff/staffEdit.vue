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
  const id = ref('')
  const api_name = ref('')
  const formData = ref({
    head_image: '',
    phone: "",
    rel_name: "",
    sex: '1',
    status: "NORMOL",
    username: "",
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
  const validatePhone = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('手机号码不能为空'))
    }else if(!proxy.$regular.isPhone(value)) {
      callback(new Error('手机号码格式不正确'))
    }else {
      callback()
    }
  }
  const validateUsername = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('账号不能为空'))
    }else if(!proxy.$regular.isNumber_AZ(value)) {
      callback(new Error('请输入字母、数字，5-20位字符'))
    }else {
      callback()
    }
  }
  const validatePassword = (rule, value, callback)=> {
    if(value === undefined || value === '') {
      callback(new Error('密码不能为空'))
    }else if(!proxy.$regular.isNumber_AZdwon(value) || value.length < 6) {
      callback(new Error('请输入数字、字母、下划线，6-20位字符'))
    }else {
      callback()
    }
  }
  const validatePassword1 = (rule, value, callback)=> {
    if(value && (!proxy.$regular.isNumber_AZdwon(value) || value.length < 6)) {
      callback(new Error('请输入数字、字母、下划线，6-20位字符'))
    }else {
      callback()
    }
  }
  const rules = reactive({
    rel_name: [{ validator: validateName, trigger: 'blur', required: true }],
    phone: [{ validator: validatePhone, trigger: 'blur', required: true }],
    username: [{ validator: validateUsername, trigger: 'blur', required: true }],
    password: [{ validator: validatePassword, trigger: 'blur', required: true }],
    old_password: [{ validator: validatePassword1, trigger: 'blur', required: true  }],
    new_password: [{ validator: validatePassword1, trigger: 'blur', required: true }],
    status: [{ required: true, message: '请选择是否禁用', trigger: 'change' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    // head_image: [{ required: true, message: '请上传头像', trigger: 'change' }]
  })
  const setImage = (val)=> {
    formData.value.head_image = val[0].url
    console.log(formData.value)
  }
  onMounted(()=> {
    id.value = route.query.id
    api_name.value = id.value ? 'userUpdate' : 'userAdd'
    if(id.value) {
      proxy.$apis.userDetail(id.value).then(res=> {
        res.data.sex += ''
        fileList.value = res.data.head_image ? [{
          name: res.data.head_image,
          url: res.data.head_image
        }] : []
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
      label-width="120px"
    >
      <el-row justify="space-around">
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="真实姓名" prop="rel_name">
            <el-input v-model="formData.rel_name" placeholder="请输入真实姓名" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="formData.sex" label="1">男</el-radio>
            <el-radio v-model="formData.sex" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="是否禁用" prop="status">
            <el-radio v-model="formData.status" label="DISABLE">是</el-radio>
            <el-radio v-model="formData.status" label="NORMOL">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="9">
          <el-form-item label="账号" prop="username">
            <el-input v-model="formData.username" placeholder="请输入账号" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="!id">
            <el-input type="password" v-model="formData.password" placeholder="请输入密码" maxlength="20" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="old_password" v-if="!!id">
            <el-input type="password" v-model="formData.old_password" placeholder="不修改请留空" maxlength="20" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password" v-if="!!id">
            <el-input type="password" v-model="formData.new_password" placeholder="不修改请留空" maxlength="20" autocomplete="new-password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="border-t text-sm font-semibold py-4 text-own-green">更多信息</div>
      <el-form-item label="头像" prop="head_image">
        <upload v-model:fileList="fileList" @setImage="setImage"></upload>
      </el-form-item>
      <div class="text-center mt-6">
        <el-button type="success" @click="submitKeep(submitForm, formData, api_name)" v-if="!id">提交并继续添加</el-button>
        <el-button type="primary" @click="submit(submitForm, formData, api_name)">提交</el-button>
        <el-button @click="reset(submitForm)" v-if="!id">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>
