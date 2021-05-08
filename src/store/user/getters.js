import { parseJwt } from "../../helpers";
import { CONFIG_ACCESS_TOKEN } from "../../const";

export default {
  isLogin: state => {
    let userObj = parseJwt(state[CONFIG_ACCESS_TOKEN]);
    if (userObj) {
      return true;
    } else {
      return false;
    }
  },
  getListPostOfCurrentUser(state) {
    if (state.currentUser) {
      let userId = state.currentUser.USERID;
      return state.posts[userId];
    }
    return null;
  },
  currentUser(state) {
    return state.currentUser;
  }
};
