export const clearArticles = {
  created() {
    this.$store.dispatch("article/clearArticles");
  }
};
