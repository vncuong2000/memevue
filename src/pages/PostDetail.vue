<template>
  <div class="row">
    <div class="col-lg-8">
      <div
        class="ass1-section__list"
        v-if="getDataPostDetail && getDataPostDetail.post"
      >
        <div class="ass1-section">
          <post-item :post="getDataPostDetail.post" />
          <ul>
            <li v-for="item in getDataPostDetail.categories" :key="item.TAG_ID">
              <router-link :to="getLinkCategory(item)">
                {{ item.tag_value }}
              </router-link>
            </li>
          </ul>
        </div>
        <post-comment-add />
        <post-comments :comments="getDataPostDetail.comments" />
      </div>
    </div>
    <div class="col-lg-4">
      <slide-bar />
    </div>
  </div>
</template>

<script>
import PostCommentAdd from "../components/PostCommentAdd.vue";
import PostComments from "../components/PostComments.vue";
import PostFeeling from "../components/PostFeeling.vue";
import PostItem from "../components/PostItem.vue";
import SlideBar from "../components/SlideBar.vue";
import { mapActions, mapGetters } from "vuex";
import { removeVietnameseFromString } from "../helpers";

export default {
  components: { PostFeeling, PostItem, PostCommentAdd, PostComments, SlideBar },
  name: "post-detail",
  data() {
    return {
      postid: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters(["getDataPostDetail"])
  },
  methods: {
    ...mapActions(["getPostDetailById"]),
    fetchDataPostDetail() {
      let obj = {
        postid: parseInt(this.postid)
      };
      this.getPostDetailById(obj).then(resp => {
        if (!resp.ok) {
          this.$router.push({
            path: "/",
            query: {
              require: `/post-detail/${this.postid}`
            }
          });
        }
      });
    },
    getLinkCategory(category) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(category.tag_value),
          tagIndex: category.tag_index
        }
      };
    }
  },
  watch: {
    $route(to, from) {
      this.postid = to.params.id;
      this.fetchDataPostDetail();
    }
  },
  created() {
    this.fetchDataPostDetail();
  }
};
</script>

<style></style>
