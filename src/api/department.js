import request from '@/utils/request'
// 组织架构相关接口

// 获取部门列表
export const getDepartment = () => {
  return request.get('/company/department')
}

// 获取负责人列表
export const getUserSimple = () => {
  return request.get('/sys/user/simple')
}

// 新增部门
export const addDepartment = data => {
  return request.post('/company/department', data)
}

// 获取部门详情
export const getDepartmentDetail = id => {
  return request.get(`/company/department/${id}`)
}

// 更新部门详情
export const updateDepartmentDetail = data => {
  return request.put(`/company/department/${data.id}`, data)
}

// 删除部门详情
export const deleteDepartmentDetail = id => {
  return request.delete(`/company/department/${id}`)
}
