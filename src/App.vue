<template>
  <div id="app">
    <app-header v-if="isRenderHeader" />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <app-footer v-if="isRenderFooter" />
    <loading :class="{ show: isLoading }" />
  </div>
</template>

<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import Loading from "./components/Loading.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  components: { AppHeader, AppFooter, Loading },
  computed: {
    ...mapState(["isLoading"]),
    isRenderHeader() {
      var arrRouter = ["login", "register"];
      var routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) {
        return false;
      }
      return true;
    },
    isRenderFooter() {
      var arrRouter = ["home-page", "post-detail"];
      var routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) {
        return false;
      }
      return true;
    }
  },
  methods: {
    ...mapActions(["checkLogin"])
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style></style>
