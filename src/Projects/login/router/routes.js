export default [
    {
      path: '/',
      name: 'index',
      component: () => import('@Projects/login/views/index.vue'),
      meta: { title: '首页' }
    }
  ]