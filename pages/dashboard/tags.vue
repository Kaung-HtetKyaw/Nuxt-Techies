<template>
  <div>
    <h1>This is admin tag page</h1>
    <h1 v-for="tag in tags" :key="tag.id">{{tag.name}}</h1>
    <v-btn nuxt :to="{name:'t-new'}">Create a tag</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: ["auth", "admin"],
  computed: {
    ...mapState({
      tags: (state) => state.tag.tags,
    }),
  },
};
</script>

<style>
</style>