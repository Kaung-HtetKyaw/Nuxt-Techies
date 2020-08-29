<template>
  <div>
    <h1>{{topic.name}}</h1>
    <v-btn nuxt :to="{name:'topics-id-new',params:{id:topicID}}">Create an article</v-btn>
    <v-btn nuxt :to="{name:'topics-id-edit',params:{id:topicID}}">Edit a topic</v-btn>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
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