const user = {
  state: {
    id: '',
    name: '系统管理员',
    header: 'https://magex-newhope.oss-cn-hangzhou.aliyuncs.com/ruqi/headImg.png',
  },
  mutations: {
    setUserInfo(state, payload) {
      state.id = payload.id;
      state.name = payload.name;
      state.header = payload.header;
    }
  },
  actions: {

  },
  getters: {

  },
  
}

export default user;