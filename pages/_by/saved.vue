<template>
  <div>
    <h1>This is saved page</h1>
    <h1 v-if="$fetchState.pending">#Loading.....</h1>
    <div v-else>
      <h1 v-for="article in articles" :key="article.id">{{article.title}}</h1>
    </div>
  </div>
</template>

<script>
import { fetchArticlesByID } from "@/services/Firebase/article";
import { mapState } from "vuex";
export default {
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