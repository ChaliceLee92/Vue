import axios from '../http';
// 获取审核列表
export function getTeacherList(params) {
	return axios({
		url: '/teacher',
		method: 'get',
		params
	});
}

// 新增审核
export function createTeacher(data) {
	return axios({
		url: '/teacher',
		method: 'post',
		data
	});
}

// 更新学校
export function updateTeacher(teacherId, data) {
	return axios({
		url: `/teacher/${teacherId}`,
		method: 'put',
		data
	});
}

// 删除用户
export function DeleteSchool(schoolId) {
	return axios({
		url: `/school/${schoolId}`,
		method: 'delete'
	});
}

// GRAPHQL 接口
export function graphqlPostApi(data) {
	return axios({
		url: `${process.env.VUE_APP_GRAPHQL}/graphql`,
		method: 'POST',
		data
	});
}

export function graphqlGetApi(params) {
	return axios({
		url: `${process.env.VUE_APP_GRAPHQL}/graphql`,
		method: 'GET',
		// headers: {
		//     authorization:
		//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI4YTEwMTUyZi1hMWY4LTRiMTYtOGZiNi04MTdlMDY2ZTgwZjQiLCJhZG1pbl9pZCI6ImJlMjc3YTUzNTNmYzdkNTYzNjA2MTE0NTZlMThiZTgxIiwiaWF0IjoxNTg2NDg4MDMzLCJleHAiOjE1ODcwOTI4MzN9.bfRIliuAUqGMg3pyuPP67kTEtG1pMaO5glB8_Q9OYoU'
		// },
		params
	});
}

export function uploadData(params) {
	return axios({
		url: `${process.env.VUE_APP_GRAPHQL}/generateGameUsersCsv`,
		method: 'GET',
		params
	});
}

export function exlsUpload(params) {
	return axios({
		url: `${process.env.VUE_APP_GRAPHQL}/exportGameByTime`,
		method: 'GET',
		params
	});
}
