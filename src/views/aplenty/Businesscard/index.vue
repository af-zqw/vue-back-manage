<template>
  <div>
    <card-form v-show="!showCard" @generateCard="generateCard"></card-form>
    <transition name="slider">
      <card-content :formData="formData" v-show="showCard" @backEdit="backEdit"></card-content>
    </transition>
  </div>
</template>

<script>
import CardContent from './components/CardContent'
import CardForm from './components/CardForm'
export default {
  components: {
    CardContent,
    CardForm
  },
  data () {
    return {
      showCard: false,
      formData: {}
    }
  },
  methods: {
    generateCard (data) {
      console.log(data.data)
      this.formData = data.data
      this.showCard = data.showCard
    },
    backEdit (key) {
      this.showCard = key
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
