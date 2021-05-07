export default {
  SET_LIST_POST(state, data) {
    console.log("%cStore/post/mutations.js--SET_LIST_POST", "color:blue");
    state.listPost = data;
  },
  PUSH_LIST_POST(state, data) {
    console.log("%cStore/post/mutations.js--PUSH_LIST_POST", "color:blue");
    state.listPost = [...state.listPost, ...data];
  },
  SET_POST_DETAIL(state, data) {
    console.log("%cStore/post/mutations.js--SET_POST_DETAIL", "color:blue");
    state.postDetail = data;
  },
};
