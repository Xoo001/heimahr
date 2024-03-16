import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employee'),
      name: 'employee',
      meta: {
        icon: 'people',
        title: '员工'
      }
    }
  ]
}
