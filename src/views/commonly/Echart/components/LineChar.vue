<template>
  <div class="lineChar-index">
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
                    :loading="onLoading"
                    @click="selectLineData(selectKey)"
                    icon="el-icon-search">
                    查看
        </el-button>
      </div>
    </div>
    <div class="lineChar" ref="lineChar"></div>
  </div>
</template>

<script>
import { getLineCharData } from '@/api/commonly.js'
export default {
  name: 'LineChar',
  data () {
    return {
      lineData: {
      },
      lineCharList: [],
      options: [
        { value: 0, label: '上一周' },
        { value: 1, label: '第二周' },
        { value: 2, label: '第三周' },
        { value: 3, label: '第四周' }
      ],
      selectKey: 0,
      onLoading: false
    }
  },
  methods: {
    drawLine () {
      let myLineChar = this.$echarts.init(this.$refs.lineChar)
      myLineChar.setOption({
        // 图例,与下面的series的name对应
        legend: {
          data: ['销量', '产量']
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false, // 设置横坐标从原点开始
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#3888fa'
          },
          axisLine: {
            lineStyle: {
              color: '#3888fa'
            }
          }
        },
        // y轴，不写自动会按series里面的数据进行显示
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3888fa'
            }
          }
        },
        // 弹窗
        tooltip: {
          trigger: 'axis', // 从坐标轴出发
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        grid: { // 类似于绝对定位，用left等指定位置
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          show: true,
          containLabel: true
        },
        // 工具箱
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            },
            magicType: {
              type: [ 'line', 'bar' ]
            }
          }
        },
        // 数据项
        series: [
          {
            name: '销量',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ff005a',
                lineStyle: {
                  color: '#ff005a',
                  width: 2
                }
              }
            },
            data: this.lineData.salesVolume,
            smooth: true,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '产量',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa', // 文字颜色
                lineStyle: {
                  color: '#3888fa', // 线的颜色
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff' // 覆盖区域的颜色
                }
              }
            },
            data: this.lineData.yield,
            smooth: true,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
        ]
      })
      myLineChar.resize()
    },
    selectLineData (index) {
      new Promise((resolve) => {
        this.onLoading = true
        this.lineData = this.lineCharList[index]
        this.drawLine()
        this.onLoading = false
      }).then(() => {
        this.onLoading = false
      }).catch(() => {
        this.onLoading = false
      })
    }
  },
  created () {
    getLineCharData().then((res) => {
      this.lineCharList = res.data.data.lineCharList
      console.log(this.lineCharList)
      this.lineData = this.lineCharList[0]
      this.drawLine()
    })
  }
}
</script>

<style lang="stylus">
@import '../stylus/lineChar.styl';
</style>
