import apis from '../api/apis'

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
        // api
      }
    })
  }
  const submit = (formEl, formData)=> {
    if(!formEl) return
    formEl.validate(valid=> {
      if(valid) {
        // api
        console.log(formData)
        router.go(-1)
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