import Layout from '@/layout/index.vue'

const SchoolManage = {
    path: '/schoolManage',
    name: '学校管理',
    component: Layout,
    meta: {
        title: '学校管理',
        icon: 'el-icon-location'
    },
    redirect: '/schoolManage/index',
    children: [
        {
            path: 'index',
            meta: {
                title: '学校管理',
                icon: 'el-icon-location',
                breadcrumb: false // 面包屑隐藏title
            },
            component: () => import('@views/SchoolManage/index.vue'),
            children: []
        }
    ]
}

export default SchoolManage
