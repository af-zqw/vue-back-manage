<template>
  <div class="Form-index">
    <el-form :label-width="labelWidth" :model="formData" ref="form" :rules="rules">
      <el-form-item label="请输入菜单名称:" prop="label">
        <el-input v-model="formData.label" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="请输入路径:">
        <el-input v-model="formData.path" placeholder="请输入路径"></el-input>
        <span class="tip">提示输入:Test/index</span>
      </el-form-item>
      <el-form-item label="选择所属的一级菜单:" prop="index">
        <el-select v-model="formData.index" placeholder="请选择所属一级菜单">
          <el-option v-for="(item,index) in menuList"
                     :key="index"
                     :label="item.label"
                     :value="index"> 
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="closeBtn">
      <el-button type="primary" @click="submit">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:"TwoForm",
  data(){
    return{
      formData:{
        label:'',
        path:'',
        index:''
      },
      menuListIndex:'',
      rules:{
        label:[{required: true, message: '请输入菜单名称', trigger: 'blur'}],
        index:[{required: true, message: '请选择所属一级菜单', trigger: 'change'}]
      }
    }
  },
  computed:{
    labelWidth(){
      return this.$store.getters.getScale*180+'px'
    },
    menuList() {
      return this.$store.getters.getMenuList;
    }
  },
  methods:{
    submit() {
      this.$refs.form.validate((valid) => {
        if(valid) {
          let menuList = this.menuList;
          let index = this.formData.index
          delete this.formData.index
          menuList[index].group.push(this.formData);
          this.$store.commit('setMenu',menuList)
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


