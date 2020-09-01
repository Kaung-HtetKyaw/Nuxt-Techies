<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="10" offset-md="1">
          <div v-if="!$fetchState.pending">
            <h1>{{topic.name}}</h1>
            <v-btn nuxt :to="{name:'topics-id-new',params:{id:topicID}}">Create an article</v-btn>
            <v-btn nuxt :to="{name:'topics-id-edit',params:{id:topicID}}">Edit a topic</v-btn>
            <v-btn nuxt :to="{name:'topics-id-delete',params:{id:topicID}}">Delete a topic</v-btn>
            <div>
              <h1>Articles</h1>
              <article-list :lazy="true" :params="{type:'topic',param:topicID}">
                <template v-slot="{articles, lazyLoadArticles, loading,empty}">
                  <div>
                    <div v-for="article in articles" :key="article.id">
                      <nuxt-link :to="{name:'by-id',params:{by:article.by,id:article.id}}">
                        <h1>{{article.title}}</h1>
                      </nuxt-link>
                    </div>
                    <div>
                      <h1 v-if="loading">#LOADING......</h1>
                    </div>
                    <div v-if="empty">
                      <h1>Empty</h1>
                    </div>
                    <v-btn @click="lazyLoadArticles">Load More</v-btn>
                  </div>
                </template>
              </article-list>
            </div>
          </div>
          <div v-else>
            <h1>#Loading</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
import { mapState, mapGetters } from "vuex";
import { fetchArticlesByID } from "@/services/Firebase/article";
export default {
  components: {
    "article-list": ArticleListModel,
  },
  async fetch() {
    if (!this.topic) {
      return this.$store.dispatch("topic/fetchAllTopics");
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getTopicByID: "topic/getTopicByID",
    }),
    topic() {
      return this.getTopicByID(this.topicID);
    },
    topicID() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>