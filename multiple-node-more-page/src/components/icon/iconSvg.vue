<template>
	<svg class="icon_svg" aria-hidden="true">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
export default {
	name: 'icon-svg',
	props: {
		iconClass: {
			type: String,
			required: true
		}
	},
	computed: {
		iconName() {
			return `#${this.iconClass}`;
		}
	}
};
</script>
<style lang="scss" scoped>
.icon_svg {
	width: 1.5em;
	height: 1.5em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
