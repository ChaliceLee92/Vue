import Vue from 'vue';
import Router from 'vue-router';
import home from '../views/Home/home.vue';
import detail from '../views/Detail/detail.vue';

Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: home,
		},
		{
			path: '/detail',
			name: 'detail',
			component: detail,
		},
	],
});
