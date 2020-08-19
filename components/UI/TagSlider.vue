<template>
  <v-slide-group multiple mobile>
    <v-slide-item active-class="primary--text" v-slot:default="{  }" v-for="tag in tags" :key="tag">
      <template>
        <div>
          <base-tag class="pr-2 py-1" :tag="tag"></base-tag>
        </div>
      </template>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import Tag from "@/components/UI/Tag";
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  components: {
    "base-tag": Tag,
  },
};
</script>

<style>
</style>