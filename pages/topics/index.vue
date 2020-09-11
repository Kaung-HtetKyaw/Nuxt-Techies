<template>
  <div>
    <div v-if="$fetchState.pending" class="full-width white">
      <content-placeholders v-for="n in 3" :key="n" :rounded="true">
        <content-placeholders-img />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
    </div>

    <div v-else>
      <h1 class="text-center text-md-left">Topics</h1>
      <v-btn color="purple" dark small fixed bottom right fab nuxt :to="{name:'topics-new'}">
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
      <v-container class="px-0">
        <v-row dense>
          <v-col cols="12" sm="12" md="4" v-for="topic in topics" :key="topic.id">
            <topic-card :topic="topic"></topic-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import TopicCard from "@/components/Topics/TopicCard";
export default {
  components: {
    "topic-card": TopicCard,
  },
  async fetch() {
    const topics = await this.$store.dispatch("topic/fetchAllTopics");
    this.topics = topics;
  },
  data() {
    return {
      topics: [],
    };
  },
};
</script>

<style>
</style>