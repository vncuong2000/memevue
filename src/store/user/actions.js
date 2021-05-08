import axiosInstance from "../../plugins/axios";
import { parseJwt } from "../../helpers";
import { CONFIG_ACCESS_TOKEN } from "../../const";
export default {
  async getUserById({ commit }, { userid = null }) {
    var config = {
      params: {
        userid: userid
      }
    };
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.get("/member/member.php", config);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        commit("SET_USER_INFO", result.data.user);
        return {
          ok: true,
          error: null,
          data: result.data.user
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async login({ commit, dispatch }, { email = "", password = "" }) {
    let data = {
      email: email,
      password: password
    };
    try {
      commit("SET_LOADING", true);
      let result = await axiosInstance.post("/member/login.php", data);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        commit("SET_USER_INFO", result.data.user);
        commit("SET_LOGIN_INFO", result.data);
        let promisePost = await dispatch("getListPostByUserId", {
          userid: result.data.user.USERID
        });
        return {
          ok: true,
          error: null
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async checkLogin({ commit, dispatch }) {
    try {
      let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
      let userObj = parseJwt(tokenLocal);
      if (userObj) {
        let promiseUser = dispatch("getUserById", { userid: userObj.id });
        let promisePost = dispatch("getListPostByUserId", {
          userid: userObj.id
        });
        let [resultUser, resultPostUser] = await Promise.all([
          promiseUser,
          promisePost
        ]);
        if (resultUser.ok) {
          let data = {
            user: resultUser.data,
            token: tokenLocal
          };
          commit("SET_LOGIN_INFO", data);
          return {
            ok: true,
            error: null
          };
        }
        return {
          ok: false,
          error: null
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async logout({ commit }) {
    commit("SET_LOGOUT");
  },
  async getListPostByUserId({ commit }, { userid }) {
    try {
      let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
      let config = {
        params: {
          userid: userid
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tokenLocal}`
        }
      };
      commit("SET_LOADING", true);
      let result = await axiosInstance.get(
        "/post/getListPostUserID.php",
        config
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        let obj = {
          userid: userid,
          posts: result.data.posts
        };
        commit("SET_USER_POSTS", obj);
        return {
          ok: true,
          error: null,
          data: result.data.posts || []
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async register({ commit, dispatch }, data) {
    try {
      commit("SET_LOADING", true);
      let result = await axiosInstance.post("/member/register.php", data);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        let objLoginInfo = {
          user: result.data.user,
          token: result.data.token
        };
        commit("SET_USER_INFO", result.data.user);
        commit("SET_LOGIN_INFO", objLoginInfo);
        await dispatch("getListPostByUserId", {
          userid: result.data.user.USERID
        });
        return {
          ok: true,
          error: null
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async updateProfile(
    { commit },
    { fullname = "", description = "", gender = "", avatar = null }
  ) {
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("fullname", fullname);
      bodyFormData.append("description", description);
      bodyFormData.append("gender", gender);
      if (avatar) {
        bodyFormData.append("avatar", avatar);
      }
      let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenLocal}`
        }
      };
      commit("SET_LOADING", true);
      let result = await axiosInstance.post(
        "/member/update.php",
        bodyFormData,
        config
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        commit("SET_CURRENT_USER", result.data.user);
        return {
          ok: true,
          error: null,
          data: result.data.user
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  async changePassword({ commit }, data) {
    try {
      let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocal}`
        }
      };
      commit("SET_LOADING", true);
      let result = await axiosInstance.post(
        "/member/password.php",
        data,
        config
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return {
          ok: true,
          error: null,
          message: result.data.message
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  }
};
