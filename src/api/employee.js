import request from '@/utils/request'

// 获取员工数据
export const getEmployeeList = params => {
  return request.get('/sys/user', {
    params
  })
}

// 导出表格
export const exportEmployee = () => {
  return request.get('/sys/user/export', { responseType: 'blob' })
}
