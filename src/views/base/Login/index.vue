<template>
  <div class="login-index">
    <div class="form-box" v-if="showLogin">
      <h1>Welcome Login</h1>
      <el-form label-position="left" :model="loginData" ref="form1" :rules="rules1">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="loginData.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="loginData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <!-- 验证码 -->
      <label class="verification-label">验证码:</label>
      <input type="text" class="verification-input" v-model="code" placeholder="请输入验证码">
      <div class="identify-block" @click="refreshCode">
        <af-identify :identifyCode="identifyCode" :contentWidth="120" :contentHeight="40"></af-identify>
      </div>

      <div class="closeBtn">
        <el-button type="primary" class="btn1" @click="hanleRegister">注册</el-button>
        <el-button type="primary" class="btn2" @click="loginSubmit">登录</el-button>
      </div>
    </div>

    <div class="form-box" v-show="!showLogin">
      <h1>Welcome Register</h1>
      <el-form label-position="right" :model="registerData" ref="form2" :rules="rules2">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="registerData.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="registerData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="comfirm">
          <el-input type="password" v-model="registerData.comfirm" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="closeBtn">
        <el-button type="primary" class="btn3" @click="hanleLogin">返回登录</el-button>
        <el-button type="primary" class="btn4" @click="registerSubmit">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js'
import {appRouterAdmin, errorPage, appRouterTest} from '@/router/router.js'
export default {
  data () {
    var comfirmPassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loginData: {
        username: 'admin',
        password: '123456'
      },
      registerData: {
        username: '',
        password: '',
        comfirm: ''
      },
      showLogin: true,
      rules1: {
        username: [{required: true, message: '请输入账号', trigger: 'change'}],
        password: [{required: true, message: '请输入密码', trigger: 'change'}]
      },
      rules2: {
        username: [{required: true, message: '请输入账号', trigger: 'change'}],
        password: [{required: true, message: '请输入密码', trigger: 'change'}],
        comfirm: [{validator: comfirmPassword, trigger: 'change'}]
      },
      code: '',
      identifyCode: '',
      identifyCodes: '1234567890'
    }
  },
  methods: {
    loginSubmit () { // 登录
      this.$refs.form1.validate((valid) => {
        if (valid) {
          if (this.code !== this.identifyCode) {
            this.refreshCode()
            this.$message.error('验证码错误')
            return
          }
          const { username, password } = this.loginData
          let index = this.user.findIndex((item) => {
            return item.username === username
          })
          if (this.user[index].password === password) { // 判断密码是否一致
            let token = this.user[index].token
            sessionStorage.setItem('token', token) // 把token保存到session
            if (token === 'admin') {
              router.options.routes = appRouterAdmin
              router.addRoutes([...appRouterAdmin, errorPage]) // 动态添加路由
            } else {
              router.options.routes = appRouterTest
              router.addRoutes([...appRouterTest, errorPage]) // 动态添加路由
            }
            this.$router.push('/')
          } else {
            this.$message.error('用户名或账号错误')
          }
          // this.$axios.get('/api/login', {
          //   params: this.loginData
          // }).then((res) => {
          //   if (res.data.code === 1) {
          //     this.$store.commit('setToken', res.data.token)
          //     sessionStorage.setItem('token', res.data.token) // 把token保存到session
          //     if (res.data.token === 'admin') {
          //       router.options.routes = appRouterAdmin
          //       router.addRoutes([...appRouterAdmin, errorPage]) // 动态添加路由
          //     } else {
          //       router.options.routes = appRouterTest
          //       router.addRoutes([...appRouterTest, errorPage]) // 动态添加路由
          //     }
          //     this.$router.push('/')
          //   } else {
          //     this.$message.error(res.data.message)
          //   }
          // })
        }
      })
    },
    registerSubmit () { // 注册
      this.$refs.form2.validate((valid) => {
        if (valid) {
          const {username, password} = this.registerData
          let sameFlag = this.user.some((item) => {
            return item.username === username
          })
          if (sameFlag) {
            this.$message.info(`${username}已存在`)
          } else {
            this.$store.commit('setUser', {username, password, token: username})
            this.$message.success('注册成功')
            this.showLogin = true
          }
          // this.$axios.get('/api/register', {
          //   params: this.registerData
          // }).then((res) => {
          //   if (res.data.code == 2) {
          //     this.$message.info(res.data.message)
          //   }
          //   if (res.data.code == 1) {
          //     this.$message.success(res.data.message)
          //     this.showLogin = true
          //   }
          // })
        }
      })
    },
    hanleRegister () {
      this.showLogin = false
    },
    hanleLogin () {
      this.showLogin = true
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    labelWidth () {
      return 50 * this.scale + 'px'
    },
    labelWidth2 () {
      return 80 * this.scale + 'px'
    }
  },
  created () {
    // window.localStorage.removeItem('token')
    // sessionStorage.removeItem('token')
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    console.log(this.$router)
  }
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl';
</style>
