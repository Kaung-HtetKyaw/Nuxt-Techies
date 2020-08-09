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
          <shitty @tagSelect="setTag"></shitty>
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
import shitty from "@/components/Form/shitty";
import { defaultArticleObjFB } from "@/utils/constants";
export default {
  components: {
    "write-fb": WriteModelFB,
    shitty,
  },
  data() {
    return {
      article: defaultArticleObjFB(),
    };
  },
  methods: {
    create(callback) {
      let vm = this;
      this.updating = true;
      //update the image only when user update it
      if (this.file.length > 0) {
        fileUpload({
          folder: "articles",
          file: this.file,
          id: this.article.photo.id,
          success,
        });
      } else {
        callback();
      }

      //function invocation context of success will be in the fileUpload function
      function success(url) {
        vm.article.photo.url = url;
        vm.updating = false;
        callback();
      }
    },
    cancel() {
      this.$router.push({ name: "by", params: { by: this.by } });
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