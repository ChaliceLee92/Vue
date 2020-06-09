const login = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: () => import('@views/login/login'),
    hidden: true
}

export default login
