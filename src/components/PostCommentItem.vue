<template>
  <div class="ass1-comments__section" v-if="comment">
    <a href="#" class="ass1-comments__avatar ass1-avatar"
      ><img :src="getAvatar" :alt="comment.fullname"
    /></a>
    <div class="ass1-comments__content">
      <a href="#" class="ass1-comments__name">{{ comment.fullname }}</a>
      <span class="ass1-comments__passed">{{ formatTime }}</span>
      <p>
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "post-comment-item",
  props: {
    comment: { type: Object, default: null }
  },
  computed: {
    getAvatar() {
      if (this.comment.profilepicture) {
        return this.comment.profilepicture;
      } else {
        return "https://i.pinimg.com/170x/3c/63/1a/3c631aab6d165c9abafa4e387ebf6936.jpg";
      }
    },
    formatTime() {
      moment.locale("vi");
      return moment(this.comment.time_added).fromNow();
    }
  }
};
</script>

<style></style>
