<template>
  <div class="barChar-index">
    <div class="af-search">
      <div class="search-left">
        <label>选择时间</label>
        <el-select v-model="selectKey">
          <el-option v-for="(item,index) in options"
                      :key="index"
                      :value="item.value"
                      :label="item.label">
          </el-option>
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="selectBarData(selectKey)">
          查看
        </el-button>
      </div>
    </div>
    <div class="barChar" id="barChar"></div>
  </div>
</template>

<script>
import { getBarCharData } from '@/api/commonly.js'
export default {
  name: 'BarChar',
  data () {
    return {
      barData: {},
      barCharList: [],
      selectKey: '0',
      options: [
        { value: '0', label: '上一周' },
        { value: '1', label: '第二周' },
        { value: '2', label: '第三周' },
        { value: '3', label: '第四周' }
      ]
    }
  },
  methods: {
    drawBar () {
      let myBarChar = this.$echarts.init(document.getElementById('barChar'))
      myBarChar.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: ['利润', '支出', '收入']
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#37a2da'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            axisLine: {
              lineStyle: {
                color: '#37a2da'
              }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        series: [
          {
            name: '利润',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside' // 让文字显示在图形里面
              }
            },
            itemStyle: {
              normal: {
                color: '#37a2da',
                shadowColor: '#37a2da'
              }
            },
            data: this.barData.profit
          },
          {
            name: '收入',
            type: 'bar',
            stack: '超人鸭',
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#67e0e3',
                shadowColor: '#67e0e3'
              }
            },
            data: this.barData.income
          },
          {
            name: '支出',
            type: 'bar',
            stack: '超人鸭',
            label: {
              normal: {
                show: true,
                position: 'left'
              }
            },
            itemStyle: {
              normal: {
                color: '#dd6b66',
                shadowColor: '#dd6b66'
              }
            },
            data: this.barData.expenditure
          }
        ]
      })
      myBarChar.resize()
    },
    selectBarData (key) {
      this.barData = this.barCharList[key]
      this.drawBar()
    }
  },
  created () {
    getBarCharData().then((res) => {
      const data = res.data
      if (data.ret) {
        this.barCharList = data.data.barCharList
      }
    }).then(() => {
      this.barData = this.barCharList[0]
      this.drawBar()
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/barChar.styl';
</style>
