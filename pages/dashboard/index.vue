<template>
  <div>
    <v-container class="pa-0">
      <v-row dense>
        <v-col cols="12" sm="12" md="4" class="full-height">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Manage Users</v-card-title>
            <v-card-subtitle>You have to be an admin to manage users</v-card-subtitle>
            <v-card-actions>
              <v-btn text nuxt :to="{name:'dashboard-users'}" class="white--text">Manage Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="full-height">
          <v-card color="#1F7087" dark>
            <v-card-title class="headline">Manage Articles</v-card-title>
            <v-card-actions>
              <v-btn text nuxt :to="{name:'dashboard-articles'}" class="white--text">Manage Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="full-height">
          <v-card color="#006064" dark>
            <v-card-title class="headline">Manage Tags</v-card-title>
            <v-card-actions>
              <v-btn text nuxt :to="{name:'dashboard-tags'}" class="white--text">Manage Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="full-height">
          <v-card color="#004D40" dark>
            <v-card-title class="headline">Review Reports</v-card-title>

            <v-card-actions>
              <v-btn text nuxt :to="{name:'dashboard-reports'}" class="white--text">Review Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="full-height">
          <v-card color="#00838F" dark>
            <v-card-title class="headline">Review Comments</v-card-title>
            <v-card-actions>
              <v-btn text nuxt :to="{name:'dashboard-comments'}" class="white--text">Review Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="full-height">
          <v-card color="#00796B" dark>
            <v-card-title class="headline">Manage Topics</v-card-title>

            <v-card-actions>
              <v-btn text nuxt :to="{name:'dashboard-topics'}" class="white--text">Manage Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="my-4 white bs-border">
      <article-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{articles,loading}">
          <div>
            <div>
              <h1 class="text-h5 text-md-h3 pa-4 text-center">Articles</h1>
              <data-table :loading="loading" type="articles" :data="articles"></data-table>

              <div class="d-flex justify-center align-center pa-4">
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

    <div class="my-4 white bs-border">
      <user-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{users,loading}">
          <div>
            <div>
              <h1 class="text-h5 text-md-h3 pa-4 text-center">Users</h1>
              <data-table :loading="loading" type="users" :data="users"></data-table>
              <div class="d-flex justify-center align-center pa-4">
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
    <div class="my-4 white bs-border">
      <comment-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{comments,loading}">
          <div>
            <div>
              <h1 class="text-h5 text-md-h3 pa-4 text-center">Comments</h1>
              <data-table :loading="loading" type="comments" :data="comments"></data-table>
              <div class="d-flex justify-center align-center pa-4">
                <v-btn
                  nuxt
                  color="purple"
                  class="white--text"
                  depressed
                  :to="{name:'dashboard-comments'}"
                >See all Comments</v-btn>
              </div>
            </div>
          </div>
        </template>
      </comment-list>
    </div>
    <div class="my-4 white bs-border">
      <report-list :lazy="false" :params="{type:'all'}">
        <template v-slot="{reports,loading}">
          <div>
            <div>
              <h1 class="text-h5 text-md-h3 pa-4 text-center">Reports</h1>
              <data-table :loading="loading" type="reports" :data="reports"></data-table>
              <div class="d-flex justify-center align-center pa-4">
                <v-btn
                  nuxt
                  color="purple"
                  class="white--text"
                  depressed
                  :to="{name:'dashboard-reports'}"
                >See all Reports</v-btn>
              </div>
            </div>
          </div>
        </template>
      </report-list>
    </div>
    <div class="my-4 white bs-border">
      <div>
        <h1 class="text-h5 text-md-h3 pa-4 text-center">Tags</h1>
        <data-table type="tags" :data="tags"></data-table>
        <div class="d-flex justify-center align-center pa-4">
          <v-btn
            nuxt
            color="purple"
            class="white--text"
            depressed
            :to="{name:'dashboard-tags'}"
          >See all Tags</v-btn>
        </div>
      </div>
    </div>
    <div class="my-4 white bs-border">
      <div>
        <h1 class="text-h5 text-md-h3 pa-4 text-center">Topics</h1>
        <data-table type="topics" :data="topics"></data-table>
        <div class="d-flex justify-center align-center pa-4">
          <v-btn
            nuxt
            color="purple"
            class="white--text"
            depressed
            :to="{name:'dashboard-topics'}"
          >See all Topics</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
import UserListModel from "@/components/CRUD_Model/UserListModel";
import CommentListModel from "@/components/CRUD_Model/CommentListModel";
import ReportListModel from "@/components/CRUD_Model/ReportListModel";
import TagListModel from "@/components/CRUD_Model/TagListModel";
import DataTable from "@/components/Table/DataTable";
import { mapState } from "vuex";
export default {
  middleware: ["auth", "driver"],
  components: {
    "article-list": ArticleListModel,
    "user-list": UserListModel,
    "comment-list": CommentListModel,
    "report-list": ReportListModel,
    "tag-list": TagListModel,
    "data-table": DataTable,
  },
  computed: {
    ...mapState({
      tags: (state) => state.tag.tags.slice(0, 10),
      topics: (state) => state.topic.topics.slice(0, 10),
    }),
  },
};
</script>

<style>
</style>