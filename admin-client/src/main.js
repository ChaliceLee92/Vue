import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// 引入element ui框架
import ElementUI from 'element-ui';
// 引入element ui 样式文件
import 'element-ui/lib/theme-chalk/index.css';
// 样式初始化
import 'normalize.css'

// 引入阿里icon
import '../public/img/icons/iconfont.css';
// 如果是使用svg就要引入iconfont.js这个文件
import '../public/img/icons/iconfont';
// 国际化
import i18n from './common/i18n.js'  
// api文件封装
import axios from './http/index'
Vue.use(axios)


//全局注册组件
import './components/index';

//全局使用插件
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n, // 国际化
  render: h => h(App),
}).$mount('#app');
