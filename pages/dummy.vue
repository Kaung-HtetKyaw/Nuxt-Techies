<template>
  <div>
    <v-file-input @change="previewImg" v-model="file" show-size label="File input"></v-file-input>
    <v-btn @click="upload">Upload File</v-btn>
    <div>
      <h1 v-if="loading">#Loading.......</h1>
      <img v-if="preview&&!url" :src="preview" alt />
      <img v-if="url" :src="url" alt />
    </div>
  </div>
</template>

<script>
import { fileUpload } from "@/services/file";
import { previewImg } from "@/utils/utils";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  data() {
    return {
      file: null,
      loading: false,
      url: "",
      preview: "",
      article: {
        title: "",
        timestamp: Date.now(),
      },
    };
  },

  methods: {
    setArticle(article) {
      this.article = article;
    },
    async upload() {
      if (this.file) {
        let vm = this;
        this.loading = true;
        await fileUpload({ file: this.file, progress, success });
        //function invocation context of success will be in the fileUpload function
        function progress(snapshot) {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          vm.value = percentage;
          console.log(percentage);
        }
        function success(url) {
          vm.url = url;
          vm.loading = false;
        }
      }
    },
    shit(articleToUpdate) {
      this.article = articleToUpdate;
      console.log();
    },
    previewImg(file) {
      if (file) {
        let vm = this;
        console.log("file", file);
        previewImg(file, callback);
        function callback(preview) {
          vm.preview = preview;
        }
      }
    },
  },
};
</script>

