import { login, getRoleList } from '@interface/login'
import { setToken, RemoveLocalStorage, removeToken } from '@utils/auth.js'
import _ from 'lodash'
import router from '@router/index'

const expandArr = (arr = [], new_arr = []) => {
    for (const i of arr) {
        if (i.children && i.children.length !== 0) {
            new_arr = [...new_arr, ...expandArr(i.children)]
        } else {
            new_arr.push(i)
        }
    }
    return new_arr
}

const types = {
    UPDATEUSERINFO: 'UPDATEUSERINFO',
    LOGINASYSTEM: 'LOGINASYSTEM',
    ROLELIST: 'ROLELIST',
    BTNROLELIST: 'BTNROLELIST'
}

const state = {
    userInfo: {},
    LoginSystem: {},
    RoleRouterList: [],
    AllPermissions: [],
    BtnRoleList: [],
    showLoading: false
}
const getters = {
    getUserInfo: state => state.userInfo,
    getRoleRouter: state => state.RoleRouterList,
    getBtnRoleList: state => state.BtnRoleList
}
const mutations = {
    [types.UPDATEUSERINFO]: (state, value) => {
        state.userInfo = value
    },
    // 登录
    [types.LOGINASYSTEM]: (state, value) => {
        state.LoginSystem = value
        // 把token存入本地缓存
        setToken('adminToken', value.token)
    },
    // 获取权限
    [types.ROLELIST]: (state, value) => {
        state.RoleRouterList = value
    },

    // 按钮级别权限
    [types.BTNROLELIST]: (state, value) => {
        state.BtnRoleList = value
    }
}
const actions = {
    // 登录
    LoginSystem: ({ commit }, value) => {
        return new Promise((reslove, reject) => {
            // 登录返回token 根据token去请求获取用户信息
            login(value)
                .then(login => {
                    if (login.code !== 0) {
                        return login.error_msg
                    }
                    commit(types.LOGINASYSTEM, login.data)
                    // 权限菜单
                    commit(types.ROLELIST, login.data.menu)
                    // 用户信息
                    commit(types.UPDATEUSERINFO, login.data.user)
                    // 过滤出按钮的权限
                    const newMenu = expandArr(login.data.menu)
                    const buttonPermissions = newMenu.filter(
                        item => !item.isMenu
                    )
                    let buttonPermissionsList = []

                    buttonPermissions.map(item => {
                        buttonPermissionsList.push(item.id)
                    })
                    commit(types.BTNROLELIST, buttonPermissionsList)
                    reslove(login)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
