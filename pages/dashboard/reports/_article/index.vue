<template>
  <div>
    <div v-if="$fetchState.pending">
      <content-placeholders :rounded="true" class="white">
        <content-placeholders-img />
        <content-placeholders-text :lines="3" />
        <content-placeholders-text :lines="3" />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
    </div>
    <div v-else>
      <article-preview :article="article"></article-preview>
      <v-container>
        <v-row dense justify="center" class="pa-4">
          <delete-article type="delete" collection="article" :params="{id:articleID}">
            <template v-slot="{writeFB,loading}">
              <v-btn
                depressed
                :loading="loading"
                :ripple="false"
                color="red"
                class="white--text mx-2 my-2"
                @click="deleteArticle(writeFB)"
              >Delete Article</v-btn>
            </template>
          </delete-article>

          <v-btn
            depressed
            :ripple="false"
            color="indigo lighten-2"
            class="white--text mx-2 my-2"
            @click="cancel"
          >Cancel</v-btn>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ArticlePreview from "@/components/Article/ArticlePreview";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { deleteFile } from "@/services/Firebase/file";

export default {
  middleware: ["auth", "driver"],
  components: {
    "article-preview": ArticlePreview,
    "delete-article": WriteModelFB,
  },
  data() {
    return {
      article: {},
    };
  },
  async fetch() {
    this.article = await this.$store.dispatch("article/fetchArticle", {
      id: this.articleID,
    });
  },
  computed: {
    articleID() {
      return this.$route.params.article;
    },
  },
  methods: {
    async deleteArticle(writeFB) {
      const vm = this;

      return writeFB().then(() => {
        //delete file if only url exists
        if (!vm.article.photo.url) {
          vm.$router.replace({ name: "dashboard-reports" });
        } else {
          return deleteFile({
            folder: "articles",
            id: vm.article.photo.id,
          }).then(() => {
            vm.$router.replace({ name: "dashboard-reports" });
          });
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>