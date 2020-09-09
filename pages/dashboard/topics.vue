<template>
  <div>
    <h1>This is admin topic page</h1>
    <h1 v-for="topic in topics" :key="topic.id">{{topic.name}}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: ["auth", "admin"],
  layout: "dashboard",
  computed: {
    ...mapState({
      topics: (state) => state.topic.topics,
    }),
  },
};
</script>

<style>
</style>