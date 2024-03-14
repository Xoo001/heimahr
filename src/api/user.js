import request from '@/utils/request'

// 登陆接口
export const login = data => {
  return request.post('/sys/login', data)
}
