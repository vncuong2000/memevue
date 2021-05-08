<template>
  <div class="ass1-login" v-if="currentUser">
    <div class="ass1-login__content">
      <p>Profile</p>

      <div class="ass1-login__form">
        <div class="avatar">
          <img :src="getAvatar" alt="" />
        </div>
        <form action="#" @submit.prevent="handleEditProfile">
          <input
            :value="currentUser.fullname"
            @input="fullname = $event.target.value"
            type="text"
            class="form-control"
            placeholder="Tên ..."
            required=""
          />

          <select
            class="form-control"
            :value="currentUser.gender"
            @change="gender = $event.target.value"
          >
            <option value="">Giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
          <input
            @change="uploadAvatar"
            type="file"
            name="avatar"
            placeholder="Ảnh đại diện"
            class="form-control"
          />
          <textarea
            :value="currentUser.description"
            @input="description = $event.target.value"
            class="form-control"
            cols="30"
            rows="5"
            placeholder="Mô tả ngắn ..."
          ></textarea>
          <div class="ass1-login__send justify-content-center">
            <button type="submit" class="ass1-btn">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "user-profile",
  data() {
    return {
      userid: this.$route.params.id,
      fullname: "",
      description: "",
      gender: "",
      avatar: {
        base64URL: "",
        objFile: null
      }
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    getAvatar() {
      if (this.avatar.base64URL === "") {
        return this.currentUser.profilepicture;
      }
      return this.avatar.base64URL;
    }
  },
  methods: {
    ...mapActions(["updateProfile"]),
    checkIsCurrentUser() {
      if (this.currentUser && this.userid) {
        if (this.currentUser.USERID != this.userid) {
          this.$router.push("/");
        }
      }
    },
    handleEditProfile() {
      if (!this.fullname) {
        this.fullname = this.currentUser.fullname;
      }
      if (!this.description) {
        this.description = this.currentUser.description;
      }
      if (!this.gender) {
        this.gender = this.currentUser.gender;
      }
      let data = {
        fullname: this.fullname,
        description: this.description,
        gender: this.gender
      };
      if (this.avatar.objFile) {
        data.avatar = this.avatar.objFile;
      }
      this.updateProfile(data).then(resp => {
        if (resp.ok) {
          alert("Cập nhập thông tin thành công");
        }
        this.$router.push("/");
      });
    },
    uploadAvatar(e) {
      let file;
      if (e.target.files && e.target.files.length) {
        file = e.target.files[0];
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            this.avatar.base64URL = reader.result;
            this.avatar.objFile = e.target.files[0];
          },
          false
        );
        if (file) {
          reader.readAsDataURL(file);
        }
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
