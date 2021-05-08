import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import post from "./post";
import user from "./user";

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    isLoading: false
  },
  actions: {
    setLoading({ commit }, loading = false) {
      commit("SET_LOADING", loading);
    }
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    }
  },
  modules: {
    post,
    user
  }
});

export default store;
