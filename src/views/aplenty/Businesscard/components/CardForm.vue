<template>
  <div class="form-index">
    <div class="form-box">
      <h1>编辑名片</h1>
      <div class="upload-wrapper">
        <span>上传头像:</span>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <i class="el-icon-close clear-img"
           title="清除头像"
           v-if="formData.imageUrl"
           @click="formData.imageUrl=''"></i>
      </div>
      <el-form :label-width="labelWidth" :model="formData" ref="form" :rules="rules">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="标签/个性签名:" prop="tag">
          <el-input v-model="formData.tag" placeholder="输入标签或个性签名"></el-input>
        </el-form-item>
        <el-form-item label="介绍自己:" prop="introduce">
          <el-input type="textarea"
                    v-model="formData.introduce"
                    :autosize="{ minRows: 2}"
                    placeholder="介绍下自己吧"
                    >
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱:" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系地址:" prop="adress">
          <el-input v-model="formData.adress" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div class="closeBtn">
        <el-button @click="resetForm" icon="el-icon-refresh">重置</el-button>
        <el-button type="primary"
                   @click="submit">
                   生成名片<i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
    </div>
    <el-dialog title="没有上传头像，选个符合你的人物吧" :visible.sync="dialogFormVisible">
      <div class="dialog-box">
        <el-select v-model="formData.imageUrl">
          <el-option v-for="(item,index) in imgOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <img :src="formData.imageUrl" alt="">
      </div>
      <div class="closeBtn">
        <el-button @click="dialogCancel">取消</el-button>
        <el-button type="primary" @click="dialogSubmit" :style="{backgroundColor:_color,borderColor:_color}">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"CardForm",
  data() {
    return{
      formData:{
        imageUrl: '',
        name: '',
        tag:'',
        introduce:'',
        phone:'',
        email:'',
        adress:''
      },
      dialogFormVisible:false,  //控制对话框的出现与消失
      imgOptions:[
        { label: '冷酷男', value: 'http://demo.sc.chinaz.com/Files/pic/icons/5158/256.png' },
        { label: '乖乖男', value: 'http://demo.sc.chinaz.com/Files/pic/icons/5158/257.png' },
        { label: '乖乖女', value: 'http://demo.sc.chinaz.com/Files/pic/icons/5158/258.png' },
        { label: '可爱女', value: 'http://demo.sc.chinaz.com/Files/pic/icons/5158/267.png' },
        { label: '神秘者', value: 'http://demo.sc.chinaz.com/Files/pic/icons/5158/269.png'}
      ],
      rules:{
        name:[{required: true, message: '请输入姓名', trigger: 'blur'}],
        tag:[
          {required: true, message: '请输入标签或个性签名', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在3到20个字符之间', trigger: 'blur'}
        ],
        introduce:[
          {required: true, message: '请输入介绍', trigger: 'blur'},
          {min: 20 ,max: 100, message: '长度在20到100个字符之间', trigger: 'blur'}
        ],
        phone:[{required: true, message: '请输入电话', trigger: 'blur'}],
        email:[{required: true, message: '请输入邮箱', trigger: 'blur'}],
        adress:[{required: true, message: '请输入地址', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {  //上传成功的回调
      this.formData.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submit() {
      if(this.formData.imageUrl == '') {
        this.dialogFormVisible = true
        return
      }
      this.$refs.form.validate((valid) => {
        if(valid){
          this.$emit('generateCard',{'data':this.formData,'showCard':true})
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.formData.imageUrl = ''
    },
    dialogCancel() {
      this.formData.imageUrl = ''
      this.dialogFormVisible = false
    },
    dialogSubmit() {
      this.dialogFormVisible = false
    }
  },
  computed:{
    labelWidth() {
      return this.$store.getters.getScale*120+'px' 
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/form.styl';
</style>

<style scoped>
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


