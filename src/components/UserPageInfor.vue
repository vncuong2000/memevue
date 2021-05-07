<template>
  <div class="ass1-head-user" v-if="userInfor">
    <div class="ass1-head-user__content">
      <div class="ass1-head-user__image">
        <a href="#"><img :src="getAvatar" :alt="userInfor.fullname"/></a>
      </div>
      <div class="ass1-head-user__info">
        <div class="ass1-head-user__info-head">
          <div class="ass1-head-user__name">
            <span>{{ userInfor.fullname }}</span>
            <i
              ><img src="/public/fonts/emotion/svg/Verified.svg" alt="Verified"
            /></i>
          </div>
          <div class="w-100"></div>
          <router-link
            v-if="!isCurrentUser"
            to="/"
            class="ass1-head-user__btn-follow ass1-btn"
          >
            Theo dõi
          </router-link>
          <template v-else>
            <router-link
              :to="{
                name: 'change-password',
                params: {
                  id: userInfor.USERID
                }
              }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Đổi mật khẩu
            </router-link>
            <router-link
              :to="{
                name: 'user-profile',
                params: {
                  id: userInfor.USERID
                }
              }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Profile
            </router-link>
          </template>
          <!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
        </div>
        <div class="ass1-head-user__info-statistic">
          <div class="ass1-btn-icon">
            <i class="icon-Post"></i><span>Bài viết: {{ countPost }}</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Followers"></i
            ><span>Theo dõi: {{ userInfor.yourviewed }}</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Following"></i
            ><span>Đang theo dõi: {{ userInfor.youviewed }}</span>
          </div>
        </div>
        <p>{{ userInfor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "user-page-infor",
  props: {
    userInfor: { type: Object, default: null },
    countPost: { type: Number, default: 0 }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isCurrentUser() {
      if (this.currentUser && this.userInfor) {
        if (this.currentUser.USERID === this.userInfor.USERID) {
          return true;
        }
      }
      return false;
    },
    getAvatar() {
      if (this.userInfor.profilepicture) {
        return this.userInfor.profilepicture;
      } else {
        return "/public/assets/avatar-01.png";
      }
    }
  }
};
</script>

<style></style>
