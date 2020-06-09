import axios from '../api';

export const list = () => {
  return axios({
    url: '/list',
    method: 'get',
  });
};