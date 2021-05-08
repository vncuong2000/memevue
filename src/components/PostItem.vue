<template>
  <div class="ass1-section__item" v-if="post">
    <div class="ass1-section">
      <post-item-head :post="post" />
      <post-item-content :post="post" />
      <post-item-footer :post="post" />
    </div>
  </div>
</template>

<script>
import PostItemContent from "./PostItemContent.vue";
import PostItemFooter from "./PostItemFooter.vue";
import PostItemHead from "./PostItemHead.vue";
export default {
  components: { PostItemFooter, PostItemContent, PostItemHead },
  name: "post-item",
  props: {
    post: { type: Object, default: null }
  }
};
</script>

<style></style>
