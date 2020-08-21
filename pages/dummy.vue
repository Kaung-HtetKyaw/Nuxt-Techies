<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="9" class="white bs-border">
          <v-card color="white" elevation="0">
            <v-tabs v-model="tab" background-color="transparent" color="purple" grow>
              <v-tab v-for="item in items" :key="item.title">{{ item.title }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.title">
                <div>
                  <v-container>
                    <v-row dense>
                      <v-col cols="12" sm="12" class="pa-sm-3 pa-md-6">
                        <component
                          v-bind:is="item.component"
                          :article="article"
                          :file="file"
                          @articleChanged="changeArticle"
                          @fileChaged="changeFile"
                        ></component>
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

<script>
import ArticleForm from "@/components/Form/ArticleForm";
import ArticlePreview from "@/components/Article/ArticlePreview";
import { defaultArticleObjFB } from "@/utils/constants";
export default {
  layout: "form",
  components: {
    articleForm: ArticleForm,
    articlePreview: ArticlePreview,
  },
  data() {
    return {
      tab: null,
      article: { ...defaultArticleObjFB() },
      file: {},
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
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    changeArticle(article) {
      this.article = article;
      console.log("article", this.article);
    },
    changeFile(file) {
      this.file = file;
      console.log("file", this.file);
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