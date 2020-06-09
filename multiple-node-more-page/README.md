# vue 多页面跳转

当前使用的是 hash 路由 ， 所以 并没有什么问题。
但是如果你想要使用 history 模式的路由 , 在跳转页面的时候 无法匹配路由 , 会导致视图无法渲染 。
目前的解决办法是 通过修改路由的 path , 并且在跳转的时候要跟路由表的 path 保持一致

例如：

```javascript
// pages1 项目中定义路由如下
import Vue from 'vue';
import Router from 'vue-router';
import home from '../views/Home/home.vue';
import detail from '../views/Detail/detail.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/pages1/home',
			name: 'home',
			component: home,
		},
		{
			path: '/pages1/detail',
			name: 'detail',
			component: detail,
		},
	],
});
```

路由配置好了之后 ， 您还需要更改 vue.config.js 中的 devServer 字段

```javascript

    devServer: {
        historyApiFallback: {
            verbose: true,
            rewrites: [
                { from: /^\/index\/.*$/, to: '/index.html' },
                { from: /^\/pages1\/.*$/, to: '/pages1.html' },  // 注意 这里定义 pages1 , 您的路由页必须定义为 /pages1/xx
            ],
        },
    },
```

vue.config.js 配置好之后, 您在跳转处 需要更改 页面中跳转路由的 路径

```javascript
   <template>
        <div>
            home
            <a href="/pages1/home">jlc_pages</a>  <!-- 注意更改跳转路径 -->
            <div>{{$store.state.app.app_title}}</div>
        </div>
    </template>

    <script>
    export default {
        mounted(){
            console.log(this.$store.state.app.app_title);
        }
    }
    </script>

    <style>

    </style>

```
