<script setup>
  import { Base64 } from 'js-base64'
  import apis from "../api/apis"
  const store = useStore()
  const router = useRouter()
  const loginForm = ref(null)
  const form = reactive({
    username: '',
    password: ''
  })
  const rules = reactive({
    username: [
      { required: true, message: '账号不能为空', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
  })
  const login = async (formEl) => {
    if(!formEl) return
    await formEl.validate(valid=> {
      if(valid) {
        apis.login(form).then(res=> {
          router.push('/')
          localStorage.setItem('token', `basic ${Base64.encode(res.data + ':')}`)
        })
      }
    })
  }
  const version = computed(()=> {
    return store.state.version
  })
</script>

<template>
  <div class="bg-cover h-screen bg-own-green flex items-center justify-center">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      class="bg-white w-120 px-9 pt-9 pb-6 rounded-md"
      size="large"
    >
      <div class="font-bold text-3xl pb-9 flex items-center justify-center">
        <span>SAAS管理后台</span>
        <el-tag class="ml-3" effect="dark">
          <span class="text-sm font-semibold">V{{version}}</span>
        </el-tag>
      </div>
      <el-form-item prop="username">
        <el-input placeholder="请输入账号" v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model.trim="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" @click="login(loginForm)">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>
