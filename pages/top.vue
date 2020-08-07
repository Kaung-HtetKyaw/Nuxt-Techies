<template>
  <v-container fluid class="px-0">
    <v-row dense>
      <v-col cols="12" md="3" sm="0" class="green d-none d-md-flex">
        <h1>Profile</h1>
      </v-col>
      <v-col cols="12" md="6" sm="12" class="pt-0">
        <v-container class="px-0 pt-0">
          <v-row dense>
            <v-col
              v-for="(article,i) in articles"
              v-observe-visibility="i===articles.length-1?lazyLoadArticles:false"
              :key="article.id"
              cols="12"
              sm="12"
              class="pt-0"
            >
              <article-card-block-horizontal :article="article" />
            </v-col>
          </v-row>
          <v-row dense v-if="$fetchState.pending">
            <v-col cols="12" sm="12" v-for="i in 10" :key="i">
              <content-placeholders rounded>
                <content-placeholders-img />
                <content-placeholders-text :lines="3" />
              </content-placeholders>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" sm="0" md="3" class="red d-none d-md-flex">
        <h1>Posts</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleCardBlockHorizontal from "@/components/Article/ArticleCardBlockHorizontal";
import { mapState } from "vuex";
export default {
  middleware: ["log"],
  components: {
    ArticleCardBlockHorizontal,
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch();
    }
  },
  async fetch() {
    await this.$store
      .dispatch("article/getArticles", {
        lazy: this.lazy,
        params: { page: this.currentPage },
      })
      .then(() => {
        this.lazy = true;
      });
  },
  data() {
    return {
      currentPage: 1,

      lazy: false,
    };
  },
  methods: {
    async lazyLoadArticles(isVisible) {
      if (isVisible && !this.$fetchState.pending) {
        this.currentPage++;
        await this.$fetch();
      }
    },
  },
  computed: {
    ...mapState({
      articles: (state) => state.article.articles,
    }),
  },
  head: {
    title: "Nuxt Blog | Top",
    meta: [
      {
        hid: "some unique id",
        name: "Top",
        content: "Popular Articles on Nuxt Blog",
      },
    ],
  },
};
</script>

<style>
</style>