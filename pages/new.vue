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
          <autocomplete-tag v-model="article.tags"></autocomplete-tag>
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
import AutocompleteTag from "@/components/Form/AutocompleteTag";
import { defaultArticleObjFB } from "@/utils/constants";
import { fileUpload } from "@/services/Firebase/file";
import { previewImg } from "@/utils/utils";
import { mapState } from "vuex";
export default {
  components: {
    "write-fb": WriteModelFB,
    "autocomplete-tag": AutocompleteTag,
  },
  middleware: ["auth"],
  data() {
    return {
      file: [],
      article: {
        ...defaultArticleObjFB(),
      },
    };
  },
  //set uid after created
  created() {
    this.article.by = this.by;
  },
  computed: {
    ...mapState({
      by: (state) => state.user.user.uid,
    }),
  },
  watch: {
    "article.tags": function (v1, v2) {
      console.log(v1);
    },
  },
  methods: {
    create(callback) {
      let vm = this;
      this.updating = true;
      //update the image only when user update it
      if (this.file) {
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
        console.log(vm.article);
        callback();
      }
    },
    cancel() {
      this.$router.push({ name: "by", params: { by: this.by } });
    },
    previewImg(file) {
      console.log(file);
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