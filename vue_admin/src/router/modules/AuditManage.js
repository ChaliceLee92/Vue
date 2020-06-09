import Layout from '@/layout/index.vue'

const AuditManage = {
    path: '/checkManage',
    name: '',
    component: Layout,
    meta: {
        title: '审核管理',
        icon: 'el-icon-location'
    },
    redirect: '/checkManage/index',
    children: [
        {
            path: 'index',
            name: '审核管理',
            meta: {
                title: '审核管理',
                icon: 'el-icon-location',
                breadcrumb: false // 面包屑隐藏title
            },
            component: () => import('@views/AuditManage/AuditManage.vue'),
            children: []
        }
    ]
}

export default AuditManage
