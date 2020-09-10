<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading.....</h1>
    <h1 v-else>{{article.title}}</h1>
  </div>
</template>

<script>
export default {
  middleware: ["auth", "driver"],
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
};
</script>

<style>
</style>