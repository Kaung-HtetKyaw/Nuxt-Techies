<template>
  <div>
    <comment v-for="id in ids" :key="id" :id="id" />
  </div>
</template>

<script>
import Comment from "@/components/Comment/Comment";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      ids: ["YORuYXB8mL2vCWmVqKg2", "ibtk0F7oxPGib3GHJ6cQ"],
    };
  },
};
</script>

<style></style>
