import HomePage from './container';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/article/:id?',
    exact: true,
    component: HomePage
  }
];
