import { setLocalStorage, getLocalStorage } from '@utils/auth';
// import defaultSettings from '@pages/admin/settings';

// const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
	theme: getLocalStorage('theme') || '#6959CD',
	size: getLocalStorage('size') || 'small',
	language: getLocalStorage('language') || 'zh',
	tagsView: getLocalStorage('tagsView') || true
};

const getters = {
	theme: state => state.theme,
	size: state => state.size,
	language: state => state.language,
	tagsView: state => state.tagsView
};

const mutations = {
	// 设置主题
	SET_THEME: (state, theme) => {
		state.theme = theme;
		setLocalStorage('theme', theme);
	},
	// 设置尺寸
	SET_SIZE: (state, size) => {
		state.size = size;
		setLocalStorage('size', size);
	},
	// 设置语言
	SET_LANGUAGE: (state, language) => {
		state.language = language;
		setLocalStorage('language', language);
	},
	// 设置标签栏
	SET_TAGS: state => {
		state.tagsView = !state.tagsView;
		// setLocalStorage('tagsView', tagsView);
	}
};

const actions = {
	settingTheme({ commit }, theme) {
		commit('SET_THEME', theme);
	},
	setSize({ commit }, size) {
		commit('SET_SIZE', size);
	},
	setLanguage({ commit }, lang) {
		commit('SET_LANGUAGE', lang);
	},
	setTagsView({ commit }) {
		commit('SET_TAGS');
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
