<template>
  <div>
    <h1>This is dashboard</h1>
    <article-list :lazy="false" :params="{type:'all'}">
      <template v-slot="{articles,loading}">
        <div>
          <h1 v-if="loading">#Loading</h1>
          <div v-else>
            <data-table type="articles" :data="articles"></data-table>
            <h1 v-for="article in articles" :key="article.id">{{article.title}}</h1>
          </div>
        </div>
      </template>
    </article-list>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
import DataTable from "@/components/Table/DataTable";
export default {
  middleware: ["auth", "driver"],
  components: {
    "article-list": ArticleListModel,
    "data-table": DataTable,
  },
};
</script>

<style>
</style>