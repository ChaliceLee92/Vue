import axios from '../http';
// 获取Banner列表
export function getBannerList(params) {
	return axios({
		url: '/banner',
		method: 'get',
		params
	});
}

// 新增banner
export function createBanner(data) {
	return axios({
		url: '/banner',
		method: 'post',
		data
	});
}

// 更新banner
export function updateBanner(bannerId, data) {
	return axios({
		url: `/banner/${bannerId}`,
		method: 'put',
		data
	});
}

// 删除banner
export function DeleteBanner(bannerId) {
	return axios({
		url: `/banner/${bannerId}`,
		method: 'delete'
	});
}

// 获取诗教校园位
export function getPoetryList(params) {
	return axios({
		url: '/poetry',
		method: 'get',
		params
	});
}

// 新增诗教校园位
export function createPoetry(data) {
	return axios({
		url: '/poetry',
		method: 'post',
		data
	});
}

// 更新诗教校园位
export function updatePoetry(bannerId, data) {
	return axios({
		url: `/poetry/${bannerId}`,
		method: 'put',
		data
	});
}

// 删除诗教校园位
export function DeletePoetry(bannerId) {
	return axios({
		url: `/poetry/${bannerId}`,
		method: 'delete'
	});
}

// 获取学术指导
export function getGuideList(params) {
	return axios({
		url: '/guide',
		method: 'get',
		params
	});
}

// 新增学术指导
export function createGuide(data) {
	return axios({
		url: '/guide',
		method: 'post',
		data
	});
}

// 更新学术指导
export function updateGuide(bannerId, data) {
	return axios({
		url: `/guide/${bannerId}`,
		method: 'put',
		data
	});
}

// 删除学术指导
export function DeleteGuide(bannerId) {
	return axios({
		url: `/guide/${bannerId}`,
		method: 'delete'
	});
}

// 获取诗教教学资源
export function getTeachResourceList(params) {
	return axios({
		url: `/teach_resource`,
		method: 'get',
		params
	});
}

// 新增诗教教学资源
export function createTeachResourceList(data) {
	return axios({
		url: '/teach_resource',
		method: 'post',
		data
	});
}

// 更新banner
export function updateTeachResourceList(TeachResourceId, data) {
	return axios({
		url: `/teach_resource/${TeachResourceId}`,
		method: 'put',
		data
	});
}

// 删除用户
export function DeleteTeachResourceList(TeachResourceId) {
	return axios({
		url: `/teach_resource/${TeachResourceId}`,
		method: 'delete'
	});
}
