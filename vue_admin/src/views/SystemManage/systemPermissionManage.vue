<template>
    <div>
        <el-button type="primary" @click="msgBtn">{{ msg }}</el-button>
        <el-card shadow="always">
            {{ test }}
        </el-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export default Vue.extend({
    data() {
        return {
            msg: 'typescript'
        }
    },
    created() {
        console.log('created', this.msg)
    },
    mounted() {
        console.log('mounted')
    },
    computed: {
        // test: {
        //   // 需要标注有 `this` 参与运算的返回值类型
        //   get(): string {
        //     return this.msg
        //   },
        //   set(val: string) {
        //     this.msg = val
        //   }
        // }
        test(): any {
            return this.msg
        }
    },
    watch: {
        msg(val: any) {
            console.log('watch', val)
        }
    },
    methods: {
        msgBtn(ev: any) {
            this.msg = '点击了typescript'
            console.log('点击事件', ev)
            console.log(
                '%c 🍐 this.sum(1, 2): ',
                'font-size:20px;background-color: #42b983;color:#fff;',
                this.sum(1, 2)
            )
        },

        sum(e: number, a: number) {
            return e + a
        }
    }
})
</script>
