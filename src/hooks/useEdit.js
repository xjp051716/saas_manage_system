export default function() {
  const { proxy } = getCurrentInstance()
  const route = useRoute()
  const router = useRouter()
  const submitForm = ref(null)
  const goBack = ()=> {
    router.go(-1)
  }
  const submitKeep = (formEl, formData)=> {
    if(!formEl) return
    formEl.validate(valid=> {
      if(valid) {
        proxy.$apis[api](formData).then(res=> {
          if(res.code==200) {
            ElMessage({
              type: 'success',
              message: '保存成功',
            })
          }else {
            ElMessage({
              type: 'error',
              message: '保存失败',
            })
          }
          formEl.resetFields()
        })
      }
    })
  }
  const submit = (formEl, formData, api)=> {
    if(!formEl) return
    formEl.validate(valid=> {
      if(valid) {
        proxy.$apis[api](formData).then(res=> {
          if(res.code==200) {
            ElMessage({
              type: 'success',
              message: '保存成功',
            })
            router.go(-1)
          }else {
            ElMessage({
              type: 'error',
              message: '保存失败',
            })
          }
        })
      }
    })
  }
  const reset = (formEl)=> {
    if(!formEl) return
    formEl.resetFields()
  }

  return {
    proxy,
    route,
    submitForm,
    goBack,
    submitKeep,
    submit,
    reset
  }
}