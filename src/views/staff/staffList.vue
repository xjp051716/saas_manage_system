<script setup>
  import useList from '../../hooks/useList'
  const {
    currPage,
    pageSize,
    total,
    pageSizes,
    pageLayout,
    tableData,
    paramsObj,
    indexMethod,
    handleCurrPage,
    handlePageSize,
    getTableData,
  } = useList()
  const formData = reactive({
    user: ''
  })
</script>

<template>
  yema: {{pageSize}}
  
</template>

<style scoped>

</style>
