export default [
    {
      path: '/',
      name: 'index',
      component: () => import('@Projects/admin/views/index.vue'),
      meta: { title: '首页' }
    }
  ]