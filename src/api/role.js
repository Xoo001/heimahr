import request from '@/utils/request'

// 获取角色列表数据
export const getRoleList = (page, pagesize) => {
  return request.get('/sys/role', {
    params: { page, pagesize }
  })
}

// 添加角色接口
export const addRole = ({ name, description, state }) => {
  return request.post('/sys/role', {
    name, description, state
  })
}

// 修改角色接口
export const editRole = editRow => {
  return request.put(`/sys/role/${editRow.id}`, editRow)
}

// 删除角色接口
export const delRole = id => {
  return request.delete(`/sys/role/${id}`)
}
