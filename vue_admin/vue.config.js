const path = require('path')
let LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

// 配置别名
function resolve(dir) {
    return path.join(__dirname, dir)
}

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 本地环境是否需要使用cdn
const devNeedCdn = false

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
}

// 获取baseurl
function getProxy(path, type) {
    if (path === '/api') {
        switch (type) {
            case 'localhost':
                return ''
            case 'service':
                return ''
        }
    }
}

module.exports = {
    productionSourceMap: false,

    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'))
            .set('@utils', resolve('src/utils'))
            .set('@interface', resolve('src/http/interface'))

        // ============压缩图片 start============
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options(
                {
                    mozjpeg: { progressive: true, quality: 65 },
                    optipng: { enabled: false },
                    pngquant: { quality: [0.65, 0.9], speed: 4 },
                    gifsicle: { interlaced: false }
                    // webp: { quality: 75 }
                },
                { bypassOnDebug: true }
            )
            .end()
        // ============压缩图片 end============

        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = 'none'
            return args
        })
        // ============注入cdn end============

        // 修复HMR
        config.resolve.symlinks(true)

        // 移除 prefetch 插件不会加载其他路由文件，只加载当前路由文件
        config.plugins.delete('prefetch')
        // preload插件作用，暂时未知
        config.plugins.delete('preload')

        // 配置TypeScript
        config.resolve.extensions
            .add('.ts')
            .add('.tsx')
            .end()
            .end()
            .module.rule('typescript')
            .test(/\.tsx?$/)
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('ts-loader')
            .loader('ts-loader')
            .options({
                transpileOnly: true,
                appendTsSuffixTo: ['\\.vue$'],
                happyPackMode: false
            })
            .end()
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
        // historyApiFallback: true  // history 异步路由没有缓存在页面中，第一次进入页面会找不到 , 这个解决
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
            )

            // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )

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
                                let path = module.resource
                                if (!path) return false
                                path = path.replace(/\\/g, '/')
                                // return path && path.indexOf('node_modules') > -1 && path.indexOf('vuetify') > -1
                                return path && /node_modules\/vue/.test(path)
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
            }

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
            )
        }
        config.plugins.push(new LodashModuleReplacementPlugin())

        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals

        // 取消webpack警告的性能提示
        config.performance = {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js')
            }
        }

        // 配置TS
        // config.resolve = { extensions: ['.ts', '.tsx', '.js', '.json'] }
        // config.module = {
        //     rules: [
        //         {
        //             test: /.tsx?$/,
        //             loader: 'ts-loader',
        //             exclude: /node_modules/,
        //             options: {
        //                 appendTsSuffixTo: [/.vue$/]
        //             }
        //         }
        //     ]
        // }
    },
    // 第三方插件配置
    pluginOptions: {}
}
