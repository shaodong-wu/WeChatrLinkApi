const axios = require('axios');
const { 
  BASE_URL, 
  TIMEOUT 
} = require('../config').NetWork;


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

instance.interceptors.request.use(config => {
  // 请求拦截器
  return config;
}, err => {
  // 请求异常俘获器
});


instance.interceptors.response.use(res => {
  // 响应拦截器
  return res.data;
}, err =>{
  // 响应异常俘获器
});

module.exports = instance;