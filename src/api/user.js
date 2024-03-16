import request from '@/utils/request'

// 登陆接口
export const login = data => {
  return request.post('/sys/login', data)
}

// 用户信息
export const getUserInfo = () => {
  return request.get('/sys/profile')
}

// 重置密码
export const uploadPassword = (data) => {
  return request.put('/sys/user/updatePass', data)
}
