<template>
  <div>
    <h1>This is dashboard</h1>
    <article-list :lazy="false" :params="{type:'all'}">
      <template v-slot="{articles,loading}">
        <div>
          <h1 v-if="loading">#Loading</h1>
          <div v-else>
            <h1 v-for="article in articles" :key="article.id">{{article.title}}</h1>
          </div>
        </div>
      </template>
    </article-list>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
export default {
  middleware: ["auth", "driver"],
  components: {
    "article-list": ArticleListModel,
  },
};
</script>

<style>
</style>