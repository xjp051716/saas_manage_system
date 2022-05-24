<script setup>
  import echarts from '../config/echarts'

  const { proxy } = getCurrentInstance()
  const notBindUser = ref(0)
  const chartData = reactive({
    user: '',
    user_id: '',
    type: 'day',
  })
  const post = {
    touch: 'input',
    action: '/get_admin_biz_user',
    placeholder: '请选择客户',
    search: {key: 'name', label: '客户名称'},
    tableParams: [{key: 'company', label: '客户名称'}],
  }
  const infoList = reactive([
    {
      icon: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/u656.png',
      num: '0',
      title: '今日销售额',
      color: 'bg-emerald-500'
    },
    {
      icon: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/u657.png',
      num: '0',
      title: '今日订单数',
      color: 'bg-amber-500'
    },
    {
      icon: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/u659.png',
      num: '0',
      title: '总客户数',
      color: 'bg-sky-500'
    },
  ])
  // vue3的echarts实例不能用响应性
  let mychart = null
  const setUser = (val)=> {
    console.log(val)
    if(val) {
      chartData.user = val.company;
      chartData.user_id = val.id;
    }else{
      chartData.user = '';
      chartData.user_id = '';
    }
    drawLine()
  }
  const selectDate = (val)=> {
    chartData.type = val
    drawLine()
  }
  const initChart = ()=> {
    mychart = echarts.init(document.getElementById('saleChart'))
    drawLine()
  }
  const drawLine = ()=> {
    let data = { user: chartData.user_id }
    if(chartData.type == 'month') data.show_key = ''
    // proxy.$apis.getIndex(data).then(res=> {
    //   let option = {
    //     xAxis: {
    //       type: 'category',
    //       data: res.data.month_order_list.map(item=> {
    //         return item.time
    //       }),
    //       axisPointer: {
    //         type: 'shadow'
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross'
    //       }
    //     },
    //     legend: {
    //       data: ['销售额','销售量'],
    //       bottom: 0
    //     },
    //     yAxis: [
    //       {
    //         type: 'value',
    //         axisLabel: {
    //           formatter: '{value}'
    //         },
    //         axisLine: {
    //           show: true,
    //           lineStyle: {
    //             color: '#14c8d4'
    //           }
    //         },
    //         min: 0
    //       },
    //       {
    //         type: 'value',
    //         axisLabel: {
    //           formatter: '{value}'
    //         },
    //         axisLine: {
    //           show: true,
    //           lineStyle: {
    //             color: '#EE6666'
    //           }
    //         },
    //         min: 0
    //       }
    //     ],
    //     series: [
    //       {
    //         name: '销售额',
    //         type: 'bar',
    //         data: res.data.month_order_list.map(item=> {
    //           return item.value
    //         }),
    //         barWidth: 10,
    //         itemStyle: {
    //           borderRadius: 4,
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             { offset: 0, color: "#14c8d4" },
    //             { offset: 1, color: "#43eec6" }
    //           ])
    //         }
    //       },
    //       {
    //         name: '销售量',
    //         type: 'line',
    //         data: res.data.month_order_list.map(item=> {
    //           return item.qty
    //         }),
    //         yAxisIndex: 1,
    //         smooth: true,
    //         symbolSize: 6, //图标大小
    //         itemStyle: {
    //           color: "#EE6666"
    //         }
    //       },
    //     ]
    //   }
    //   mychart.setOption(option)
    // })
  }
  onActivated(()=> {
    initChart()
    window.addEventListener('resize', ()=> {
      mychart.resize()
    })
  })
  onDeactivated(()=> {
    // 容器节点销毁时，调用dispose销毁实例释放内存
    mychart.dispose()
  })
</script>

<template>
  <el-row :gutter="20" class="mt-4">
    <el-col :span="6" v-for="item in infoList">
      <div class="my-card py-8 px-10 text-white" :class="item.color">
        <div class="flex justify-between items-center">
          <img :src="item.icon">
          <span class="text-3xl">{{item.num}}</span>
        </div>
        <div class="text-right">{{item.title}}</div>
      </div>
    </el-col>
  </el-row>
  <div class="text-left font-bold my-4">代办事项</div>
  <div class="text-left text-sm">
    <span class="mr-4">未绑定小程序客户数</span>
    <el-link type="primary" class="text-sm" :underline="false">
      {{notBindUser}}<el-icon class="el-icon--right"><i-ep-view /></el-icon>
    </el-link>  
  </div>
  <div class="flex justify-between items-center my-4">
    <div class="font-bold">销售额统计</div>
    <div class="flex items-center">
      <simple-select
        v-model="chartData.user"
        v-bind="post"
        @confirm="setUser"
      />
      <el-button-group class="ml-4">
        <el-button :type="chartData.type == 'day' ? 'primary' : ''" @click="selectDate('day')">日</el-button>
        <el-button :type="chartData.type == 'month' ? 'primary' : ''" @click="selectDate('month')">月</el-button>
      </el-button-group>
    </div>
  </div>
  <div id="saleChart" class="w-full h-120"></div>
</template>

<style scoped>

</style>
