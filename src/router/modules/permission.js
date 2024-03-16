import layout from '@/layout'
export default {
  // 路由信息
  path: '/permission',
  component: layout,
  children: [{
    path: '', // 二级路由为空表示既能显示 一级路由 + 二级路由
    component: () => import('@/views/permission'),
    name: 'permission',
    meta: {
      // 路由元信息 存数据用的
      icon: 'lock',
      title: '权限'
    }
  }]
}
