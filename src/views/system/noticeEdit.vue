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
    name: '',
    content: '',
    end_dt: '',
    release_status: 'NO_RELEASE'
  })
  const rules = reactive({
    name: [{
      required: true,
      message: '请输入公告名称',
      trigger: 'blur'
    }],
    content: [{
      required: true,
      message: '请输入公告内容',
      trigger: 'blur'
    }],
    end_dt: [{
      required: true,
      message: '请选择截至时间',
      trigger: 'change'
    }]
  })
  onMounted(()=> {
    id.value = route.query.id
    api_name.value = id.value ? 'noticeUpdate' : 'noticeAdd'
    if(id.value) {
      proxy.$apis.noticeDetail(id.value).then(res=> {
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
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="公告名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入公告名称" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="公告内容" prop="content">
            <el-input 
              v-model="formData.content" 
              placeholder="请输入公告内容"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 15}"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="截至显示时间" prop="end_dt">
            <el-date-picker
              v-model="formData.end_dt"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              :default-time="new Date(2000,1,1,23,59,59)"
            ></el-date-picker>
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
