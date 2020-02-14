<template>
  <div>
    <div class="alert-form">
      <el-form label-position="right" :model="formData" :label-width="labelWidth" ref="form">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="上线日期" prop="date">
          <el-input v-model="formData.date"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-input v-model="formData.adress"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="formData.type">
            <el-option v-for="(item,index) in typeOption" :key="index"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警">
          <el-select v-model="formData.alert">
            <el-option v-for="(item,index) in alertOption"
                       :key="index"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="close-btn">
      <el-button @click="closePopups">关闭</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        date: '',
        type: '',
        alert: ''
      },
      typeOption: [
        {label: '电动', value: '电动'},
        {label: '汽油', value: '汽油'}
      ],
      alertOption: [
        {label: '开启', value: true},
        {label: '关闭', value: false}
      ]
    }
  },
  props: {
    params: {
      type: Object
    },
    ID: {
      type: String
    }
  },
  methods: {
    submit () {
      const data = this.formData
      const index = this.params.index
      let edit = false
      if (this.params.todo == 'edit') {
        edit = true
      }
      this.$emit('transmit', [edit, data, index])
      this.closePopups()
    },
    closePopups () {
      this.$store.dispatch('delPopups', this.ID)
    }
  },
  computed: {
    labelWidth () {
      return 90 * this.$store.getters.getScale + 'px'
    }
  },
  created () {
    if (this.params.todo == 'edit') {
      this.formData = this.params.data
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/editOrAdd.styl';
</style>
