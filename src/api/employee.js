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

// 下载表格模版
export const downloadExcel = () => {
  return request.get('/sys/user/import/template', { responseType: 'blob' })
}

// 上传用户表格
export const updateExcel = data => {
  return request.post('/sys/user/import', data)
}
