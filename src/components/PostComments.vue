<template>
  <div class="ass1-comments" v-if="comments && comments.length">
    <div class="ass1-comments__head">
      <div class="ass1-comments__title">{{ comments.length }} Bình luận</div>
    </div>
    <post-comment-item
      v-for="item in comments"
      :key="item.CID"
      :comment="item"
    />
  </div>
</template>

<script>
import PostCommentItem from "./PostCommentItem.vue";
export default {
  components: { PostCommentItem },
  name: "post-comment",
  props: {
    comments: { type: Array, default: [] }
  }
};
</script>

<style></style>
