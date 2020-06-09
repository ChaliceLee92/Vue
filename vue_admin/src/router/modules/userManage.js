import Layout from '@/layout/index.vue'

const userManage = {
    path: '/userManage',
    name: '用户管理',
    component: Layout,
    meta: {
        title: '用户管理',
        icon: 'el-icon-location'
    },
    redirect: '/userManage/index',
    children: [
        {
            path: 'index',
            meta: {
                title: '用户管理',
                icon: 'el-icon-location',
                breadcrumb: false // 面包屑隐藏title
            },
            component: () => import('@views/UserManage/index'),
            children: []
        }
    ]
}

export default userManage
