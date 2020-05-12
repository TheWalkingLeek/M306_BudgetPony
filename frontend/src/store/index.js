import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: localStorage.getItem("email")
  },
  mutations: {
    login(state, email) {
      state.email = email;
      localStorage.setItem("email", email);
    },

    logout(state) {
      state.email = undefined;
      localStorage.removeItem("email");
    }
  },
  getters: {
    loggedIn: s => s && !!s.email
  },
  actions: {},
  modules: {}
});
