import Layout from '@/layout/index.vue'

const home = {
    path: '',
    name: '首页',
    component: Layout,
    meta: {
        title: '首页',
        icon: 'el-icon-location',
        breadcrumb: false // 面包屑隐藏title
    },
    hidden: true,
    redirect: '/index',
    children: [
        {
            path: 'index',
            meta: {
                title: '首页',
                icon: 'el-icon-location',
                affix: true // 默认显示标签页
            },
            component: () => import('@views/Home/index'),
            children: []
        }
    ]
}

export default home
