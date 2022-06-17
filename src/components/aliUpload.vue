<script setup>
  // 目前只支持单文件
  const props = defineProps({
    // 文件列表类型 "text" | "picture" | "picture-card"
    listType: {
      type: String,
      default: 'text'
    },
    fileList: {
      type: String,
      default: ''
    },
    sizeLimit: {
      type: Number,
      default: 2
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    tips: {
      type: String,
      default: '格式jpeg、jpg'
    },
    userid: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits([ 'update:fileList' ])
  const uploadUrl = ref('/v2/company/file_upload/')
  const dialogVisible = ref(false)
  const dialogImageUrl = ref('')
  const image_data = ref({
    image_type: 'jpg',
    image_name: `${parseInt(Math.random() * 10000000000000)}_${new Date().getTime()}`,
    company_merchant_user_id: props.userid,
  })
  const headers = ref({
    "Access-Control-Allow-Origin": "*",
    "Authorization": localStorage.getItem("token")
  })
  const preview_image = ref('')
  const handlePreview = (uploadFile)=> {
    if(uploadFile.url) {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    }
  }
  const handleRemove = (uploadFile, uploadFiles)=> {
    preview_image.value = ''
    emit('update:fileList', '')
  }
  const handleSuccess = (response, uploadFile, uploadFiles)=> {
    if(response.code == -1) {
      ElMessage({
        type: 'error',
        message: response.data.sub_msg,
      })
      fileListArr.value = []
    }else {
      preview_image.value = uploadFiles[0].response.data.image_url
      emit('update:fileList', uploadFiles[0].response.data.image_id)
    }
  }
  const beforeUpload = (file)=> {
    if(file.type !== 'image/jpeg') {
      ElMessage({
        type: 'error',
        message: '上传图像格式只能是 jpg 格式！',
      })
      return false
    }else if(file.size / 1024 / 1024 > props.sizeLimit) {
      ElMessage({
        type: 'error',
        message: `上传图像大小不能超过 ${props.sizeLimit}MB ！`,
      })
      return false
    }else {
      return true
    }
  }
  const handleExceed = ()=> {
    ElMessage({
      type: 'warning',
      message: `最多能上传1个文件`,
    })
  } 
  const fileListArr = ref([])
  watch(
    ()=> props.fileList,
    (val)=> {
      fileListArr.value = val ? [{
        name: val,
        url: preview_image.value
      }] : []
    },
    {
      deep: true,
      immediate: true
    }
  )
</script>

<template>
  <el-upload
    :action="uploadUrl"
    :file-list="fileListArr"
    :list-type="listType"
    :limit="1"
    name="image_content"
    :data="image_data"
    :headers="headers"
    :on-success="handleSuccess"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">上传图片</el-button>
    <template #tip v-if="showFileList">
      <div class="el-upload__tip">
        {{sizeLimit}}MB以内,{{tips}}
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible" append-to-body>
    <img class="w-full" :src="dialogImageUrl" alt="预览图片">
  </el-dialog>
</template>

<style scoped>

</style>