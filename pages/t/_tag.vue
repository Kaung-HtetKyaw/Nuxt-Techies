<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading......</h1>
    <h1 v-else>This is {{this.$route.params.tag}} currently has {{articles.length}} articles</h1>
  </div>
</template>

<script>
export default {
  async fetch() {
    const articles = await this.$store.dispatch("article/getArticles", {
      params: { tag: this.tag },
    });
    this.articles = this.articles.concat(articles);
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    },
  },
};
</script>

<style>
</style>