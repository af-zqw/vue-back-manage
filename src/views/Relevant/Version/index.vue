<template>
  <div class="version-index">
    <div class="version-title">版本更新记录</div>
    <div class="cardWrapper">
      <div class="left-card">
        <el-card class="box-card" v-for="(item,index) in leftList" :key="index">
          <div slot="header">
            <div class="card-title">{{item.num}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</div>
            <ul v-for="(innerItem,index) in item.info" :key="index">
              <li>{{innerItem}}</li>
            </ul>
          </div>
        </el-card>
      </div>
      <div class="right-card">
        <el-card class="box-card" v-for="(item,index) in rightList" :key="index">
          <div slot="header">
            <div class="card-title">{{item.num}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</div>
            <ul v-for="(innerItem,index) in item.info" :key="index">
              <li>{{innerItem}}</li>
            </ul>
          </div>
        </el-card>
      </div>
      <div class="version-center">
        <div class="center-dot" v-for="(item,index) in versionList" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      versionList: [],
      leftList: [],
      rightList: []
    }
  },
  methods: {
    getVersionInfo () {
      this.$axios.get('../../../static/mock/version.json')
        .then((res) => {
          const data = res.data
          if (data.ret) {
            this.versionList = data.data.versionList
            console.log('ss')
          }
        }).then(this.distributionList)
    },
    distributionList () {
      for (let i = 0; i < this.versionList.length; i += 1) {
        if (i % 2 == 0) {
          this.leftList.push(this.versionList[i])
        } else {
          this.rightList.push(this.versionList[i])
        }
      }
    }
  },
  created () {
    this.getVersionInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
