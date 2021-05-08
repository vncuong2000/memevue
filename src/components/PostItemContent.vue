<template>
  <div class="ass1-section__content">
    <p v-html="formatPostContent"></p>
    <div class="ass1-section__image">
      <router-link :to="getPostLink">
        <img :src="post.url_image" :alt="post.post_content" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { replaceAll } from "../helpers";

export default {
  name: "post-item-content",
  props: {
    post: { type: Object, default: null }
  },
  computed: {
    getPostLink() {
      return {
        name: "post-detail",
        params: {
          id: this.post.PID
        }
      };
    },
    formatPostContent() {
      if (this.$route.name === "search") {
        return replaceAll(
          this.post.post_content,
          this.$route.query.query,
          `<mark>${this.$route.query.query}</mark>`
        );
      } else {
        return this.post.post_content;
      }
    }
  }
};
</script>

<style></style>
