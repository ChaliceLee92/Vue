<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="errPage-container cflex wflex">
                <img class="errorImg" :src="errorImg" />
                <p class="errorTitle">404</p>
                <p class="errorTro">抱歉，你访问的页面不存在。</p>
                <div class="toHome">
                    <el-button size="mini" type="primary" @click="handleToHome">
                        返回首页
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import errorImg from '@assets/images/404.png'

export default {
    name: 'page404',
    data() {
        return {
            errorImg: errorImg
        }
    },
    methods: {
        handleToHome() {
            this.$router.push('/index')
        }
    }
}
</script>

<style lang="scss" scoped>
.contain {
    display: flex;
    justify-content: center;
    padding: 20px;
    .errPage-container {
        align-items: center;
        p {
            line-height: 30px;
        }
        .errorImg {
            width: 286px;
            height: 325px;
            margin-bottom: 10px;
        }
        .errorTitle {
            text-align: center;
            color: rgba(0, 0, 0, 0.85);
            font-size: 24px;
        }
        .errorTro {
            text-align: center;
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
        }

        .toHome {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
