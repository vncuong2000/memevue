import axiosInstance from "../../plugins/axios";
import { PAGE_SIZE, CURRENT_PAGE, CONFIG_ACCESS_TOKEN } from "../../const";
export default {
  async getListPostHasPaging(
    { commit },
    { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }
  ) {
    var config = {
      params: {
        pagesize,
        currPage
      }
    };
    try {
      var result;
      commit("SET_LOADING", true);
      if (tagIndex) {
        config.params.tagIndex = tagIndex;
        result = await axiosInstance.get("/post/getListByCategory.php", config);
      } else {
        result = await axiosInstance.get("/post/getListPagination.php", config);
      }
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        if (currPage === 1) {
          commit("SET_LIST_POST", result.data.posts);
        } else {
          commit("PUSH_LIST_POST", result.data.posts);
        }
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
  async getPostDetailById({ commit, dispatch }, { postid = null }) {
    var config = {
      params: {
        postid: postid
      }
    };
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.get("/post/post.php", config);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        var promiseUser = dispatch("getUserById", {
          userid: result.data.data.post.USERID
        });
        var promiseComments = dispatch("getListCommentByPostId", { postid });
        var [resultUser, resultComments] = await Promise.all([
          promiseUser,
          promiseComments
        ]);
        let data = {
          ...result.data.data,
          comments: []
        };
        if (resultComments) {
          data.comments = resultComments.comments;
        }
        commit("SET_POST_DETAIL", data);
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
  async getListPostSearch({ commit }, { query }) {
    var config = {
      params: {
        query
      }
    };
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.get("/post/search.php", config);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return {
          ok: true,
          error: null,
          data: result.data.posts
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
  async createNewPost(
    { commit },
    { obj_image = null, url_image = "", post_content = "", category = "" }
  ) {
    let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenLocal}`
      }
    };
    let data = new FormData();
    data.append("post_content", post_content);
    data.append("category", category);
    data.append("url_image", url_image);
    if (obj_image) {
      data.append("obj_image", obj_image);
    }
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.post("/post/addNew.php", data, config);
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
  },
  async getListCommentByPostId({ commit }, { postid }) {
    let config = {
      params: {
        postid
      }
    };
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.get("/comment/comments.php", config);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return {
          ok: true,
          error: null,
          comments: result.data.comments
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
  async postNewCommentForNews(
    { commit, rootState },
    { postid = null, comment = "" }
  ) {
    let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
    let data = {
      postid,
      comment
    };
    let config = {
      headers: {
        Authorization: `Bearer ${tokenLocal}`,
        "Content-type": "application/json"
      }
    };
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.post(
        "/comment/add_new.php",
        data,
        config
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        let comment = {
          ...result.data.body,
          fullname: rootState.user.currentUser.fullname,
          profilepicture: rootState.user.currentUser.profilepicture
        };
        commit("PUSH_LIST_COMMENT", comment);
        return {
          ok: true,
          error: null,
          data: comment
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
