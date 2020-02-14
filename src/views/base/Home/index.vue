<template>
  <div v-resize="resize">
    <el-card>
      <el-row type="flex" justify="space-around" align="middle">
        <el-col :span="7">
          <infor-card idName="hhhh"
                      :endVal="200"
                      color="rgba(64, 158, 255, 1)"
                      introText="在线设备"
                      icon="el-icon-s-tools">
          </infor-card>
        </el-col>
        <el-col :span="7">
          <infor-card idName="adsh"
                      :endVal="220"
                      color="rgba(64, 255, 223, 1)"
                      introText="离线设备"
                      icon="el-icon-s-marketing">
          </infor-card>
        </el-col>
        <el-col :span="7">
          <infor-card idName="hssh"
                      :endVal="200"
                      color="rgba(255, 226, 64, 1)"
                      introText="活跃人员"
                      icon="el-icon-s-custom">
          </infor-card>
        </el-col>
      </el-row>
    </el-card>
    <el-row type="flex" justify="space-around" align="middle">
      <el-card class="_card">
        <china-echart large ref="china"></china-echart>
      </el-card>
      <el-card class="_card">
        <shenzhen-echart ref="shenzhen"></shenzhen-echart>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import ChinaEchart from './components/ChinaEchart'
import ShenzhenEchart from './components/ShenzhenEchart'
import InforCard from './components/inforCard'
export default {
  components: {
    InforCard,
    ChinaEchart,
    ShenzhenEchart
  },
  methods: {
    resize () {
      this.$refs.china.drawChart()
      this.$refs.shenzhen.drawChart()
    }
  }
}
</script>

<style lang="stylus" scoped>
vw(size)
  (size/13.66)vw
._card
  margin-top vw(20)
  width 49%
  height vw(400)
  &>>>.el-card__body
    padding 10px
    height 100%
    box-sizing border-box
</style>
