<template>
	<div class="router-view-box">
		<!-- 渲染子路由 -->
		<transition name="fade-transform" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@assets/styles/index.scss';
.router-view-box {
	width: 100%;
	height: 100%;
}
</style>
