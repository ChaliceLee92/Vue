import axios from '../http';
// 获取诗词资源
export function getPoemResource(params) {
	return axios({
		url: '/poem_resource',
		method: 'get',
		params
	});
}

// 新增诗词资源
export function createPoemResource(data) {
	return axios({
		url: '/poem_resource',
		method: 'post',
		data
	});
}

// 更新诗词资源
export function updateUser(user_id, data) {
	return axios({
		url: `/user/${user_id}`,
		method: 'put',
		data
	});
}

// 删除诗词资源
export function DeleteUser(user_id, mobile) {
	return axios({
		url: `/user/${user_id}`,
		method: 'delete',
		data: {
			mobile
		}
	});
}
