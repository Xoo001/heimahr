const getters = {
  sidebar: state => state.app.sidebar, // 去app模块下的sidebar属性
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.userInfo.staffPhoto, // 用户头像
  name: state => state.user.userInfo.username // 用户名称
}
// getters便捷访问
export default getters
