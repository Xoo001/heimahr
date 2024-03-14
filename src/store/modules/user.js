import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 缓存读取初始值
}

const mutations = {
  // 存储token的值
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  // 删除token
  removeToken() {
    // 删除vuex的token
    this.token = null
    // 删除缓存
    removeToken()
  }
}

const actions = {
  // 登录
  // action里面有两个参数，第一个参数为context上下文
  async login(context, data) {
    // console.log(data)
    // todo：调用接口
    const token = await login(data)
    // console.log(token)
    // 返回一个token 1234
    // commit 提交 调用setToken方法保存token
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
