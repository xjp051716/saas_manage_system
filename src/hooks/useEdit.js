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
        // proxy.$apis.xxx
      }
    })
  }
  const submit = (formEl, formData, api)=> {
    if(!formEl) return
    formEl.validate(valid=> {
      if(valid) {
        proxy.$apis[api](formData).then(res=> {
          ElMessage({
            type: 'success',
            message: '保存成功',
          })
          router.go(-1)
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