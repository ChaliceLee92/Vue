import Cookies from 'js-cookie';

const types = {
	TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
		withoutAnimation: false
	}
};
const getters = {
	sidebar: state => state.sidebar.opened
};
const mutations = {
	[types.TOGGLE_SIDEBAR](state) {
		state.sidebar.opened = !state.sidebar.opened;
		state.sidebar.withoutAnimation = false;
		if (state.sidebar.opened) {
			Cookies.set('sidebarStatus', 1);
		} else {
			Cookies.set('sidebarStatus', 0);
		}
	}
};
const actions = {
	toggleSideBar({ commit }) {
		commit(types.TOGGLE_SIDEBAR);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
