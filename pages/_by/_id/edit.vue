<template>
  <div>
    <write-fb
      @dataReady="setArticle"
      type="update"
      collection="article"
      :params="{id,data:article,fetch:true}"
    >
      <template v-slot="{loading,writeFB}">
        <div>
          <div v-if="loading">
            <h1>#Loading.....</h1>
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
            <v-btn :loading="updating" @click="update(writeFB)">Update</v-btn>
            <v-btn @click="cancel">Cancel</v-btn>
            <img :src="article.photo.url" alt />
          </div>
        </div>
      </template>
    </write-fb>
  </div>
</template>

<script>
import { fileUpload } from "@/services/Firebase/file";
import { previewImg } from "@/utils/utils";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import AutocompleteTag from "@/components/Form/AutocompleteTag";
export default {
  components: {
    "write-fb": WriteModelFB,
    "autocomplete-tag": AutocompleteTag,
  },
  data() {
    return {
      file: [],
      updating: false,
      article: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
  },
  methods: {
    setArticle(article) {
      this.article = article;
    },
    update(callback) {
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