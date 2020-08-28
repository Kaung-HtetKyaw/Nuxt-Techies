<template>
  <h1>Create a new Topic</h1>
</template>

<script>
import { defaultTopicObjFB } from "@/utils/constants";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  data() {
    return {
      topic: defaultTopicObjFB(),
    };
  },
  created() {
    this.topic.about.by = this.user.uid;
    console.log(this.topic);
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style>
</style>