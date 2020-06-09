module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false
			}
		]
	],
	plugins: [
		'lodash',
		'@babel/plugin-transform-runtime',
		'transform-vue-jsx',
		[
			'on-demand-import',
			{
				libraryName: 'vue-area-linkage',
				libraryPath: 'dist/lib'
			}
		]
	]
};
