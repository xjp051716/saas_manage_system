<script setup>
  import echarts from '../config/echarts'

  const { proxy } = getCurrentInstance()
  const chartData = reactive({
    user: '',
    company_merchant_user_id : '',
    choice: 'days',
  })
  const post = {
    touch: 'input',
    action: '/merchant',
    placeholder: '请选择客户',
    search: {key: 'name', label: '客户名称'},
    tableParams: [{key: 'name', label: '客户名称'},{key: 'phone', label: '手机号'}],
  }
  const infoList = reactive([
    {
      icon: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/u656.png',
      key: 'total_amount',
      title: '今日销售额',
      color: 'bg-emerald-500'
    },
    {
      icon: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/u657.png',
      key: 'order_count',
      title: '今日订单数',
      color: 'bg-amber-500'
    },
    {
      icon: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/u659.png',
      key: 'merchant_count',
      title: '总客户数',
      color: 'bg-sky-500'
    },
  ])
  const basicInfo = ref({
    empower_count: 0,
    merchant_count: 0,
    order_count: 0,
    total_amount: 0,
  })
  // vue3的echarts实例不能用响应性
  let mychart = null
  const setUser = (val)=> {
    console.log(val)
    if(val) {
      chartData.user = val.name;
      chartData.company_merchant_user_id  = val.id;
    }else{
      chartData.user = '';
      chartData.company_merchant_user_id  = '';
    }
    drawLine()
  }
  const selectDate = (val)=> {
    chartData.choice = val
    drawLine()
  }
  const getIndex = ()=> {
    proxy.$apis.getIndex().then(res=> {
      basicInfo.value = res.data
    })
  }
  const drawLine = ()=> {
    let data = {
      company_merchant_user_id: chartData.company_merchant_user_id ,
      choice: chartData.choice
    }
    let month = new Date().getMonth() + 1
    let curMonth = month > 10 ? month : `0${month}`
    proxy.$apis.getFoldLine(data).then(res=> {
      let option = {
        xAxis: {
          type: 'category',
          data: res.data.map((item,index)=> {
            let curDay = index + 1 > 10 ? index + 1 : `0${index+1}`
            return curMonth + '-' + curDay
          }),
          axisPointer: {
            type: 'shadow'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['销售额','销售量'],
          bottom: 0
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#14c8d4'
              }
            },
            min: 0
          },
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#EE6666'
              }
            },
            min: 0
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'bar',
            data: res.data.map(item=> {
              return item.total_amount
            }),
            barWidth: 10,
            itemStyle: {
              borderRadius: 4,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" }
              ])
            }
          },
          {
            name: '销售量',
            type: 'line',
            data: res.data.map(item=> {
              return item.total_count
            }),
            yAxisIndex: 1,
            smooth: true,
            symbolSize: 6, //图标大小
            itemStyle: {
              color: "#EE6666"
            }
          },
        ]
      }
      mychart.setOption(option)
    })
  }
  onActivated(()=> {
    mychart = echarts.init(document.getElementById('saleChart'))
    getIndex()
    drawLine()
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
          <span class="text-3xl">{{basicInfo[item.key]}}</span>
        </div>
        <div class="text-right">{{item.title}}</div>
      </div>
    </el-col>
  </el-row>
  <div class="text-left font-bold my-4">代办事项</div>
  <div class="text-left text-sm">
    <span class="mr-4">未绑定小程序客户数</span>
    <el-link href="/customer/customerList" type="primary" class="text-sm" :underline="false">
      {{basicInfo.empower_count}}<el-icon class="el-icon--right"><i-ep-view /></el-icon>
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
        <el-button :type="chartData.choice == 'days' ? 'primary' : ''" @click="selectDate('days')">日</el-button>
        <el-button :type="chartData.choice == 'month' ? 'primary' : ''" @click="selectDate('month')">月</el-button>
      </el-button-group>
    </div>
  </div>
  <div id="saleChart" class="w-full h-120"></div>
</template>

<style scoped>

</style>
