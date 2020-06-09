vue国际化配置：

我们使用vue-i18n来实现国际化。

首先当然是安装啦：

```javascript
npm install vue-i18n -S
```

安装完毕后，写配置文件，我们先来完成语言包吧：

```
//新建中文语言包：zh.js
export default {
  input:{
    placeholder:'请输入用户名',
    password:'请输入密码'
  }
}
```

然后再新建英文语言包：

```
// en.js
export default {
  input:{
    placeholder:'Please enter a user name',
    password:'Please enter your password'
  }
}
```

这是demo ，所以就弄这两种语言试试水。

接下来新建一个i18n.js配置文件。

```javascript
// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './lang/en'
import zhLocale from './lang/zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh', // set locale
  messages // set locale messages
})

export default i18n
```

先来解释下这个配置文件做了什么吧：

1. 引入vue
2. 引入i18n
3. 引入element的语言包，分别是zh和en。
4. 接下来就是把我们自己写的语言包引入
5. 在然后useVueI18n
6. 然后把我们自己的语言包和element的语言包合并
7. 然后创建I18n的实例，这里做了一件事情就是，为了不刷新后语言包恢复原始状态，所以，这里每次都去本地缓存里面取。这个很好理解
8. 之后就是把这个文件给暴露出去

然后我们再来配置mian.js

```javascript
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// 引入element ui框架
import ElementUI from 'element-ui';
// 引入element ui 样式文件
import 'element-ui/lib/theme-chalk/index.css';

// 引入阿里icon
import '../public/img/icons/iconfont.css';
// 如果是使用svg就要引入iconfont.js这个文件
import '../public/img/icons/iconfont';
// 国际化
import i18n from './common/i18n.js'  



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

```

入口文件这里其他的我就不解释了，主要讲国际化，把我们的国际化配置文件引进来，引进来之后，注入到vue的实例里面去，这里有一个很重要的点，为了让element的内部组件语言也改变，所以下面这段代码不能少：

```javascript
//全局使用插件
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
```

具体原因别问我，我不懂，因为我也踩了好久的坑，才百度到这个。

接下来就是使用了。

```javascript
<template>
  <div class="login">
    <el-input :placeholder="$t('input.placeholder')"
              prefix-icon="icon-tubiao-15"
              v-model="input21" />
    <el-input :placeholder="$t('input.password')"
              prefix-icon="icon-tubiao-15"
              v-model="input" />
    <div class="lang">
      <el-dropdown @command="handleCommand"
                   size="small">
        <span class="el-dropdown-link">
          {{locale}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh-CN"
                            :disabled='locale === "中文" '>中文</el-dropdown-item>
          <el-dropdown-item command="en-US"
                            :disabled='locale === "English" '>English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
     <el-date-picker
      v-model="value1"
      type="datetime"
      :placeholder="$t('input.placeholder')">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      input21: '',
      input: '',
      value1:''
    }
  },
  computed: {
    locale () {
      if (this.$i18n.locale === 'zh') {
        return '中文'
      } else {
        return 'English'
      }
    }
  },
  methods: {
    handleCommand (command) {
      if (command == 'zh-CN') {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        console.log(this.$i18n.locale);
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
      } else if (command == 'en-US') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        console.log(this.$i18n.locale);
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>
</style>

```

使用的话就是：

```
<el-input :placeholder="$t('input.placeholder')"
              prefix-icon="icon-tubiao-15"
              v-model="input21" />  // 属性里面这样用
 <span>{{$t('input.placeholder')}}</span> // 标签内这样用。
```

这里面的值是我们写的语言包对象，key是input，value是placeholder，

至于我们如何来根据事件更换语言包呢？

直接改变它的值：this.$i18n.locale 就可以实现了，具体就是当你触发点击事件的时候，把这个值改变成你相应的语言包名字就可以了，注意，每次更换一点要把本地存储的值给覆盖哦。

```javascript
 handleCommand (command) {
      if (command == 'zh-CN') {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        // console.log(this.$i18n.locale);
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
      } else if (command == 'en-US') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        // console.log(this.$i18n.locale);
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      }
    }
```

这样国际化就实现啦~~~

这里再提一个bug，但是我想不清楚应该怎么解决，只能临时找到个比较bug的方式

假如，我们有一个数组，也是需要配置国际化的，例如下拉框，看代码如下：

```
<el-select v-model="value"
               :placeholder="$t('input.placeholder')">
      <el-option v-for="item in options"
                 :key="item.id"
                 :label="item.label"
                 :value="item.id">
      </el-option>
 </el-select>
 
 data () {
    return {
      options: this.$t('input.options')
    }
  },
```

我们都知道，vue更改数组是要使用this.$set()方法才能更新视图的，但是，这里是直接从语言包里面拿到一个数据，当你切换语言包的时候，视图并不会更新，需要手动刷新一次才能够显示，我这里暂时的解决方案是直接在切换语言的时候在那个事件上调用:

```
this.$router.go(0)
```

但是用户体验真心不好，哪位大哥知道更好的方法，求加微信：294999978 指教，本人小白一枚，真心感谢

```javascript
handleCommand (command) {
      if (command == 'zh-CN') {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        console.log(this.$i18n.locale);
        this.$router.go(0)// 刷新页面，为的就是触发视图
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
      } else if (command == 'en-US') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        console.log(this.$i18n.locale);
        this.$router.go(0)  // 刷新页面，为的就是触发视图
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      }
    }
```

