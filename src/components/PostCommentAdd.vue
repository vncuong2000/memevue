<template>
  <div class="ass1-add-comment">
    <form action="#" @submit.prevent="handleAddComment">
      <input
        v-model="comment"
        type="text"
        class="form-control ttg-border-none"
        placeholder="Thêm một bình luận"
      />
    </form>
    <div class="ass1-add-comment__content">
      <div href="#" class="ass1-add-comment__btn-save ass1-btn-icon">
        <span>{{ maxLength - comment.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "post-comment-add",
  data() {
    return {
      postid: this.$route.params.id,
      comment: "",
      maxLength: 120
    };
  },
  methods: {
    ...mapActions(["postNewCommentForNews"]),
    handleAddComment() {
      if (this.comment && this.comment.length <= this.maxLength) {
        let data = {
          comment: this.comment,
          postid: this.postid
        };
        this.postNewCommentForNews(data).then(resp => {
          if (!resp.ok) {
            alert("Đăng comment không thành công");
          } else {
            this.comment = "";
          }
        });
      } else {
        alert("Dữ liệu không hợp lệ");
      }
    }
  }
};
</script>

<style></style>
