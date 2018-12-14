import axios from 'axios';
// https://www.jianshu.com/p/7a9fbcbb1114

const fetchAPI = axios.create({
  // baseURL: isDevelopment ? 'https://www.easy-mock.com/mock/593611b991470c0ac101d474' : '/',
  baseURL: '/api',
  timeout: 10000, // 设置超时时间
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default fetchAPI;
