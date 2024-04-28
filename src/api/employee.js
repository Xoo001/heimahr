import requset from '@/utils/request'
// 获取员工数据
export const getEmployeeList = params => {
  return requset.get('/sys/user', {
    params
  })
}
