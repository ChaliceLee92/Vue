import { Message, MessageBox } from 'element-ui'

function filterMessage(type, msg) {
    switch (type) {
        case 'create':
            return '创建' + msg
        case 'update':
            return '更新' + msg
        case 'delete':
            return '删除' + msg

        default:
            break
    }
}

export default (type, api, data, id, query) => {
    switch (type) {
        case 'create':
            return new Promise((resolve, reject) => {
                api(data)
                    .then(res => {
                        if (!res) return
                        Message({
                            showClose: true,
                            message:
                                res.code === 0
                                    ? filterMessage(type, '成功')
                                    : filterMessage(type, '失败'),
                            type: res.code === 0 ? 'success' : 'error',
                            duration: 3500
                        })
                        resolve(res)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        case 'update':
            return new Promise((resolve, reject) => {
                api(id, data)
                    .then(res => {
                        if (!res) return
                        Message({
                            showClose: true,
                            message:
                                res.code === 0
                                    ? filterMessage(type, '成功')
                                    : filterMessage(type, '失败'),
                            type: res.code === 0 ? 'success' : 'error',
                            duration: 3500
                        })
                        resolve(res)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        case 'delete':
            return new Promise((resolve, reject) => {
                MessageBox.confirm(
                    '此操作将永久删除该数据, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(() => {
                        api(id, query)
                            .then(res => {
                                Message({
                                    showClose: true,
                                    message:
                                        res.code === 0
                                            ? filterMessage(type, '成功')
                                            : filterMessage(type, '失败'),
                                    type: res.code === 0 ? 'success' : 'error',
                                    duration: 3500
                                })
                                resolve(res)
                            })
                            .catch(e => {
                                reject(e)
                            })
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        default:
            return new Promise((resolve, reject) => {
                api(data)
                    .then(res => {
                        if (!res) return
                        Message({
                            showClose: true,
                            message: res.message,
                            type: res.success ? 'success' : 'error',
                            duration: 3500
                        })
                        resolve(res)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        // return new Promise((resolve, reject) => {
        //   reject('找不到的类型设置')
        // })
    }
}
