import axios from '../http';

// 获取qiniu token
export const getQnToken = () => {
	return axios({
		url: `${process.env.VUE_APP_GRAPHQL}/getqiniutoken`,
		method: 'GET'
	});
};
