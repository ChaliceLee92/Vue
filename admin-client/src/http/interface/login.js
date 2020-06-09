import axios from '../api';

export const login = (data) => {
  return axios({
    url: '/api/login',
    method: 'post',
    data
  });
};

export const addUser = (data) => {
  return axios({
    url:'/api/addUser',
    method:'post',
    data
  })
}