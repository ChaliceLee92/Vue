import router from '@router/index'
import store from '@store/index'
import NProgress from 'nprogress' // Progress 进度条
process.env.NODE_ENV === 'development' && import('nprogress/nprogress.css')
import { getToken } from '@utils/auth' // 验权(从cookie中获取)
import { setTitle } from '@utils/mUtils' // 设置浏览器头部标题

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    // 设置浏览器头部标题
    const browserHeaderTitle = to.meta.title
    store.commit('SET_BROWSERHEADERTITLE', {
        browserHeaderTitle: browserHeaderTitle
    })

    // 点击登录时，拿到了token并存入了cookie,保证页面刷新时,始终可以拿到token
    if (getToken('adminToken')) {
        if (to.path === '/login') {
            next({ path: '/index' })
            NProgress.done()
        } else {
            // 用户登录成功之后，每次点击路由都进行了角色的判断;
            next()
        }
    } else {
        // 白名单放行
        if (whiteList.indexOf(to.path) !== -1) {
            // 点击退出时,会定位到这里
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
    setTimeout(() => {
        const browserHeaderTitle = store.getters.browserHeaderTitle
        setTitle(browserHeaderTitle)
    }, 0)
})
