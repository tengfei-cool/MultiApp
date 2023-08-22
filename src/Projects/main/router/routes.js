export default [
    {
      path: '/',
      name: 'index',
      component: () => import('@Projects/main/views/index.vue'),
      meta: { title: '首页' }
    }
  ]