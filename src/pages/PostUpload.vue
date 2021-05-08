<template>
  <main>
    <div class="container">
      <!--sections-->
      <div class="row">
        <div class="col-lg-8">
          <!--section-->
          <div class="ass1-section ass1-section__edit-post">
            <div class="ass1-section__content">
              <form action="#">
                <div class="form-group">
                  <input
                    v-model="url_image"
                    type="text"
                    class="form-control ttg-border-none"
                    placeholder="https://"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="post_content"
                    type="text"
                    class="form-control ttg-border-none"
                    placeholder="Mô tả ..."
                  ></textarea>
                </div>
              </form>
              <div class="ass1-section__image">
                <a @click="uploadImage"
                  ><img :src="renderImage" alt="default"
                /></a>
              </div>
              <a
                href="https://memeful.com/"
                target="_blank"
                class="ass1-btn ass1-btn-meme"
                >Chế ảnh từ meme</a
              >
              <button @click="uploadImage" class="ass1-btn ass1-btn-meme">
                Đăng ảnh từ máy tính
              </button>
              <input
                @change="handleUploadImage"
                class="input-upload-image"
                type="file"
                name="images"
                ref="imageUpload"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <aside class="ass1-aside ass1-aside__edit-post">
            <div>
              <button @click="handleUploadPost" class="ass1-btn">
                Đăng bài
              </button>
            </div>
            <div class="ass1-aside__edit-post-head">
              <span style="display: block; width: 100%; margin-bottom: 10px;"
                >Chọn danh mục</span
              >
              <label
                class="ass1-checkbox"
                v-for="item in allCategory"
                :key="item.id"
              >
                <input
                  v-model="categories"
                  :value="item.id"
                  type="checkbox"
                  name="state-post"
                />
                <span></span>
                <p>{{ item.text }}</p>
              </label>
            </div>
            <div class="ass1-aside__get-code">
              <p>Share Link</p>
            </div>
            <div class="ass1-aside__social">
              <a href="" class="ass1-btn-social__facebook ass1-btn-social"
                ><i class="fa fa-facebook" aria-hidden="true"></i
              ></a>
              <a href="" class="ass1-btn-social__twitter ass1-btn-social"
                ><i class="fa fa-twitter" aria-hidden="true"></i
              ></a>
              <a href="" class="ass1-btn-social__google ass1-btn-social"
                ><i class="fa fa-google-plus" aria-hidden="true"></i
              ></a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import { checkImageURL, checkImageFile } from "../helpers";
export default {
  name: "post-upload",
  data() {
    return {
      obj_image: {
        objFile: null,
        base64URL: ""
      },
      url_image: "",
      post_content: "",
      categories: []
    };
  },
  computed: {
    allCategory() {
      return this.$store.state.post.categories;
    },
    renderImage() {
      if (this.url_image) {
        return this.url_image;
      }
      if (this.obj_image && this.obj_image.base64URL) {
        return this.obj_image.base64URL;
      }
      return "/public/assets/no_image_available.jpg";
    }
  },
  methods: {
    ...mapActions(["createNewPost"]),
    uploadImage() {
      this.$refs.imageUpload.click();
    },
    handleUploadImage(e) {
      if (e.target.files && e.target.files.length) {
        let file = e.target.files[0];
        if (!checkImageFile(file)) {
          alert("File tải lên không đúng định dạng");
          return;
        }
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            this.obj_image.base64URL = reader.result;
            this.obj_image.objFile = e.target.files[0];
          },
          false
        );
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    },
    handleUploadPost() {
      let { obj_image, url_image, post_content, categories } = this;
      if (post_content && categories) {
        if (obj_image.objFile || url_image) {
          let data = {
            post_content,
            category: categories
          };
          if (obj_image.objFile) {
            data.obj_image = obj_image.objFile;
          } else {
            data.url_image = url_image;
          }
          this.createNewPost(data).then(resp => {
            if (resp.ok) {
              alert(resp.message);
              this.obj_image.objFile = null;
              this.obj_image.base64URL = "";
              this.url_image = "";
              this.post_content = "";
              this.categories = [];
            } else {
              alert(resp.error);
            }
          });
        } else {
          alert("Vui lòng tải ảnh lên");
        }
      } else {
        alert("Vui lòng điền đầy đủ thông tin");
      }
    }
  }
};
</script>
<style scoped>
.input-upload-image {
  opacity: 0;
  visibility: hidden;
}
</style>
