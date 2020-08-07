<template>
  <v-slide-group multiple mobile>
    <v-slide-item
      active-class="primary--text"
      v-slot:default="{ active, toggle }"
      v-for="tag in tags"
      :key="tag"
    >
      <v-chip class="ma-2" outlined :input-value="active" @click="toggle">#{{ tag }}</v-chip>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: [""],
    },
  },
};
</script>

<style>
</style>