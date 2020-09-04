<template>
  <div>
    <h1>This is dashboard</h1>
    <article-list :lazy="false" :params="{type:'all'}">
      <template v-slot="{articles,loading}">
        <div>
          <h1 v-if="loading">#Loading</h1>
          <div v-else>
            <data-table type="articles" :data="articles"></data-table>
          </div>
        </div>
      </template>
    </article-list>
    <user-list :lazy="false" :params="{type:'all'}">
      <template v-slot="{users,loading}">
        <div>
          <h1 v-if="loading">#Loading</h1>
          <div v-else>
            <data-table type="users" :data="users"></data-table>
          </div>
        </div>
      </template>
    </user-list>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
import UserListModel from "@/components/CRUD_Model/UserListModel";
import DataTable from "@/components/Table/DataTable";
export default {
  middleware: ["auth", "driver"],
  components: {
    "article-list": ArticleListModel,
    "user-list": UserListModel,
    "data-table": DataTable,
  },
};
</script>

<style>
</style>