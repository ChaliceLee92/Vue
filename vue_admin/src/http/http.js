import axios from 'axios'
import Config from './config'
import qs from 'qs'
import { getToken, removeToken } from '@utils/auth'
import router from '@router/index'
import { Message, MessageBox } from 'element-ui'

// 使用vuex做全局loading时使用
// import store from '@/store'

// 接口白名单
const whiteList = ['/login']

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: process.env.VUE_APP_BASE_API,
            // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
            transformResponse: [function(data) {}],
            timeout: 150000
        })

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                let token = getToken('adminToken')
                // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
                // console.log(store.state.loading)
                console.log('准备发送请求...')
                // 2. 排除不需要携带token的接口
                if (whiteList.indexOf(config.url) !== 0) {
                    // 带上token
                    if (token) {
                        config.headers.Authorization = token
                    } else {
                        // 重定向到登录页面
                        router.push('/login')
                    }
                }
                // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                // if (config.method === 'post') {
                //     // if (  // 判断路由是以什么方式结尾
                //     //   config.data.__proto__ === FormData.prototype ||
                //     //   config.url.endsWith('path') ||
                //     //   config.url.endsWith('mark') ||
                //     //   config.url.endsWith('patchs')
                //     // ) {
                //     //   console.log();
                //     // } else {
                //     //   config.data = qs.stringify(config.data);
                //     // }
                //     config.data = qs.stringify(config.data)
                // }
                return config
            },

            error => {
                // 请求错误时
                console.log('request:', error)
                // 1. 判断请求超时
                if (
                    error.code === 'ECONNABORTED' &&
                    error.message.indexOf('timeout') !== -1
                ) {
                    console.log('timeout请求超时')
                    // return service.request(originalRequest);//再重复请求一次
                }
                // 2. 需要重定向到错误页面
                const errorInfo = error.response
                if (errorInfo) {
                    //error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status // 404 403 500 ...
                    router.push({
                        // path: `/error/${errorStatus}`
                        path: `/404`
                    })
                }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        )

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                let data
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data === void 0) {
                    data = JSON.parse(response.request.responseText)
                } else {
                    data = response.data
                }

                // 根据返回的code值来做不同的处理
                switch (data.code) {
                    case 0:
                        // console.log(data.data)
                        break
                    case 1:
                        break
                }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.code)
                // err.data = data
                // err.response = response
                // throw err

                return data
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break

                        case 401:
                            err.message = '未授权，请登录'
                            break

                        case 403:
                            // 非法访问或者权限不足
                            err.message = '拒绝访问'
                            Message({
                                showClose: true,
                                message: '非法访问, 请联系管理员!!!',
                                type: 'error',
                                duration: 3500
                            })

                            if (getToken('adminToken')) {
                                router.push({ path: '/index' })
                                return
                            }

                            removeToken('adminToken')
                            router.push({ path: '/login' })
                            break

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break

                        case 408:
                            err.message = '请求超时'
                            break

                        case 500:
                            err.message = '服务器内部错误'
                            break

                        case 501:
                            err.message = '服务未实现'
                            break

                        case 502:
                            err.message = '网关错误'
                            break

                        case 503:
                            err.message = '服务不可用'
                            break

                        case 504:
                            err.message = '网关超时'
                            break

                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break

                        default:
                    }
                }
                console.error(err)
                return Promise.reject(err) // 返回接口返回的错误信息
            }
        )

        // 请求处理
        instance(options)
            .then(res => {
                resolve(res)
                return false
            })
            .catch(error => {
                reject(error)
            })
    })
}
