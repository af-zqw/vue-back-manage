<template>
  <div>
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script>
export default {
  methods: {
    drawChart () {
      let myChart = this.$echarts.init(this.$refs.echart)
      myChart.setOption({
        backgroundColor: '#344b58',
        grid: {
          left: '8%',
          right: '5%',
          borderWidth: 0,
          top: 100,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '7%', // 图例的位置
          textStyle: {
            color: '#90979c'
          },
          data: ['外输出', '内输出', '总量']
        },
        calculable: true, // 暂时没发现什么作用
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false // 出现竖线
          },
          axisTick: {
            show: false // 横坐标的刻度
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: true // 出现水平线
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false // 纵坐标的刻度
          }
        }],
        dataZoom: [{
          show: true,
          height: 30, // 缩放条的高度
          xAxisIndex: [
            0 // 指定缩放第几个xAis，例子中只有一个xAis
          ],
          bottom: 30, // 绝对定位，距离底部的位置
          start: 10, // 从xAis数据的百分之十处开始
          end: 80, // 到Ais数据的百分之八十出结束
          handleSize: '110%', // 缩放条左右拖动控件的大小
          handleStyle: {
            color: '#d3dee5' // 缩放条左右拖动控件的颜色
          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c' // 边框的颜色
        }, {
          type: 'inside'
        }],
        series: [{
          name: '外输出',
          type: 'bar',
          stack: 'total', // 再同一横轴上如果是两个同类型的图形，可以叠在上面，两个都要设置
          barMaxWidth: 35, // 柱的宽度
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop', // 文字的位置
                formatter (p) {
                  return p.value > 0 ? p.value : ''// 进行显示过滤，如果小于零就不显示
                }
              }
            }
          },
          data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078]
        },
        {
          name: '内输出',
          type: 'bar',
          barMaxWidth: 35, // 柱的宽度
          barGap: '10%',
          stack: 'total', // 再同一横轴上如果是两个同类型的图形，可以叠在上面，两个都要设置
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top', // 文字的位置
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220]
        }, {
          name: '总量',
          type: 'line',
          stack: 'total', // 让线在柱的上面
          symbolSize: 10, // 线节点的大小
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
        }
        ]
      })
    }
  },
  mounted () {
    this.drawChart()
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/echart.styl';
</style>
