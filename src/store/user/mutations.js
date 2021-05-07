import Vue from "vue";
import { CONFIG_ACCESS_TOKEN } from "../../const";

export default {
  SET_USER_INFO(state, data) {
    console.log("%cStore/user/mutations.js--SET_USER_INFO", "color:blue");
    Vue.set(state.users, data.USERID, data);
  },
  SET_LOGIN_INFO(state, { user = null, token = "" }) {
    console.log("%cStore/user/mutations.js--SET_LOGIN_INFO", "color:blue");
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
    console.log("%cStore/user/mutations.js--SET_USER_POSTS", "color:blue");
    Vue.set(state.posts, userid, posts);
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  }
};
