import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    title: 'SAAS管理后台',
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