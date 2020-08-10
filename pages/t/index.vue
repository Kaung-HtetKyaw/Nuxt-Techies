<template>
  <div>
    <h1>This is tags Page</h1>
    <v-container>
      <v-row v-if="$fetchState.pending">
        <h1>#Loading.....</h1>
      </v-row>
      <v-row dense v-else>
        <v-col
          v-for="tag in tags"
          :key="tag.id"
          cols="12"
          sm="12"
          class="text-h3"
          :style="{color:`${tag.text_color}`,backgroundColor:`${tag.bg_color}`}"
        >
          <nuxt-link :to="{name:'t-tag',params:{tag:tag.id}}">{{tag.name}}</nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  async fetch() {
    return this.$store.dispatch("tag/fetchAllTags");
  },
  computed: {
    ...mapState({
      tags: (state) => state.tag.tags,
    }),
  },
};
</script>

<style>
</style>