import axios from '../api';

export const upload = () => {
  return axios({
    url: '/upload',
    method: 'get',
  });
};