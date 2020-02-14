<template>
  <div>
    <div id="container">
      <div class="optBlock">
        <div class="af-search">
          <div class="search-left">
            <label>城市名</label>
            <el-input v-model="cityName"></el-input>
            <el-button type="primary" @click="getCity">搜索</el-button>
          </div>
        </div>
        <div class="af-search">
          <div class="search-left">
            <label>点击获取经纬度</label>
            <el-input v-model="InglatValue"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {remoteLoad} from '../api/remoteLoad.js'
var map
export default {
  data () {
    return {
      cityName: '深圳市',
      InglatValue: '',
      onLoading: false,
      mapUrl: 'https://webapi.amap.com/maps?v=1.4.13&key=036485e36815b4b76ace876c17040435&plugin=AMap.MouseTool'
    }
  },
  async created () {
    this.onLoading = true
    await remoteLoad(this.mapUrl)
    this.initMap()
    this.onLoading = false
    setTimeout(() => {
      var toolBar = new AMap.ToolBar({
        visible: true
      })
    }, 200)
  },
  watch: {
    onLoading () {
      this.$store.commit('setLoading', this.onLoading)
    }
  },
  methods: {
    initMap () {
      map = new AMap.Map('container', {
        resizeEnable: true,
        center: [114.07635, 22.551736],
        zoom: 11
      })
      map.on('click', e => {
        this.getInglat(e)
      })
      map.setMapStyle('amap://styles/macaron')
    },
    getCity () {
      if (this.cityName == '') {
        this.cityName = '深圳市'
      }
      map.setCity(this.cityName)
      this.$message.success('已跳转到' + this.cityName)
    },
    getInglat (e) {
      this.InglatValue = e.lnglat.getLng() + ',' + e.lnglat.getLat()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
