<script setup>
  import OSSConfig from '../config/oss';
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
      default: () => {
        return []
      }
    },
    sizeLimit: {
      type: Number,
      default: 2
    }
  })
  const emit = defineEmits([ 'update:fileList', 'setImage' ])
  const uploadUrl = ref('')
  const client = OSSConfig()
  const dialogVisible = ref(false)
  const dialogImageUrl = ref('')
  const httpRequest = (uploadFile)=> {
    let file = uploadFile.file
    let suffix = file.name.substr(file.name.lastIndexOf('.'))
    let stamp = new Date().getTime()
    let fileName = `$${parseInt(
      Math.random() * 10000000000000
    )}_${stamp}${suffix}`
    client.put(fileName, file).then(res=> {
      uploadFile.onSuccess(res)
    })
  }
  const handlePreview = (uploadFile)=> {
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true;
  }
  const handleRemove = (uploadFile, uploadFiles)=> {
    emit('update:fileList', uploadFiles)
  }
  const handleSuccess = (response, uploadFile, uploadFiles)=> {
    let files = uploadFiles.reduce((prev,cur)=> {
      prev.push({
        name: cur.response ? cur.response.name : cur.name,
        url: cur.response ? cur.response.url : cur.url
      })
      return prev
    }, [])
    emit('update:fileList', files)
    emit('setImage', files)
  }
  const beforeUpload = (file)=> {
    if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
      ElMessage({
        type: 'error',
        message: '上传图像格式只能是 jpg或png 格式！',
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
      message: `最多能上传${props.limit}个文件`,
    })
  }
</script>

<template>
  <el-upload
    :action="uploadUrl"
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
        {{sizeLimit}}MB以内,格式png、jpeg
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img class="w-full" :src="dialogImageUrl" alt="预览图片">
  </el-dialog>
</template>

<style scoped>

</style>