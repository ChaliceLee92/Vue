<template>
    <div class="MaterialConfig">
        <el-button
            v-if="
                this.$store.getters.getBtnRoleList.includes(
                    'a6e52189a3ae484faea42efac957025c'
                )
            "
            >编辑</el-button
        >
    </div>
</template>

<script>
export default {
    name: 'MaterialConfig',
    data() {
        return {}
    },
    mounted() {
        console.log(
            '%c 🍦 this.$store.getters.getBtnRoleList: ',
            'font-size:20px;background-color: #33A5FF;color:#fff;',
            this.$store.getters.getBtnRoleList
        )
    }
}
</script>

<style></style>
