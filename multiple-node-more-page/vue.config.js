const glob = require('glob');

const path = require('path');
const multiProjectConfig = require('./scripts/multiProjectConfig/projectPages');
const projectname = require('./scripts/multiProjectConfig/projectEnter');

const resolve = dir => path.join(__dirname, dir);
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// lodash 优化
let LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 可视化包大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 本地环境是否需要使用cdn
const devNeedCdn = false;

// cdn链接
const cdn = {
	// cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
	externals: {
		vue: 'Vue',
		vuex: 'Vuex',
		'vue-router': 'VueRouter',
		'element-ui': 'ELEMENT',
		axios: 'axios'
	},
	// cdn的css链接
	css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
	// cdn的js链接
	js: [
		'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
		'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
		'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
		'https://unpkg.com/element-ui/lib/index.js',
		'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js'
	]
};

module.exports = {
	pages: multiProjectConfig.pages,
	outputDir: 'dist-' + projectname.name, //标识是打包哪个文件
	productionSourceMap: false,
	chainWebpack: config => {
		// 修复HMR
		config.resolve.symlinks(true);

		// 移除 prefetch 插件不会加载其他路由文件，只加载当前路由文件
		config.plugins.delete('prefetch');

		// preload插件作用，暂时未知
		config.plugins.delete('preload');

		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@pages', resolve('src/pages'))
			.set('@store', resolve('src/store'))
			.set('@utils', resolve('src/utils'))
			.set('@interface', resolve('src/http/interface'));

		// 多页面cdn 引入
		glob.sync(`./src/pages/${projectname.name}/main.js`).forEach(path => {
			const chunk = path.split('./src/pages/')[1].split('/main.js')[0];
			config.plugin('html-' + chunk).tap(args => {
				// 生产环境或本地需要cdn时，才注入cdn
				if (isProduction || devNeedCdn) args[0].cdn = cdn;
				// 修复 Lazy loading routes Error
				args[0].chunksSortMode = 'none';

				switch (projectname.name) {
					case 'admin':
						args[0].favicon = resolve('public/favicon.ico');
						break;
					case 'pages1':
						args[0].favicon = resolve('public/favicon1.ico');
						break;

					default:
						break;
				}

				return args;
			});
		});
	},
	// 如果你不需要使用eslint，把lintOnSave设为false即可
	lintOnSave: true,

	css: {
		sourceMap: false, // 开启 CSS source maps
		extract: true, // 是否使用css分离插件 ExtractTextPlugin
		requireModuleExtension: true, // false 会导致样式失效
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/styles/varibles.scss";`
			}
		}
	},
	devServer: {
		// historyApiFallback: {
		// 	verbose: true,
		// 	rewrites: [
		// 		{ from: /^\/index\/.*$/, to: '/index.html' },
		// 		{ from: /^\/pages1\/.*$/, to: '/pages1.html' },
		// 	],
		// },
		// open: true,
		// host: 'localhost',
		// port: 8081,
		// https: false,
		// overlay: {
		//     warnings: true,
		//     errors: true
		// },
		// proxy: {
		// '/sys': {
		//     target: getProxy('/api', process.env.VUE_APP_TYPE),
		//     ws: true,
		//     changOrigin: true, //允许跨域
		//     pathRewrite: {
		//         '^/sys': ''
		//     }
		// }
		// }
	},
	configureWebpack: config => {
		// 生产环境相关配置
		if (isProduction) {
			// 代码压缩
			config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						warnings: false, // 若打包错误，则注释这行
						//生产环境自动删除console
						compress: {
							drop_debugger: true,
							drop_console: true,
							pure_funcs: ['console.log']
						}
					},
					sourceMap: false,
					parallel: true
				})
			);

			// gzip压缩
			const productionGzipExtensions = ['html', 'js', 'css'];
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
					threshold: 10240, // 只有大小大于该值的资源会被处理 10240
					minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
					deleteOriginalAssets: false // 删除原文件
				})
			);

			// 公共代码抽离  构建优化上我们使用了 happypack 来利用多核CPU 加快打包的速度。
			config.optimization = {
				// https://webpack.js.org/plugins/split-chunks-plugin/
				splitChunks: {
					// minSize: 1000000, // 单个文件的最小size
					// maxSize: 2000000, // 单个文件最大的size
					// minChunks: 2, // 最小被引用
					// maxAsyncRequests: 5, // 首页加载资源
					// maxInitialRequests: 3,
					// automaticNameDelimiter: '~', // 打包文件自定义的链接符
					// name: true,
					// chunks: 'async', // initial(初始块)、async(按需加载块)、all(默认，全部块)
					// 这里需要注意的是如果使用initial 会将首页需要的依赖和项目本身的依赖打包2次增大文件体积
					cacheGroups: {
						default: false,
						vendors: {
							name: 'chunk-vendors',
							test: /[\\/]node_modules[\\/]/,
							chunks: 'initial',
							priority: 2,
							reuseExistingChunk: true,
							enforce: true
						},
						common: {
							name: 'chunk-common',
							chunks: 'initial',
							minChunks: 2,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 1,
							reuseExistingChunk: true,
							enforce: true
						},
						elementUI: {
							name: 'chunk-elementui',
							test: /[\\/]node_modules[\\/]element-ui[\\/]/,
							chunks: 'all',
							priority: 3,
							reuseExistingChunk: true,
							enforce: true
						},
						echarts: {
							name: 'chunk-echarts',
							test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
							chunks: 'all',
							priority: 4,
							reuseExistingChunk: true,
							enforce: true
						},
						vue: {
							test(module) {
								let path = module.resource;
								if (!path) return false;
								path = path.replace(/\\/g, '/');
								// return path && path.indexOf('node_modules') > -1 && path.indexOf('vuetify') > -1
								return path && /node_modules\/vue/.test(path);
							},
							name: 'chunk-vuetify',
							priority: 9,
							enforce: true
						},
						styles: {
							name: 'styles',
							test: /\.(sa|sc|c)ss$/,
							chunks: 'all',
							enforce: true
						},
						runtimeChunk: {
							name: 'manifest'
						}
					}
				}
			};

			// 可视化包大小
			config.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: 'server',
					analyzerHost: '127.0.0.1',
					analyzerPort: 8889,
					reportFilename: 'report.html',
					defaultSizes: 'parsed',
					openAnalyzer: false,
					generateStatsFile: false,
					statsFilename: 'stats.json',
					statsOptions: null,
					logLevel: 'info'
				})
			);
		}
		config.plugins.push(new LodashModuleReplacementPlugin());

		// 用cdn方式引入，则构建时要忽略相关资源
		if (isProduction || devNeedCdn) config.externals = cdn.externals;

		// 取消webpack警告的性能提示
		config.performance = {
			hints: 'warning',
			//入口起点的最大体积
			maxEntrypointSize: 50000000,
			//生成文件的最大体积
			maxAssetSize: 30000000,
			//只给出 js 文件的性能提示
			assetFilter: function(assetFilename) {
				return assetFilename.endsWith('.js');
			}
		};
	},
	// 第三方插件配置
	pluginOptions: {}
};
