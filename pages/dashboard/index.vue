<template>
  <div>
    <h1>This is dashboard</h1>
    <div class="my-4">
      <article-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{articles,loading}">
          <div>
            <h1 v-if="loading">#Loading</h1>
            <div v-else>
              <h1 class="text-center my-2">Articles</h1>
              <data-table type="articles" :data="articles"></data-table>
              <div class="d-flex justify-center align-center my-4">
                <v-btn
                  nuxt
                  color="purple"
                  class="white--text"
                  depressed
                  :to="{name:'dashboard-articles'}"
                >See all articles</v-btn>
              </div>
            </div>
          </div>
        </template>
      </article-list>
    </div>

    <div class="my-4">
      <user-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{users,loading}">
          <div>
            <h1 v-if="loading">#Loading</h1>
            <div v-else>
              <h1 class="text-center my-2">Users</h1>
              <data-table type="users" :data="users"></data-table>
              <div class="d-flex justify-center align-center my-4">
                <v-btn
                  nuxt
                  color="purple"
                  class="white--text"
                  depressed
                  :to="{name:'dashboard-users'}"
                >See all users</v-btn>
              </div>
            </div>
          </div>
        </template>
      </user-list>
    </div>
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