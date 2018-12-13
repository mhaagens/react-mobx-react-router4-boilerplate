import LazyLoader from 'components/LazyLoader';
import HomePage from './container';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/posts/',
    exact: true,
    component: LazyLoader(() => import('./container/Posts'))
  },
  {
    path: '/posts/:id?',
    exact: true,
    component: LazyLoader(() => import('./container/Article'))
  }
];
