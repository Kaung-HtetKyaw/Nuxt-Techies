<template>
  <div>
    <h1>This is tags Page</h1>
    <v-container class="px-0">
      <v-row v-if="$fetchState.pending">
        <v-col cols="12" sm="12" md="4" v-for="i in 12" :key="i">
          <content-placeholders rounded>
            <content-placeholders-img />
            <content-placeholders-text :lines="3" />
          </content-placeholders>
        </v-col>
      </v-row>
      <v-row dense v-else class="d-flex">
        <v-col v-for="tag in tags" :key="tag.id" cols="12" sm="12" md="4" class="text-h3">
          <tag-card :tag="tag"></tag-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TagCard from "@/components/UI/TagCard";
import { mapState } from "vuex";
export default {
  components: {
    "tag-card": TagCard,
  },
  async fetch() {
    return this.$store.dispatch("tag/fetchAllTags");
  },
  //clear the previous articles from store
  created() {
    this.$store.dispatch("article/clearArticles");
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