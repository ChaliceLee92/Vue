import Vue from 'vue';
import Vuex from 'vuex';
import app from './module/app';

import createPersistedState from 'vuex-persistedstate'; //解决vuex刷新页面数据消失

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		app
	},
	plugins: [
		createPersistedState({
			//配置vuex插件
			storage: window.localStorage,
			key: 'multiple',
			reducer(val) {
				return {
					// 数据刷新不消失
					app: val.app,
				};
			}
		})
	]
});
