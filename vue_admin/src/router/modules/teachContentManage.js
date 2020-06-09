import Layout from '@/layout/index.vue'

const teachContentManage = {
    path: '/teachContentManage',
    name: '诗教课堂内容管理',
    component: Layout,
    meta: {
        title: '诗教课堂内容管理',
        icon: 'el-icon-location'
    },
    children: [
        {
            path: 'teachWebManage',
            meta: {
                title: '诗教课堂网站管理',
                icon: 'el-icon-location',
                breadcrumb: true // 面包屑不隐藏title
            },
            component: () =>
                import('@views/TeachContentManage/teachContentManage.vue'),
            children: []
        },
        {
            path: 'teachResourceManage',
            meta: {
                title: '诗教课堂资源管理',
                icon: 'el-icon-location',
                breadcrumb: true // 面包屑不隐藏title
            },
            component: () =>
                import('@views/TeachContentManage/teachResourceManage.vue'),
            children: []
        }
    ]
}

export default teachContentManage
