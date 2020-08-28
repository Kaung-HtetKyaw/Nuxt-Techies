<template>
  <div>
    <h1>All topics</h1>
    <h1 v-if="$fetchState.pending">#Loading.......</h1>
    <div v-else>
      <div v-for="topic in topics" :key="topic.id">
        <nuxt-link :to="{name:'topics-id',params:{id:topic.id}}">
          <h1>{{topic.name}}</h1>
        </nuxt-link>
      </div>
    </div>
    <div>
      <v-btn nuxt :to="{name:'topics-new'}">Create a topic</v-btn>
    </div>
  </div>
</template>

<script>
export default {
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