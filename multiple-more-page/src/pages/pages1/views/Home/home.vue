<template>
  <div>jlc _ home
    <router-link to="/detail">跳转jlc详情</router-link>
    <div @click="hanldeRouter">编程式导航</div>
    <div>{{$store.state.app.app_title}}</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted(){
    console.log(this.$store);
  },
  methods:{
    hanldeRouter(){
      this.$router.push({
        path: '/detail'
      })
    }
  }
}
</script>

<style>

</style>