<template>
  <div class="card-index" :style="bgStyle">
    <div class="backBtn" @click="backEdit"><i class="el-icon-back"></i></div>
    <div class="box">
      <img :src="formData.imageUrl" class="box-img">
      <h1>{{formData.name}}</h1>
      <h5>{{formData.tag}}</h5>
      <p>{{formData.introduce}}</p>
      <ul>
        <li @click="open('邮箱','email')"><i class="el-icon-message"></i></li>
        <li @click="open('地址','adress')"><i class="el-icon-location-outline"></i></li>
        <li @click="open('电话','phone')"><i class="el-icon-phone-outline"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {
      bgStyle: {
        backgroundImage: 'url(' + require('../../../../assets/images/1.jpg') + ')'
      }
    }
  },
  methods: {
    open (todo, key) {
      this.$alert(`${todo}是:${this.formData[key]}`, '', {
        confirmButtonText: '确定'
      })
    },
    backEdit () {
      this.$alertMsgBox('确定要返回编辑吗?')
        .then(() => {
          this.$emit('backEdit', false)
        }).catch(() => {})
    }
  },
  created () {
    console.log(this.formData)
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/content.styl';
</style>
