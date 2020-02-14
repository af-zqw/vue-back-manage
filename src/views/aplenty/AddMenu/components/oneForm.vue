<template>
  <div class="Form-index">
    <el-form :label-width="labelWidth" :model="formData" ref="form" :rules="rules">
      <el-form-item label="菜单名称:" prop="label">
        <el-input v-model="formData.label" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="图标:" prop="icon">
        <el-select v-model="formData.icon" placeholder="请选择图标">
          <el-option v-for="(item,index) in iconOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
            <span style="float:left;">{{item.label}}</span>
            <span><i :class=item.value style="float:right;line-height:2.4;"></i></span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="closeBtn">
      <el-button type="primary"
                @click="submit">
                添加
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OneForm',
  data () {
    return {
      formData: {
        label: '',
        icon: ''
      },
      iconOptions: [
        {label: '相机', value: 'el-icon-camera-solid'},
        {label: '齿轮', value: 'el-icon-s-tools'},
        {label: '商铺', value: 'el-icon-s-shop'},
        {label: '旗帜', value: 'el-icon-s-flag'},
        {label: '灯泡', value: 'el-icon-s-opportunity'}
      ],
      rules: {
        label: [{required: true, message: '请输入菜单名称', trigger: 'blur'}]
      }
    }
  },
  computed: {
    labelWidth () {
      return this.$store.getters.getScale * 90 + 'px'
    },
    menuList () {
      return this.$store.getters.getMenuList
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let menuList = this.menuList
          menuList.push(this.formData)
          this.$store.commit('setMenu', menuList)
          this.$message.success('添加成功')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/oneForm.styl';
</style>
