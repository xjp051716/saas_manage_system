<script setup>
  const props = defineProps({
    // 多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 文件列表类型 "text" | "picture" | "picture-card"
    listType: {
      type: String,
      default: 'picture-card'
    },
    limit: {
      type: Number,
      default: 1
    },
    fileList: {
      type: Array,
      default: []
    },
    sizeLimit: {
      type: Number,
      default: 2
    }
  })
  const emit = defineEmits([ 'update:fileList' ])
  const dialogVisible = ref(false)
  const dialogImageUrl = ref('')
  const httpRequest = (uploadFile)=> {
    console.log(uploadFile)
  }
  const handlePreview = (uploadFile)=> {
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true;
  }
  const handleRemove = (uploadFile, uploadFiles)=> {
    emit('update:fileList', uploadFiles)
  }
  const handleSuccess = (response, uploadFile, uploadFiles)=> {
    emit('update:fileList', uploadFiles)
  }
  const beforeUpload = (file)=> {
    if(file.type !== 'image/jpeg' || file.type !== 'image/png') {
      Elmessage({
        type: 'error',
        message: '上传图像格式只能是 jpg或png 格式！'
      })
      return false
    }else if(file.size / 1024 / 1024 > sizeLimit) {
      Elmessage({
        type: 'error',
        message: `上传图像大小不能超过 ${sizeLimit}MB ！`
      })
      return false
    }
    return true
  }
  const handleExceed = ()=> {
    Elmessage({
      type: 'warnning',
      message: `最多能上传${limit}个文件`
    })
  }
</script>

<template>
  <el-upload
    action="#"
    :multiple="multiple"
    :file-list="fileList"
    :list-type="listType"
    :limit="limit"
    :http-request="httpRequest"
    :on-success="handleSuccess"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
  >
    <el-icon><i-ep-plus /></el-icon>
    <template #tip>
      <div class="el-upload__tip">
        只能上传jpg/png文件，且不超过{{sizeLimit}}MB
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img class="w-full" :src="dialogImageUrl" alt="预览图片">
  </el-dialog>
</template>

<style scoped>

</style>