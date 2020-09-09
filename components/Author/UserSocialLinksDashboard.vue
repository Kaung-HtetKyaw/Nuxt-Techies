<template>
  <div class="white bs-border">
    <v-container>
      <v-row dense v-for="url in socialLinks" :key="url">
        <v-col cols="12" sm="4">
          <span class="font-weight-bold">{{capitalize(url)}}</span>
        </v-col>
        <v-col cols="12" sm="8">
          <span class="text-body-2 opacity-7">{{user.profile_url[url]?user.profile_url[url]:'-'}}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { capitalize } from "@/utils/utils";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    capitalize(url) {
      return capitalize(url);
    },
  },
  computed: {
    socialLinks() {
      const keys = Object.keys(this.user.profile_url);
      return keys;
    },
  },
};
</script>

<style>
</style>