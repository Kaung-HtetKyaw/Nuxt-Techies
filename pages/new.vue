<template>
  <div>
    <write-fb collection="article" type="create" :params="{data:article}">
      <template v-slot="{writeFB,loading}">
        <div v-if="loading">
          <h1>#Loading.......</h1>
        </div>
        <div v-else>
          <v-text-field v-model="article.title" label="Title"></v-text-field>
          <v-textarea v-model="article.description" label="Description"></v-textarea>
          <v-file-input
            @change="previewImg"
            v-model="file"
            show-size
            value="any"
            label="File input"
          ></v-file-input>
          <v-btn :loading="loading" @click="create(writeFB)">Create Article</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
          <div>
            <img :src="article.photo.url" alt />
          </div>
        </div>
      </template>
    </write-fb>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { fileUpload, deleteFile } from "@/services/file";
import { previewImg, uniqueId } from "@/utils/utils";
import { defaultArticleObjFB } from "@/utils/constants";
import { mapState } from "vuex";

export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware: ["auth"],
  created() {
    this.article.by = this.by;
  },
  data() {
    return {
      file: [],
      uploading: false,
      article: defaultArticleObjFB(),
    };
  },
  computed: {
    ...mapState({
      by: (state) => state.user.user.uid,
    }),
  },
  methods: {
    async create(callback) {
      if (this.file && !this.uploading) {
        let vm = this;
        this.uploading = true;
        await fileUpload({
          folder: "articles",
          file: this.file,
          id: this.article.photo.id,
          success,
        });
        //function invocation context of success will be in the fileUpload function
        function success(url) {
          vm.article.photo.url = url;
          vm.uploading = false;
          callback();
        }
      }
    },
    async cancel() {
      this.$router.replace("/");
    },
    previewImg(file) {
      if (file) {
        let vm = this;
        previewImg(file, callback);
        function callback(preview) {
          vm.article.photo.url = preview;
        }
      }
    },
  },
};
</script>

<style>
</style>