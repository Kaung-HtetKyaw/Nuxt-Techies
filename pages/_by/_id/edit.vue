<template>
  <div>
    <update-article
      collection="article"
      @dataReady="setArticle"
      type="update"
      :params="{data:article,id,fetch:true}"
    >
      <template v-slot="{writeFB}">
        <div>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12" md="9" class="white bs-border">
                <v-card v-if="!isEmptyObj" color="white" elevation="0">
                  <v-tabs v-model="tab" background-color="transparent" color="purple" grow>
                    <v-tab v-for="item in tabItems" :key="item.title">{{ item.title }}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in tabItems" :key="item.title">
                      <div>
                        <v-container>
                          <v-row dense>
                            <v-col cols="12" sm="12" class="pa-sm-3 pa-md-6">
                              <component
                                v-bind:is="item.component"
                                :article="article"
                                :file="file"
                                @articleChanged="listenArticleChange"
                                @fileChaged="listenFileChange"
                              ></component>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
                <v-card v-else color="white" elevation="0" loading="true" height="300px"></v-card>
              </v-col>
              <v-col cols="12" sm="0" md="3"></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="12" md="9">
                <div>
                  <v-btn
                    color="purple"
                    class="white--text"
                    depressed
                    :loading="loading"
                    @click="updateArticle(writeFB)"
                  >Publish</v-btn>
                  <v-btn
                    depressed
                    color="indigo lighten-4"
                    class="white--text"
                    @click="cancelArticle"
                  >Cancel</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </update-article>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import ArticleForm from "@/components/Form/ArticleForm";
import ArticlePreview from "@/components/Article/ArticlePreview";
import { defaultArticleObjFB } from "@/utils/constants";
import { isFile, isEmptyObj } from "@/utils/utils";
import { fileUpload } from "@/services/Firebase/file";
import { mapState } from "vuex";
export default {
  layout: "form",
  components: {
    articleForm: ArticleForm,
    articlePreview: ArticlePreview,
    "update-article": WriteModelFB,
  },
  middleware: ["auth"],
  data() {
    return {
      tab: null,
      article: {},
      file: {},
      loading: false,
      tabItems: [
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
  methods: {
    setArticle(article) {
      this.article = article;
    },
    listenArticleChange(article) {
      this.article = article;
    },
    listenFileChange(file) {
      this.file = file;
    },
    updateArticle(callback) {
      let vm = this;
      vm.loading = true;
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
        return callback().then((res) => {
          vm.loading = false;

          vm.$router.push({
            name: "by-id",
            params: { by: res.by, id: res.id },
          });
        });
      }
      //function invocation context of success will be in the fileUpload function
      function success(url) {
        console.log(url);
        vm.article.photo.url = url;
        vm.loading = false;
        console.log(vm.article);
        return callback().then((res) => {
          vm.$router.push({
            name: "by-id",
            params: { by: res.by, id: res.id },
          });
        });
      }
    },
    cancelArticle() {
      this.$router.push("/");
    },
  },

  computed: {
    ...mapState({
      by: (state) => state.user.user.uid,
    }),
    isEmptyObj() {
      console.log("empty?", isEmptyObj(this.article));
      return isEmptyObj(this.article);
    },
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
  },
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>