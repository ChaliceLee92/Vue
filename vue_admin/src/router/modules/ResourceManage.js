import Layout from '@/layout/index.vue'

const MaterialConfig = {
    path: '/poemResourceManage',
    name: '',
    component: Layout,
    meta: {
        title: '资源管理',
        icon: 'el-icon-location'
    },
    // 如果是一级路由 必须 redirect 到子级路由处
    redirect: '/poemResourceManage/index',
    children: [
        {
            path: 'index',
            name: '资源管理',
            component: () => import('@views/ResourceManage/index.vue'),
            meta: {
                title: '资源管理',
                icon: 'el-icon-location',
                breadcrumb: false // 面包屑隐藏title
            },
            children: []
        }
    ]
}

export default MaterialConfig
