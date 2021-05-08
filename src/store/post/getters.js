export default {
  getListPost: state => {
    return state.listPost;
  },
  getDataPostDetail: (state, getters, rootState) => {
    if (state.postDetail && state.postDetail.post) {
      let USERID = state.postDetail.post.USERID;
      let user = rootState.user.users[USERID];
      return {
        post: {
          ...state.postDetail.post,
          fullname: user.fullname,
          profilepicture: user.profilepicture
        },
        categories: state.postDetail.categories,
        comments: state.postDetail.comments
      };
    }
  }
};
