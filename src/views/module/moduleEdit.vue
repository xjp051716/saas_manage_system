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
    enable_status: 'TAKE_ENABLE',
    company_menus: []
  })
  const validateName = (rule, value, callback)=> {
    if(value === '') {
      callback(new Error('模块名称不能为空'))
    }else if(!proxy.$regular.isNumber_AZ_Chinese(value)) {
      callback(new Error('请输入中文、字母、数字，最大20个字符'))
    }else {
      callback()
    }
  }
  const rules = reactive({
    name: [{ validator: validateName, trigger: 'blur', required: true }],
    enable_status: [{
      required: true,
      message: '请选择是否禁用',
      trigger: 'change'
    }]
  })
  const post = {
    touch: 'button',
    action: '/menu',
    max: 9,
    tableParams: [{key: 'name', label: '菜单名称'}],
  }
  // const inputVisible = ref(false)
  // const inputRef = ref(null)
  // const inputValue = ref('')
  const setMenu = (val)=> {
    if(val.length) {
      let exist = false;
      val.map(item=> {
        exist = formData.value.company_menus.some(menu=> {
          return item.id == menu.id
        })
        if(!exist) formData.value.company_menus.push(item)
      })
    }
  }
  // const handleInputConfirm = ()=> {
  //   if(inputValue.value) {
  //     addMenu(inputValue.value)
  //   }
  //   inputVisible.value = false
  //   inputValue.value = ''
  // }
  // const addMenu = (name)=> {
  //   proxy.$apis.menuAdd({
  //     name
  //   }).then(res=> {
  //     ElMessage({
  //       type: 'success',
  //       message: '菜单新增成功',
  //     })
  //     formData.value.company_menus.push(res.data)
  //   })
  // }
  // const showInput = ()=> {
  //   inputVisible.value = true
  //   nextTick(()=> {
  //     inputRef.value.input.focus()
  //   })
  // }
  const handleClose = (val)=> {
    formData.value.company_menus.splice(val, 1)
  }
  onMounted(()=> {
    id.value = route.query.id
    api_name.value = id.value ? 'modularityUpdate' : 'modularityAdd'
    if(id.value) {
      proxy.$apis.modularityDetail(id.value).then(res=> {
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
          <el-form-item label="是否禁用" prop="enable_status">
            <el-radio v-model="formData.enable_status" label="NO_ENABLE">是</el-radio>
            <el-radio v-model="formData.enable_status" label="TAKE_ENABLE">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item label="菜单选择">
            <simple-select
              class="w-full"
              v-bind="post"
              @confirm="setMenu"
            >
              <div class="flex items-center">
                <el-tag
                  v-for="(tag,index) in formData.company_menus"
                  :key="index"
                  closable
                  class="mr-2"
                  size="large"
                  @close="handleClose(index)"
                >{{tag.name}}</el-tag>
                <!-- <el-input
                  ref="inputRef"
                  v-model="inputValue"
                  class="mr-2 w-input"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="mr-2" @click.stop="showInput">
                  + 自定义
                </el-button>  -->
              </div>
            </simple-select>
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
.w-input {
  width: 5rem !important;
}
</style>
