import { createStore } from "vuex";
import user from "./modules/user";

const store = createStore({
  state: {
    title: 'SAAS管理后台',
    version: '1.0',    
  },
  mutations: {
    
  },
  actions: {

  },
  getters: {

  },
  modules: {
    user,
  }

})

export default store;