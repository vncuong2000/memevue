<template>
  <div class="ass1-login">
    <div class="ass1-login__content">
      <p>Đổi mật khẩu</p>
      <div class="ass1-login__form">
        <form action="#" @submit.prevent="handleChangePassword">
          <input
            v-model="oldPassword"
            type="password"
            class="form-control"
            placeholder="Mật khẩu cũ"
            required=""
          />
          <input
            v-model="newPassword"
            type="password"
            class="form-control"
            placeholder="Mật khẩu mới"
            required=""
          />
          <input
            v-model="reNewPassword"
            type="password"
            class="form-control"
            placeholder="Xác nhận mật khẩu mới"
            required=""
          />
          <div class="ass1-login__send justify-content-center">
            <button type="submit" class="ass1-btn">Gửi</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "change-password",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: ""
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapActions(["changePassword"]),
    checkIsCurrentUser() {
      if (this.currentUser && this.userid) {
        if (this.currentUser.USERID != this.userid) {
          this.$router.push("/");
        }
      }
    },
    handleChangePassword() {
      let data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        reNewPassword: this.reNewPassword
      };
      if (data.oldPassword && data.newPassword && data.reNewPassword) {
        if (data.newPassword != data.reNewPassword) {
          alert("Nhập mật khẩu mới không khớp");
        } else if (data.oldPassword == data.newPassword) {
          alert("Mật khẩu mới phải khác mật khẩu cũ");
        } else {
          this.changePassword(data).then(resp => {
            if (resp.ok) {
              alert(resp.message);
              this.$router.push("/");
            } else {
              alert(resp.error);
            }
          });
        }
      } else {
        alert("Vui lòng nhập đầy đủ thông tin");
      }
    }
  },
  watch: {
    $route(to, from) {
      this.userid = to.params.id;
      this.checkIsCurrentUser();
    }
  },
  created() {
    this.userid = this.$route.params.id;
    this.checkIsCurrentUser();
  }
};
</script>

<style></style>
