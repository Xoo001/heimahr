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
