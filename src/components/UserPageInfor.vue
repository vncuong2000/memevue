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
            <div class="ass1-head-user__name-icon">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              class="svg-inline--fa fa-check-circle fa-w-16"
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              />
            </svg>
            </div>
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
        return "https://i.pinimg.com/170x/3c/63/1a/3c631aab6d165c9abafa4e387ebf6936.jpg";
      }
    }
  }
};
</script>

<style>
.ass1-head-user__name{
  display: flex;
}
.ass1-head-user__name-icon{
  width: 20px;
  color: #3482e2;
  display: flex;
  align-items: center;
}
</style>
