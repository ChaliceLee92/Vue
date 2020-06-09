import tip from './tip'

export default {
    install(Vue) {
        Vue.directive('tip', tip)
    }
}
