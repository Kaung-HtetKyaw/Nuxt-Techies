<template>
  <div>
    <h1>This is a user page</h1>
    <div v-if="$fetchState.pending">
      <h1>#Loading.....</h1>
    </div>
    <div v-else>
      <h1>This is {{username}} page</h1>
      <h1>{{username}} currently has {{articles.length}} articles</h1>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const articles = await this.$store.dispatch("article/getArticles", {
      params: { username: this.username },
    });
    this.articles = this.articles.concat(articles);
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
};
</script>

<style>
</style>