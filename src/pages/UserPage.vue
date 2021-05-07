<template>
  <div>
    <user-page-infor :userInfor="userInfor" :countPost="countPost" />
    <div
      v-if="listPostOfUser && listPostOfUser.length"
      v-masonry
      column-width=".grid-sizer"
      transition-duration="0.3s"
      item-selector=".ass1-section__item"
      class="ass1-section__wrap row ass1-section__isotope-init"
    >
      <div class="grid-sizer"></div>
      <post-item
        v-masonry-tile
        v-for="item in listPostOfUser"
        :key="item.PID"
        :post="item"
        class="col-lg-6"
      />
    </div>
  </div>
</template>

<script>
import PostItem from "../components/PostItem.vue";
import { mapActions } from "vuex";
import UserPageInfor from "../components/UserPageInfor.vue";
export default {
  components: { PostItem, UserPageInfor },
  name: "user-page",
  data() {
    return {
      userid: this.$route.params.id,
      userInfor: null,
      listPostOfUser: []
    };
  },
  computed: {
    countPost() {
      if (this.listPostOfUser && this.listPostOfUser.length) {
        return this.listPostOfUser.length;
      }
      return 0;
    }
  },
  methods: {
    ...mapActions(["getUserById", "getListPostByUserId", "setLoading"]),
    async fetchAllData() {
      let promiseUser = this.getUserById({ userid: this.userid });
      let promisePost = this.getListPostByUserId({ userid: this.userid });
      this.setLoading(true);
      let [resultUser, resultPostUser] = await Promise.all([
        promiseUser,
        promisePost
      ]);
      this.setLoading(false);
      if (resultUser.ok && resultPostUser.ok) {
        this.userInfor = resultUser.data;
        this.listPostOfUser = resultPostUser.data;
        this.$redrawVueMasonry();
      } else {
        this.$router.push("/");
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log("%cUserPage.vue--watch($route)", "color:green");
      this.userid = to.params.id;
      this.fetchAllData();
    }
  },
  created() {
    console.log("%cUserPage.vue--created", "color:green");
    this.userid = this.$route.params.id;
    this.fetchAllData();
  }
};
</script>

<style></style>
