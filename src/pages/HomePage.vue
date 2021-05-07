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
    console.log("%cHomePage.vue--created", "color:green");
    var tagIndex = parseInt(this.$route.query.tagIndex);
    this.getListPostHasPaging({ tagIndex });
  },
  watch: {
    $route(to, from) {
      console.log("%cHomePage.vue--watch($route)", "color:green");
      var tagIndex = parseInt(to.query.tagIndex);
      this.getListPostHasPaging({ tagIndex });
    }
  }
};
</script>

<style></style>
