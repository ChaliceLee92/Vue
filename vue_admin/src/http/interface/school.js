import axios from '../http'
// 获取学校列表
export function getSchoolList(params) {
    return axios({
        url: '/school',
        method: 'get',
        params
    })
}

// 新增学校
export function createSchool(data) {
    return axios({
        url: '/school',
        method: 'post',
        data
    })
}

// 更新学校
export function updateSchool(schoolId, data) {
    return axios({
        url: `/school/${schoolId}`,
        method: 'put',
        data
    })
}

// 删除用户
export function DeleteSchool(schoolId) {
    return axios({
        url: `/school/${schoolId}`,
        method: 'delete'
    })
}
