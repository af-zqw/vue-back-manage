<template>
  <div>
    <div class="alertForm">
      <el-form label-position="right" :model="formData" :label-width="labelWidth" ref="form" :rules="rules">
        <el-form-item label="客户名称:" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" prop="company">
          <el-input v-model="formData.company"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="closeBtn">
      <el-button @click="closePopups">关闭</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData:{
        name:'',
        company:'',
        email:'',
        phone:''
      },
      rules:{
        name:[{required: true, message: '请输入客户名称', trigger: 'blur'}],
        company:[{required: true, message: '请输入公司名称', trigger: 'blur'}],
        email:[{required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}],
        phone:[{required: true, message: '请输入电话', trigger: 'blur'}]
      }
    }
  },
  props:{
    params:{
      type:Object
    },
    ID:{
      type:String
    }
  },
  computed:{
    labelWidth() {
      return 90 * this.scale + 'px'
    }
  },
  methods:{
    submit() {
      this.$refs.form.validate((valid) => {
        if(valid){
          const data = this.formData
          const index = this.params.index
          let edit = false
          if(this.params.todo == 'edit'){
            edit = true
          }
          this.$emit('transmit',[edit,data,index])
          this.closePopups()
        }
      })
    },
    closePopups() {
      this.$store.dispatch('delPopups',this.ID)
    }
  },
  created() {
    this.formData = this.params.data
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/editOrAdd.styl';
</style>


