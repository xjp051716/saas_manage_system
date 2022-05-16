import apis from '../api/apis'

export default function() {
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  // 组合式函数约定始终返回ref，组件解构后可保持响应性
  const currPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const pageSizes = ref([10, 20, 25, 30])
  const pageLayout = ref('total, prev, pager, next')
  const tableData = ref([])
  const paramsObj = ref({
    url: '',
    proxyType: '',
    proxyData: {},
    isRouter: false,
  })
  const indexMethod = (index)=> {
    return (currPage.value - 1) * pageSize.value + index + 1
  }
  const handleCurrPage = (index)=> {
    paramsObj.value.proxyData.page_index = index;
    getTableData().then(()=> {
      currPage.value = index;
    })
  }
  const handlePageSize = (index)=> {
    paramsObj.value.proxyData.page_size = index;
    getTableData().then(()=> {
      pageSize.value = index;
    })
  }
  const getTableData = (url=paramsObj.value.url, proxyType=paramsObj.value.proxyType, proxyData=paramsObj.value.proxyData, isRouter=paramsObj.value.isRouter)=> {
    if(!proxyData.page_index || !proxyData.page_size) {
      proxyData.page_index = currPage.value;
      proxyData.page_size = pageSize.value;
    }
    paramsObj.value = {
      url,
      proxyType,
      proxyData,
      isRouter
    }
    if(!isRouter) {
      router.push({
        query: proxyData
      })
    }
    return apis.getSimpleSelect(url, proxyData, proxyType).then(res=> {
      let { total_count } = res.pagination
      tableData.value = res.data
      currPage.value = +proxyData.page_index
      total.value = total_count
    })
  }

  return {
    currPage,
    pageSize,
    total,
    pageSizes,
    pageLayout,
    tableData,
    paramsObj,
    router,
    route,
    store,
    indexMethod,
    handleCurrPage,
    handlePageSize,
    getTableData,
  }

}