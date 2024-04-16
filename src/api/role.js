import requset from '@/utils/request'

// 获取角色列表数据
export const getRoleList = (page, pagesize) => {
  return requset.get('/sys/role', {
    params: { page, pagesize }
  })
}
