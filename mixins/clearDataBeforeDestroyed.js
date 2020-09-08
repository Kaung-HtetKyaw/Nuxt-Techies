export const clearArticles = {
  beforeDestroy() {
    this.$store.dispatch("article/clearArticles");
  }
};
