<template>
  <div>
    <h1>This is admin article page</h1>
    <article-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{articles,lazyLoadArticles,loading,empty}">
        <div>
          <h1 v-if="loading">#Loading.....</h1>
          <div v-else>
            <h1 v-for="article in articles" :key="article.id">{{article.title}}</h1>
            <v-btn @click="lazyLoadArticles">Load More</v-btn>
            <h1 v-if="empty">#Empty</h1>
          </div>
        </div>
      </template>
    </article-list>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
export default {
  layout: "dashboard",
  components: {
    "article-list": ArticleListModel,
  },
};
</script>

<style>
</style>