<template>
  <div class="_index" id="shenzhen"></div>
</template>

<script>
let shenzhen = require('../shenzhen.json')
export default {
  methods: {
    drawChart () {
      // alert(1)
      this.$echarts.registerMap('shenzhen', shenzhen)
      var geoCoordMap = {
        '龙岗核心设备': [114.215683, 22.7083],
        '设备二': [114.128563, 22.557564],
        '设备三': [114.116035, 22.605417],
        '南山核心设备': [113.927406, 22.52663],
        '设备四': [113.873001, 22.75885],
        '设备五': [113.895424, 22.570961],
        '香蜜湖总核心设备': [114.019379, 22.537119],
        '设备六': [113.824593, 22.64187],
        '大鹏核心设备': [114.428635, 22.623131],
        '龙华核心设备': [114.06031, 22.72174]
      }
      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      let myChart = this.$echarts.init(document.getElementById('shenzhen'))
      myChart.setOption({
        title: {
          text: '深圳市核心设备情况'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: '#fffeff',
          padding: 8,
          textStyle: {
            color: '#00a2ff'
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);text-align:center',
          formatter: function (params) {
            return `<span style="color:#aaaaaa">${params.name}</span><br />
                <div style="font-size:14px;font-weight:700;">
                  功率：${params.value[2]}/10kw
                  <br />转化率：${params.value[3]}%<br />已运行：${params.value[4]}/h
                </div> `
          }
        },
        geo: { // 底图
          map: 'shenzhen', // 匹配的地图，需要先定义
          itemStyle: {
            normal: {
              areaColor: '#e8f6ff',
              borderColor: '#4a9dc9'
            },
            emphasis: {
              areaColor: '#cddeea'
            }
          },
          label: {
            show: true
          }
        },
        series: [
          {
            name: '满意度',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            roam: true,
            data: convertData([
              {name: '龙岗核心设备', value: [10, 70, 31]},
              {name: '设备二', value: [40, 80, 31]},
              {name: '设备三', value: [40, 90, 31]},
              {name: '南山核心设备', value: [40, 60, 31]},
              {name: '设备四', value: [40, 60, 31]},
              {name: '设备五', value: [40, 90, 31]},
              {name: '设备六', value: [40, 88, 31]},
              {name: '香蜜湖总核心设备', value: [40, 99, 31]},
              {name: '大鹏核心设备', value: [40, 10, 31]},
              {name: '龙华核心设备', value: [40, 19, 31]}
            ]),
            symbolSize: 13,
            itemStyle: {
              normal: {
                color: '#409EFF'
              }
            }
          }
        ]
      })
      myChart.resize()
    }
  },
  mounted () {
    this.drawChart()
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
