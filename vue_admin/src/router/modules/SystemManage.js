import Layout from '@/layout/index.vue'

const SystemManage = {
    path: '/systemManage',
    name: '系统管理',
    component: Layout,
    meta: {
        title: '系统管理',
        icon: 'el-icon-location'
    },
    children: [
        {
            path: 'systemPermissionManage',
            meta: {
                title: '权限管理',
                icon: 'el-icon-location',
                breadcrumb: true // 面包屑不隐藏title
            },
            component: () =>
                import('@views/SystemManage/systemPermissionManage.vue'),
            children: []
        },
        {
            path: 'systemRoleManage',
            meta: {
                title: '角色管理',
                icon: 'el-icon-location',
                breadcrumb: true // 面包屑不隐藏title
            },
            component: () => import('@views/SystemManage/systemRoleManage.vue'),
            children: []
        }
    ]
}

export default SystemManage
