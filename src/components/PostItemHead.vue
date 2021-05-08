<template>
  <div class="ass1-section__head">
    <router-link :to="getUserLink" class="ass1-section__avatar ass1-avatar">
      <img :src="getAvatar" :alt="post.fullname" />
    </router-link>
    <div>
      <router-link
        :to="getUserLink"
        class="ass1-section__name"
        v-html="formatFullName"
      ></router-link>
      <span class="ass1-section__passed">{{ formatTime }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { replaceAll } from "../helpers";
export default {
  name: "post-item-header",
  props: {
    post: { type: Object, default: null }
  },
  computed: {
    getAvatar() {
      if (this.post.profilepicture) return this.post.profilepicture;
      return "/public/assets/avatar-02.png";
    },
    getUserLink() {
      let userid = this.post.USERID || 1;
      return {
        name: "user-page",
        params: {
          id: userid
        }
      };
    },
    formatTime() {
      moment.locale("vi");
      return moment(this.post.time_added).fromNow();
    },
    formatFullName() {
      if (this.$route.name === "search") {
        return replaceAll(
          this.post.fullname,
          this.$route.query.query,
          `<mark>${this.$route.query.query}</mark>`
        );
      } else {
        return this.post.fullname;
      }
    }
  }
};
</script>

<style>
</style>
