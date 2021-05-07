export default {
  getListPost: state => {
    console.log("%cStore/post/getters.js--getListPost", "color:blue");
    return state.listPost;
  },
  getDataPostDetail: (state, getters, rootState) => {
    console.log("%cStore/post/getters.js--getDataPostDetail", "color:blue");
    if (state.postDetail && state.postDetail.post) {
      let USERID = state.postDetail.post.USERID;
      let user = rootState.user.users[USERID];
      return {
        post: {
          ...state.postDetail.post,
          fullname: user.fullname,
          profilepicture: user.profilepicture
        },
        categories: state.postDetail.categories
      };
    }
  },
};
