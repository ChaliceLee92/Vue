<template>
    <div class="login bg-blue">
        <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="auto"
            class="login-ruleForm"
        >
            <div class="title-container">
                <h3 class="title">最美诵读系统管理</h3>
            </div>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username">
                    <icon-svg slot="prefix" icon-class="icon-RectangleCopy" />
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password">
                    <icon-svg slot="prefix" icon-class="icon-RectangleCopy1" />
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    style="width:100%;margin-bottom:30px;"
                    :loading="loading"
                    @click="handleLogin('loginForm')"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { validUsername } from '@utils/validate'
import md5 from 'js-md5'
import Cookies from 'js-cookie'
import { mapActions } from 'vuex'
export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('请输入5位数密码'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin@lesong.com',
                password: 'admin'
            },
            rules: {
                username: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }]
            },
            loading: false
        }
    },
    mounted() {},
    methods: {
        ...mapActions(['updateuserinfo', 'LoginSystem']),

        handleLogin(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const data = {
                        account: this.loginForm.username,
                        password: this.loginForm.password
                    }
                    this.loading = true
                    // 调登录接口
                    this.LoginSystem(data)
                        .then(res => {
                            this.$router.push({ path: '/' })
                            this.loading = false
                        })
                        .catch(err => {
                            this.loading = false
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.login {
    .el-input .el-input__prefix {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-ruleForm {
        min-width: 600px;
        height: 300px;

        .title-container {
            .title {
                font-size: 26px;
                color: $color-white;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .svg-container {
        }
    }
}
</style>
