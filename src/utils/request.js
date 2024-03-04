import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/api', // 基础地址
  timeout: 10000
}) // 创建一个axios实力

// 请求拦截器 注入token
service.interceptors.request.use(function(config) {
  // 注入token
  // store.getters.token => 放入请求头
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(function(response) {
  // 2xx 范围内的状态码都会触发该函数。
  const { success, data, message } = response.data
  // 对响应数据做点什么
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  Message.error(error.message)
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
