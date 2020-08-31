<template>
  <div>
    <div v-if="!$fetchState.pending">
      <h1>{{topic.name}}</h1>
      <v-btn nuxt :to="{name:'topics-id-new',params:{id:topicID}}">Create an article</v-btn>
      <v-btn nuxt :to="{name:'topics-id-edit',params:{id:topicID}}">Edit a topic</v-btn>
      <div>
        <h1>Articles</h1>
        <div v-for="article in articles" :key="article.id">
          <h1>{{article.title}}</h1>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>#Loading</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { fetchArticlesByID } from "@/services/Firebase/article";
export default {
  async fetch() {
    if (!this.topic) {
      return this.$store.dispatch("topic/fetchAllTopics").then(() => {
        return fetchArticlesByID(this.topic.kids).then((articles) => {
          this.articles = articles;
        });
      });
    } else {
      return fetchArticlesByID(this.topic.kids).then((articles) => {
        this.articles = articles;
      });
    }
  },
  data() {
    return {
      articles: [],
    };
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