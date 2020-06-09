import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout/index.vue' // 页面整体布局

import Home from './modules/home'
import login from './modules/login'
import NotFound from './modules/NotFound'
import userManage from './modules/userManage'
import AuditManage from './modules/AuditManage'
import ResourceManage from './modules/ResourceManage'
import SchoolManage from './modules/schoolManage'
import teachContentManage from './modules/teachContentManage'
import SystemManage from './modules/SystemManage'

if (!window.VueRouter) Vue.use(Router)

// 重复点击跳转路由后会导致promise报错 ， 解决方案
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
    login,
    NotFound,
    Home,
    userManage,
    AuditManage,
    ResourceManage,
    SchoolManage,
    teachContentManage,
    SystemManage,
    { path: '*', redirect: '/404', hidden: true }
]

//注册路由
export default new Router({
    // mode: 'history', // 后端支持可开
    base: __dirname, // 添加跟目录,对应服务器部署子目录
    routes: constantRouterMap
})

//异步路由（需要权限的页面）
// export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 *
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
 *
 *
 *
 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？
 *
 *
 *
 */
