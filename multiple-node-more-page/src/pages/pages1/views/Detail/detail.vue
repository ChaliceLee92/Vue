<template>
	<div>jlc _ detail</div>
</template>

<script>
export default {
	name: 'detail',
	methods: {
		allowBack() {
			history.pushState(null, null, document.URL);
		}
	},
	mounted() {
		//禁止后退
		history.pushState(null, null, document.URL);
		window.addEventListener('popstate', this.allowBack, false);
	},
	destroyed() {
		//离开页面时恢复回退
		window.removeEventListener('popstate', this.allowBack, false);
	}
};
</script>

<style></style>
