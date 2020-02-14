<template>
    <el-card :body-style="{padding:0}">
      <el-row style="height:180px;">
        <el-col style="height:100%;" :style="{backgroundColor: color, color: 'white'}" :span="8">
          <el-row style="height:100%;" type="flex" align="middle" justify="center">
            <i :class="icon" :style="{fontSize:iconSize}"></i>
          </el-row>
        </el-col>
          <el-col :span="16" style="height:100%;">
            <el-row type="flex" align="middle" justify="center" style="height:100%;">
                <count-up
                    class="infor-card-count"
                    :id-name="idName"
                    :end-val="endVal"
                    :color="color"
                    :countSize="countSize"
                    :countWeight="countWeight"
                >
                    <p class="infor-intro-text" slot="intro">{{ introText }}</p>
                </count-up>
            </el-row>
          </el-col>
      </el-row>
    </el-card>
</template>

<script>
import CountUp from './countUp'
export default {
  components: {
    CountUp
  },
  props: {
    idName: String,
    endVal: Number,
    color: String,
    icon: String,
    introText: String,
    countSize: {
      type: String,
      default: '40px'
    },
    countWeight: {
      type: Number,
      default: 700
    },
    iconSize: {
      type: String,
      default: '50px'
    }
  }
}
</script>

<style lang="stylus" scoped>
.infor-card-count
  display flex
  flex-direction column
  align-items center
  justify-content space-around
.infor-card-count>>>p
  margin 0
.infor-intro-text
  font-size:16px;
  font-weight:500;
  color:rgba(0,0,0,0.6);
  text-align center;
  padding 10px 0
</style>
