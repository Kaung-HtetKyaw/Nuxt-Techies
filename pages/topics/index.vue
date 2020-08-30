<template>
  <div>
    <h1 class="text-center text-md-left">Topics</h1>
    <h1 v-if="$fetchState.pending">#Loading.......</h1>
    <div v-else>
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