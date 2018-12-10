import axios from 'axios';
import { isDevelopment } from '../constants/env';

// https://www.jianshu.com/p/7a9fbcbb1114

const fetchAPI = axios.create({
  baseURL: isDevelopment ? 'https://www.easy-mock.com/mock/593611b991470c0ac101d474' : '/',
  timeout: 5000, // 设置超时时间
  headers: { 'X-Custom-Header': 'foobar' }
});

export default fetchAPI;
