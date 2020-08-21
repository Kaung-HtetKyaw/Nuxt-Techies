<template>
  <div>
    <write-fb collection="article" type="create" :params="{ data: article }">
      <template v-slot="{ writeFB, loading }">
        <div v-if="loading">
          <h1>#Loading.......</h1>
        </div>
        <div v-else>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12" md="9" class="white bs-border">
                <v-card color="white" elevation="0" min-height="400px">
                  <v-tabs v-model="tab" background-color="transparent" color="purple" grow>
                    <v-tab v-for="item in items" :key="item.title">{{ item.title }}</v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item.title">
                      <div>
                        <v-container>
                          <v-row dense>
                            <v-col cols="12" sm="12" class="pa-sm-3 pa-md-6">
                              <component v-bind:is="item.component"></component>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </write-fb>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import AutocompleteTag from "@/components/Form/AutocompleteTag";
import ArticleForm from "@/components/Form/ArticleForm";
import ArticlePreview from "@/components/Article/ArticlePreview";
import { defaultArticleObjFB } from "@/utils/constants";
import { fileUpload } from "@/services/Firebase/file";
import { previewImg, isFile } from "@/utils/utils";
import { mapState } from "vuex";
export default {
  components: {
    "write-fb": WriteModelFB,
    "autocomplete-tag": AutocompleteTag,
    articleForm: ArticleForm,
    articlePreview: ArticlePreview,
  },
  middleware: ["auth"],
  data() {
    return {
      file: {},
      article: {
        ...defaultArticleObjFB(),
      },
      tab: null,
      items: [
        {
          title: "Write",
          component: "articleForm",
        },
        {
          title: "Preview",
          component: "articlePreview",
        },
      ],
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
  methods: {
    create(callback) {
      let vm = this;
      this.updating = true;
      //update the image only when user choose it
      // console.log("vm file", this.file);
      // console.log("file empty", isEmptyObj(this.file));
      if (isFile(this.file)) {
        fileUpload({
          folder: "articles",
          file: this.file,
          id: this.article.photo.id,
          success,
        });
      } else {
        console.log(this.file);
        callback();
      }
      //function invocation context of success will be in the fileUpload function
      function success(url) {
        console.log(url);
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
        console.log("vm file", this.file);
        previewImg(file, callback);
        function callback(preview) {
          vm.article.photo.url = preview;
        }
      }
    },
  },
};
</script>

<style></style>
