<template>
  <div class="login">
    <div class="login_main">
      <div class="login_title">后台管理系统</div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username">
            <icon-svg slot="prefix"
                      icon-class="icon-tubiao-2"></icon-svg>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password">
            <icon-svg slot="prefix"
                      icon-class="icon-tubiao-15"></icon-svg>
          </el-input>
        </el-form-item>
        <el-form-item class="BtnClass">
          <el-button size="mini"
                     v-if="!isLoding"
                     @click="submitLogin('ruleForm')">登录</el-button>
          <el-button v-else
                     size="mini"
                     :loading="true">加载中</el-button>
          <el-button @click="registered('ruleForm')"
                     size="mini">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      isLoding: false
    }
  },
  methods: {
    // 登录
    submitLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoding = true
          this.$api.login(this.ruleForm).then(res => {
            console.log(res);
            this.isLoding = false

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 注册
    registered (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addUser(this.ruleForm).then(res => {
            console.log(res);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../assets/imags/elliott-engelmann-30045-unsplash.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_main {
    width: 300px;
    .login_title {
      color: aliceblue;
      text-align: center;
      margin-bottom: 20px;
    }
    /deep/ .el-input__inner {
      background-color: transparent;
    }
    /deep/ .el-input__prefix {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /deep/ .el-form {
      .BtnClass {
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-form-item__content {
          /deep/ .el-button--mini {
            background-color: transparent;
            color: aliceblue;
          }
          /deep/ .el-button--mini:hover {
            color: #409eff;
            border-color: aliceblue;
            background-color: aliceblue;
          }
        }
      }
    }
  }
}
</style>

