import Vue from 'vue';

// 注册组件
Vue.component('icon-svg', () => import('@components/icon/iconSvg.vue'));
Vue.component('qn-upload', () => import('@components/upload/qnUpload.vue'));
Vue.component('TableComponent', () => import('@components/TableComponent/index'));
Vue.component('ViewRouter', () => import('@components/RouterView/RouterView.vue'));
Vue.component('TableFilter', () => import('@components/TableFilter/TableFilter.vue'));
Vue.component('ComponentDialog', () => import('@components/ComponentDialog/ComponentDialog.vue'));
Vue.component('ComponentForm', () => import('@components/ComponentForm/ComponentForm.vue'));
Vue.component('SelectFile', () => import('@components/SelectFile/SelectFile.vue'));
Vue.component('Tree', () => import('@components/Tree/Tree.vue'));
Vue.component('SelectSchool', () => import('@components/SelectSchool/SelectSchool.vue'));
