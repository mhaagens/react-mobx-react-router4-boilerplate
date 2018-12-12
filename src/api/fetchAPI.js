import axios from 'axios';
import { isDevelopment } from '../constants/env';

// https://www.jianshu.com/p/7a9fbcbb1114

const fetchAPI = axios.create({
  // baseURL: isDevelopment ? 'https://www.easy-mock.com/mock/593611b991470c0ac101d474' : '/',
  baseURL: isDevelopment ? 'http://jsonplaceholder.typicode.com' : '/api',
  timeout: 5000, // 设置超时时间
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default fetchAPI;
