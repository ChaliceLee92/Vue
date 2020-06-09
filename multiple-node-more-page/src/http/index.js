// 导入所有接口
import apiList from './interface';
import handleAPI from './handleAPI';

const install = Vue => {
	if (install.installed) return;
	install.installed = true;

	Object.defineProperties(Vue.prototype, {
		// 注意哦，此处挂载在 Vue 原型的 $api 对象上
		$api: {
			get() {
				return apiList;
			}
		},
		$handleApi: {
			get() {
				return handleAPI;
			}
		}
	});
};

export default install;
