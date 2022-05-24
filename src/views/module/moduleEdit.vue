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
    status: '1'
  })
  const validateName = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('模块名称不能为空'))
    }else if(!proxy.$regular.isNumber_AZdwon(value)) {
      callback(new Error('请输入字母、数字、下划线，最大20个字符'))
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
      label-width="100px"
    >
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="模块名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入模块名称" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="是否禁用" prop="status">
            <el-radio v-model="formData.status" label="1">是</el-radio>
            <el-radio v-model="formData.status" label="0">否</el-radio>
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
