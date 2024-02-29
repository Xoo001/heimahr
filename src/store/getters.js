const getters = {
  sidebar: state => state.app.sidebar, // 去app模块下的sidebar属性
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
// getters便捷访问
export default getters
