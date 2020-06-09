import Vue from 'vue'
import App from './App.vue'

// 样式
import '@assets/styles/index.scss'

// 如果是使用svg就要引入iconfont.js这个文件
import '@assets/iconfont/iconfont.js'

//全局注册组件
import '@components/index'

// 路由
import router from '@router/index'

// api文件封装
import axios from './http/index'
Vue.use(axios)

// element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 国际化
import i18n from '@assets/lang/i18n.js'
//全局使用插件
Vue.use(ElementUI, {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

// 路由拦截
import '@/permission.js'

// vuex
import store from '@store/index'

// 自定义指令
import './directive/index'

// 全局过滤器
import filters from './filters/filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

new Vue({
    router,
    i18n, // 国际化
    store,
    render: h => h(App)
}).$mount('#app')
