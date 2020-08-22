<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12">
          <profile-card :author="user" :by="by" />
        </v-col>
      </v-row>
      <v-row dense class="my-6">
        <v-col cols="12" sm="12" md="2"></v-col>
        <v-col cols="12" md="8" sm="12" class="pt-0">
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
        </v-col>
        <v-col cols="12" sm="12" md="2"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleListModelFB from "@/components/Article/ArticleListModel";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import ProfileCard from "@/components/Author/ProfileCard";
import ArticleCard from "@/components/Article/ArticleCardBlockBrief";
import UserModelFB from "@/components/Author/UserModelFB";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  components: {
    "article-list": ArticleListModelFB,
    "like-btn": LikeBtnFB,
    "profile-card": ProfileCard,
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
