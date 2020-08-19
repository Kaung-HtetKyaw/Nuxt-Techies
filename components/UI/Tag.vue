<template>
  <nuxt-link :to="{ name: 't-tag', params: { tag: tag } }">
    <span
      :style="{
                backgroundColor: `${tagObject.bg_color}`,
                color: `${tagObject.text_color}`
              }"
      class="hover-blue rounded px-2 py-1 font-weight-medium"
    >{{ tagObject.name }}</span>
  </nuxt-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    tagObject() {
      return this.getTagByID(this.tag);
    },
  },
};
</script>

<style>
</style>