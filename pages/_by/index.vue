<template>
  <div>
    <h1>This is {{ user.displayName }} 's page</h1>

    <v-btn nuxt :to="{ name: 'by-settings', params: { by } }">Update Settings</v-btn>
    <v-col cols="12" md="7" sm="12" class="pt-0">
      <v-container class="px-0 pt-0">
        <v-row dense>
          <article-list :lazy="true" :params="{type:'user',param:by}">
            <template v-slot="{ articles, lazyLoadArticles, loading, empty }">
              <v-container class="px-0 pt-0">
                <v-col cols="12" sm="12" class="pt-0">
                  <v-container class="px-0 pt-0">
                    <v-row dense>
                      <v-col
                        v-for="(article, i) in articles"
                        v-observe-visibility="
                              i === articles.length - 1
                                ? lazyLoadArticles
                                : false
                            "
                        :key="article.id"
                        cols="12"
                        sm="12"
                        class="pt-0"
                      >
                        <article-card :article="article" />
                      </v-col>
                    </v-row>
                    <v-row dense v-if="loading">
                      <v-col cols="12" sm="12" v-for="i in 10" :key="i">
                        <content-placeholders rounded>
                          <content-placeholders-img />
                          <content-placeholders-text :lines="3" />
                        </content-placeholders>
                      </v-col>
                    </v-row>
                    <v-row dense v-if="empty">
                      <h1>#Empty.....</h1>
                    </v-row>
                  </v-container>
                </v-col>
              </v-container>
            </template>
          </article-list>
        </v-row>
      </v-container>
    </v-col>
  </div>
</template>

<script>
import ArticleListModelFB from "@/components/Article/ArticleListModel";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import AuthorCard from "@/components/Author/AuthorCardArticle";
import ArticleCard from "@/components/Article/ArticleCardBlockHorizontal";

import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  components: {
    "article-list": ArticleListModelFB,
    "like-btn": LikeBtnFB,
    "author-card": AuthorCard,
    "article-card": ArticleCard,
  },
  created() {
    this.$store.dispatch("article/clearArticles");
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    by() {
      return this.$route.params.by;
    },
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style></style>
