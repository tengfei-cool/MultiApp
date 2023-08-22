export default [
    {
      path: '/',
      name: 'index',
      component: () => import('@Projects/页面名称/views/index.vue'),
      meta: { title: '首页' }
    }
  ]