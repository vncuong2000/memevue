<template>
  <div class="ass1-section__list">
    <post-item v-for="item in getListPost" :key="item.PID" :post="item" />
    <button
      v-if="getListPost && getListPost.length"
      @click="handleLoadMore"
      class="load-more ass1-btn"
    >
      <span>Xem thêm</span>
    </button>
    <h3 v-else>Danh sách rỗng</h3>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
import { mapGetters, mapActions } from "vuex";
import { PAGE_SIZE, CURRENT_PAGE } from "../const";
export default {
  components: { PostItem },
  data() {
    return {
      pagesize: PAGE_SIZE,
      currPage: CURRENT_PAGE
    };
  },
  name: "post-list",
  computed: {
    ...mapGetters(["getListPost"])
  },
  methods: {
    ...mapActions(["getListPostHasPaging"]),
    handleLoadMore() {
      console.log("%cPostList.vue--handleLoadMore", "color:green");
      this.currPage = this.currPage + 1;
      let obj = {
        pagesize: this.pagesize,
        currPage: this.currPage,
        tagIndex: parseInt(this.$route.query.tagIndex)
      };
      this.getListPostHasPaging(obj);
    }
  },
  created() {
    console.log("%cPostList--created", "color:green");
  },
  watch: {
    $route(to, from) {
      console.log("%cPostList.vue--watch($route)", "color:green");
      this.currPage = CURRENT_PAGE;
    }
  }
};
</script>

<style></style>
