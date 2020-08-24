<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading.....</h1>
    <div v-else>
      <div v-if="articles.length===0">
        <v-container class="white bs-border pa-4">
          <v-row dense>
            <v-col cols="12" sm="12" md="4" class="d-flex justify-center align-center">
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
                <p>You haven't save anything yet.</p>
                <p>
                  Tap
                  <v-icon>mdi-bookmark-outline</v-icon>icon on posts to save
                  them for later.
                </p>
              </div>
              <div class="my-4 d-flex justify-sm-center justify-md-start">
                <router-link :to="{ name: 'postsfeed' }" class="router-link">
                  <v-btn small elevation="0" color="info">Posts worth saving</v-btn>
                </router-link>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="0" md="9" class="pa-4">
              <div>
                <h1>Reading Lists ({{articles.length}})</h1>
              </div>
              <article-card v-for="article in articles" :key="article.id" :article="article"></article-card>
            </v-col>
            <v-col cols="12" sm="0" md="3" class="pa-4"></v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/Article/ArticleCardBlockBrief";
import TagGroup from "@/components/UI/TagGroup";
import { fetchArticlesByID } from "@/services/Firebase/article";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  components: {
    "article-card": ArticleCard,
    "tag-group": TagGroup,
  },
  async fetch() {
    const articles = await fetchArticlesByID(this.user.saved);
    console.log(articles);
    this.articles = articles;
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style>
</style>