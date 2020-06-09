import Vue from 'vue';
import Vuex from 'vuex';
import login from './login/login';
import app from './app/app';
import permission from './permission/permission';
import user from './user/user';
import settings from './settings/settings';
import tagsView from './tagsView/tagsView';
import createPersistedState from 'vuex-persistedstate'; //解决vuex刷新页面数据消失

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		login,
		app,
		permission,
		user,
		settings,
		tagsView
	},
	plugins: [
		createPersistedState({
			//配置vuex插件
			storage: window.localStorage,
			key: 'vuexData',
			reducer(val) {
				return {
					// 数据刷新不消失
					login: val.login,
					app: val.app,
					permission: val.permission,
					settings: val.settings
				};
			}
		})
	]
});
