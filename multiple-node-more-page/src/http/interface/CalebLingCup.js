import axios from '../http';
// 获取评委列表
export function getJudges(params) {
	return axios({
		url: '/judges',
		method: 'GEt',
		params
	});
}
export function getReviews(params) {
	return axios({
		url: '/reviews',
		method: 'GEt',
		params
	});
}

export function updateReviews(mobile, data) {
	return axios({
		url: `/reviews/${mobile}`,
		method: 'PUT',
		data
	});
}

// 新增审核
export function createJudges(data) {
	return axios({
		url: '/judges',
		method: 'POST',
		data
	});
}
export function EditJudges(mobile, data) {
	return axios({
		url: `/judges/${mobile}`,
		method: 'PUT',
		data
	});
}

export function JudgesDetail(id, params) {
	return axios({
		url: `/judges/${id}`,
		method: 'GET',
		params
	});
}

export function division() {
	return axios({
		url: `/division`,
		method: 'GET'
	});
}
