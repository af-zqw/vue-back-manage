<template>
  <div class="pieChar-index">
    <div class="pieChar-left">
      <div id="pieCharLeft"></div>
    </div>
    <div class="pieChar-right">
      <div id="pieCharRight"></div>
    </div>
  </div>
</template>

<script>
import { getPieCharData } from '@/api/commonly'
export default {
  data () {
    return {
      allRightData: {},
      currentName: ''
    }
  },
  methods: {
    drawPieLeft () {
      let myPieLeft = this.$echarts.init(document.getElementById('pieCharLeft'))
      myPieLeft.setOption({
        title: {
          text: '驱动能源概况',
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item', // 鼠标放到图形上触发
          formatter: '{b} : {d}%' // 提示框浮层内容格式器,在饼图里面，b代表数据项的名称，d代表这个数据的百分比
        },
        legend: {
          left: 'center',
          top: '80%',
          itemGap: 20, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: 14, // 图例标记的图形宽度
          itemHeight: 12,
          borderRadius: 5, // 统一设置四个角的圆角大小
          data: [
            {name: '电动', icon: 'circle'}, // 这里需要设置icon为circle上面的圆角才会有效果
            {name: '汽油', icon: 'circle'},
            {name: '天然气', icon: 'circle'},
            {name: '生物', icon: 'circle'},
            {name: '其他', icon: 'circle'}
          ]
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            radius: [70, 100], // 设置成圆环
            center: ['50%', '45%'],
            // roseType: 'radius',
            color: [
              '#288add',
              '#3fb1e3',
              '#1fc33a',
              '#f14f4a',
              '#8d44ad',
              '#7bc674',
              '#f98d59',
              '#a087bf',
              '#f26e7d',
              '#34bc98',
              '#0080ff',
              '#27ae61',
              '#f6a0bb',
              '#e6bb0e',
              '#909e9f'
            ], // 颜色将根据饼图的区域个数循环
            label: { // 文字平时不显示，鼠标放上去再显示
              normal: {
                show: false,
                position: 'center' // 文字的位置
              },
              emphasis: { // 鼠标放上去
                show: true,
                textStyle: { // 设置字体的样式
                  fontSize: '20'
                }
              }
            },
            lableLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: '235', name: '电动' },
              { value: '335', name: '汽油' },
              { value: '135', name: '天然气' },
              { value: '25', name: '生物' },
              { value: '75', name: '其他' }
            ]
          }
        ]
      })
      window.addEventListener('resize', function () {
        myPieLeft.resize()
      })
      myPieLeft.off('click')
      let _this = this
      myPieLeft.on('click', params => { // 点击每个图形触发的事件，params里面含有该条数据的各个属性
        _this.currentName = params.name
        _this.drawPieRight()
      })
      myPieLeft.resize()
    },
    drawPieRight () {
      let name = this.currentName
      let queryData = this.allRightData[name]
      let titleText = `${name}设备在各个城市的使用情况`
      let myPieRight = this.$echarts.init(document.getElementById('pieCharRight'))
      myPieRight.setOption({
        title: {
          text: titleText,
          textStyle: {
            fontSize: 15
          },
          left: '2%'
        },
        tooltip: {
          trigger: 'item', // 鼠标放到图形上触发
          formatter: '{b} : {d}%' // 提示框浮层内容格式器,在饼图里面，b代表数据项的名称，d代表这个数据的百分比
        },
        legend: {
          left: 'center',
          top: '80%',
          itemGap: 20, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: 14, // 图例标记的图形宽度
          itemHeight: 12,
          borderRadius: 5, // 统一设置四个角的圆角大小
          data: [
            {name: '深圳', icon: 'circle'}, // 这里需要设置icon为circle上面的圆角才会有效果
            {name: '南京', icon: 'circle'},
            {name: '兰州', icon: 'circle'},
            {name: '北京', icon: 'circle'},
            {name: '上海', icon: 'circle'}
          ]
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            roseType: 'radius',
            radius: [30, 100], // 设置成圆环
            center: ['50%', '45%'],
            // roseType: 'radius',
            color: [
              '#42cccc',
              '#0080ff',
              '#27ae61',
              '#f6a0bb',
              '#e6bb0e',
              '#288add',
              '#3fb1e3',
              '#1fc33a',
              '#f14f4a',
              '#8d44ad',
              '#7bc674',
              '#f98d59',
              '#a087bf',
              '#f26e7d',
              '#909e9f'
            ], // 颜色将根据饼图的区域个数循环
            label: { // 文字平时不显示，鼠标放上去再显示
              normal: {
                show: true
              },
              emphasis: { // 鼠标放上去
                show: true
              }
            },
            lableLine: {
              normal: {
                show: true
              }
            },
            data: queryData
          }
        ]
      })
      window.addEventListener('resize', function () {
        myPieRight.resize()
      })
      myPieRight.resize()
    }
  },
  mounted () {
    this.drawPieLeft()
    getPieCharData().then((res) => {
      console.log(res)
      this.allRightData = res.data.pieCharData
    }).then(() => {
      this.currentName = '电动'
      this.drawPieRight()
    })
  },
  created () {
  }
}
</script>

<style lang="stylus">
@import '../stylus/pieChar.styl';
</style>
