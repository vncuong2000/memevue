<template>
  <div class="row">
    <div class="col-lg-8">
      <post-list />
    </div>
    <div class="col-lg-4">
      <slide-bar />
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import SlideBar from "../components/SlideBar.vue";
import { mapActions } from "vuex";
export default {
  components: { PostList, SlideBar },
  name: "home-page",
  methods: {
    ...mapActions(["getListPostHasPaging"])
  },
  created() {
    var tagIndex = parseInt(this.$route.query.tagIndex);
    this.getListPostHasPaging({ tagIndex });
  },
  watch: {
    $route(to, from) {
      var tagIndex = parseInt(to.query.tagIndex);
      this.getListPostHasPaging({ tagIndex });
    }
  }
};
</script>

<style></style>
