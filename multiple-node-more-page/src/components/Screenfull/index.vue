<template>
	<div>
		<!-- <svg-icon
            :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
            @click="click"
        /> -->
		<i :class="!isFullscreen ? 'el-icon-full-screen' : 'el-icon-aim'" @click="click"></i>
	</div>
</template>

<script>
import screenfull from 'screenfull';

export default {
	name: 'Screenfull',
	data() {
		return {
			isFullscreen: false
		};
	},
	mounted() {
		this.init();
	},
	beforeDestroy() {
		this.destroy();
	},
	methods: {
		click() {
			if (!screenfull.isEnabled) {
				this.$message({
					message: '您的浏览器无法工作',
					type: 'warning'
				});
				return false;
			}
			screenfull.toggle();
		},
		change() {
			this.isFullscreen = screenfull.isFullscreen;
		},
		init() {
			if (screenfull.isEnabled) {
				screenfull.on('change', this.change);
			}
		},
		destroy() {
			if (screenfull.isEnabled) {
				screenfull.off('change', this.change);
			}
		}
	}
};
</script>

<style scoped>
.screenfull-svg {
	display: inline-block;
	cursor: pointer;
	fill: #5a5e66;
	width: 20px;
	height: 20px;
	vertical-align: 10px;
}
</style>
