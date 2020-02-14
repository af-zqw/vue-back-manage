<template>
  <div class="_index" id="china"></div>
</template>

<script>
let china = require('../china.json')
export default {
  props: {
    large: {
      type: Boolean
    }
  },
  methods: {
    drawChart () {
      this.$echarts.registerMap('china', china)
      let myChart = this.$echarts.init(document.getElementById('china'))
      myChart.setOption({
        title: {
          text: '设备数量分布情况'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 20000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text: ['more', 'less'], // 文本，默认为数值文本
          calculable: true
        },
        series: [
          {
            name: '分布情况',
            type: 'map',
            roam: true,
            map: 'china',
            itemStyle: {
              emphasis: {label: {show: true}}
            },
            // 文本位置修正
            textFixed: {
              Alaska: [20, -20]
            },
            data: [
              {name: '新疆维吾尔自治区', value: 100},
              {name: '西藏自治区', value: 50},
              {name: '内蒙古自治区', value: 500},
              {name: '青海省', value: 1000},
              {name: '四川省', value: 2000},
              {name: '黑龙江省', value: 2000},
              {name: '甘肃省', value: 300},
              {name: '云南省', value: 600},
              {name: '广西壮族自治区', value: 800},
              {name: '湖南省', value: 10000},
              {name: '陕西省', value: 9000},
              {name: '广东省', value: 18000},
              {name: '吉林省', value: 12000},
              {name: '河北省', value: 1500},
              {name: '湖北省', value: 17000},
              {name: '贵州省', value: 2000},
              {name: '江西省', value: 10000},
              {name: '河南省', value: 19000},
              {name: '辽宁省', value: 2000},
              {name: '山西省', value: 20000},
              {name: '安徽省', value: 8000},
              {name: '福建省', value: 11000},
              {name: '浙江省', value: 2000},
              {name: '江苏省', value: 14000},
              {name: '重庆市', value: 100},
              {name: '宁夏回族自治区', value: 4000},
              {name: '海南省', value: 2000},
              {name: '台湾省', value: 100},
              {name: '北京市', value: 800},
              {name: '天津市', value: 600},
              {name: '上海市', value: 10000},
              {name: '香港特别行政区', value: 30},
              {name: '澳门特别行政区', value: 10}
            ]
          }
        ]
      })
      myChart.resize()
    }
  },
  mounted () {
    this.drawChart()
    console.log(this.large)
  }
}
</script>

<style lang="stylus" scoped>
vw(size)
  (size/13.66)vw
._index
  width 100%
  height 100%
</style>
