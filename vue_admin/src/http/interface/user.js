import axios from '../http'
// 获取用户列表
export function getUserList(params) {
    return axios({
        url: '/user',
        method: 'get',
        params
    })
}

// 新增用户
export function createUser(data) {
    return axios({
        url: '/user',
        method: 'post',
        data
    })
}

// 更新用户
export function updateUser(user_id, data) {
    return axios({
        url: `/user/${user_id}`,
        method: 'put',
        data
    })
}

// 删除用户
export function DeleteUser(user_id, mobile) {
    return axios({
        url: `/user/${user_id}`,
        method: 'delete',
        data: {
            mobile
        }
    })
}
