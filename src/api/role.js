import requset from '@/utils/request'

// 获取角色列表数据
export const getRoleList = (page, pagesize) => {
  return requset.get('/sys/role', {
    params: { page, pagesize }
  })
}

// 添加角色接口
export const addRole = ({ name, description, state }) => {
  return requset.post('/sys/role', {
    name, description, state
  })
}
