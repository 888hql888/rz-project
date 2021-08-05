const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  companyId: state => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}
export default getters
