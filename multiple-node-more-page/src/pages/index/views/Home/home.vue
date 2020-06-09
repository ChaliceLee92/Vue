<template>
	<div>
		home
		<a href="/pages1.html">jlc_pages</a>
		<div>{{ $store.state.app.app_title }}</div>
	</div>
</template>

<script>
export default {
	mounted() {
		console.log(this.$store.state.app.app_title);
	}
};
</script>

<style></style>
