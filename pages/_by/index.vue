<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12">
          <author-profile :id="by">
            <template v-slot="{data:author,loading:loadingAuthor}">
              <div>
                <h1 v-if="loadingAuthor">#Loading.....</h1>
                <profile-card v-else :author="author" />
              </div>
            </template>
          </author-profile>
        </v-col>
      </v-row>
      <v-row dense class="my-6">
        <v-col cols="12" sm="12" md="2"></v-col>
        <v-col cols="12" md="8" sm="12" class="pt-0">
          <article-list :lazy="true" :params="{type:'user',param:by}">
            <template v-slot="{ articles, lazyLoadArticles, loading }">
              <v-container class="px-0 pt-0">
                <v-col cols="12" sm="12" class="pt-0">
                  <v-container class="px-0 pt-0">
                    <v-row dense v-if="articles.length>0">
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
                    <v-row dense v-if="articles.length===0">
                      <v-container class="white bs-border pa-4">
                        <v-row dense>
                          <v-col
                            cols="12"
                            sm="12"
                            md="4"
                            class="d-flex justify-center align-center"
                          >
                            <v-img
                              max-width="150"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0LTsIqEjovrNZIj70z7b4kRbM5pO-8dxoyg&usqp=CAU"
                            ></v-img>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="8"
                            class="d-flex flex-column justify-center align-center align-md-start"
                          >
                            <div class="opacity7 subtitle-1">
                              <p>You haven't published any article anything yet.</p>
                            </div>
                            <div class="my-4 d-flex justify-sm-center justify-md-start">
                              <router-link :to="{ name: 'new' }" class="router-link">
                                <v-btn small elevation="0" color="info">Publish an article now</v-btn>
                              </router-link>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
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
    "author-profile": UserModelFB,
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
