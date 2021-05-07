import { CONFIG_ACCESS_TOKEN } from "../../const";

export default {
  currentUser: null,
  users: {},
  posts: {},
  [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN)
};
