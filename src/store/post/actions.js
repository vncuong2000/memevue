import axiosInstance from "../../plugins/axios";
import { PAGE_SIZE, CURRENT_PAGE } from "../../const";
export default {
  async getListPostHasPaging(
    { commit },
    { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }
  ) {
    console.log("%cStore/post/actions.js--getListPostHasPaging", "color:blue");
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
    console.log("%cStore/post/actions.js--getPostDetailById", "color:blue");
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
        var user = await dispatch("getUserById", {
          userid: result.data.data.post.USERID
        });

        commit("SET_POST_DETAIL", result.data.data);
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
    console.log("%cStore/post/actions.js--getListPostHasPaging", "color:blue");
    var config = {
      params: {
        query
      }
    };
    try {
      commit("SET_LOADING", true);
      var result = await axiosInstance.get("/post/search.php", config);
      console.log(result);
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
  }
};
