<script setup>
  import useList from '../hooks/useList'
  const props = defineProps({
    touch: {
      type: String,
      default: 'input'
    },
    max: {
      type: Number,
      default: 1
    },
    placeholder: String,
    modelValue: [ String, Array ],
    text: {
      type: String,
      default: "新增",
    },
    size: {
      type: String,
      default: "default",
    },
    action: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      default: () => {
        return {};
      },
    },
    search: {
      type: Object,
      default: () => {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    appendbody: {
      type: Boolean,
      default: false,
    },
    tableParams: {
      type: Array,
      default: () => {
        return [];
      },
    },
  })
  const emit = defineEmits([ 'confirm', 'update:modelValue' ])
  const {
    currPage,
    pageSize,
    total,
    tableData,
    handleCurrPage,
    getTableData,
  } = useList()
  const dialogVisible = ref(false)
  const currentRow = ref() //单选
  const currentId = computed(()=> {
    return currentRow.value.id
  })
  const multipleSelection  = ref([]) //多选
  const searchValue = ref('')
  const multipleTable = ref(null)
  const focusHandle = ()=> {
    dialogVisible.value = true;
    getTableData(props.action, props.query, 'get', true)
  }
  const confirm = ()=> {
    dialogVisible.value = false;
    emit('confirm', props.max == 1 ? currentRow.value : multipleSelection.value)
  }
  const cancel = ()=> {
    dialogVisible.value = false;
  }
  const onSearch = ()=> {
    props.query[props.search.key] = searchValue.value
    props.query.page_index = 1
    getTableData(props.action, props.query, 'get', true)
  }
  const reset = ()=> {
    searchValue.value = ''
    props.query[props.search.key] = ''
    props.query.page_index = 1
    dialogClose()
    getTableData(props.action, props.query, 'get', true)
  }
  const handleCurrentChange = (val)=> {
    if(props.max == 1) { //单选
      currentRow.value = val
    }else { //多选
      multipleTable.value.toggleRowSelection(val)
    }
  }
  // 多选
  const handleSelectionChange = (val)=> {
    multipleSelection.value = val
  }
  // 关闭回调清空选择
  const dialogClose = ()=> {
    if(props.max == 1) currentRow.value = ''
    else multipleTable.value.clearSelection()
  }
  onMounted(()=> {

  })
</script>

<template>
  <div>
    <el-input
      v-model="modelValue"
      :size="size"
      :placeholder="placeholder"
      readonly
      :disabled="disabled"
      v-if="touch=='input'"
      @click="focusHandle"
    >
      <template #suffix>
        <el-icon><i-ep-search /></el-icon>
      </template>
    </el-input>
    <div class="w-full mb-3" v-else-if="touch=='button'">
      <el-button
        :disabled="disabled"
        type="primary"
        :size="size"
        @click="focusHandle"
      >{{ text }}</el-button>
    </div>
    <slot />
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="appendbody"
      @close="dialogClose"
    >
      <el-form
        class="flex justify-between"
        :size="size"
        :inline="true"
        v-if="search.label"
      >
        <el-form-item class="w-1/2" :label="search.label">
          <el-input v-model="searchValue"></el-input>
        </el-form-item>
        <div class="ml-8">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="default" @click="reset">重置</el-button>
        </div>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :size="size"
        highlight-current-row
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="max===1" label="#" width="60">
          <template #default="scope">
            <el-radio v-model="currentId" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column 
          v-else
          label="选择"
          type="selection"
          width="60"
        ></el-table-column>
        <el-table-column
          v-for="row in tableParams"
          :label="row.label"
          :prop="row.key"
        ></el-table-column>
      </el-table>
      <el-pagination
        class="float-right my-4"
        :pager-count="5"
        :layout="'total, prev, pager, next'"
        :default-current-page="1"
        :total="total"
        :page-size="pageSize"
        :current-page="currPage"
        @current-change="handleCurrPage"
      ></el-pagination>
      <div class="flex justify-end clear-both">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
