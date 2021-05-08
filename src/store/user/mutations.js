import Vue from "vue";
import { CONFIG_ACCESS_TOKEN } from "../../const";

export default {
  SET_USER_INFO(state, data) {
    Vue.set(state.users, data.USERID, data);
  },
  SET_LOGIN_INFO(state, { user = null, token = "" }) {
    localStorage.setItem(CONFIG_ACCESS_TOKEN, token);
    state[CONFIG_ACCESS_TOKEN] = token;
    state.currentUser = user;
  },
  SET_LOGOUT(state) {
    (state[CONFIG_ACCESS_TOKEN] = ""),
      (state.currentUser = null),
      localStorage.removeItem(CONFIG_ACCESS_TOKEN);
  },
  SET_USER_POSTS(state, { posts, userid }) {
    Vue.set(state.posts, userid, posts);
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  }
};
