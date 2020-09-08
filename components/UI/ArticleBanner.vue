<template>
  <div>
    <div class="py-2 text-body-2 font-weight-medium">
      From
      <span class="purple--text">{{topic.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { topicsHydrated } from "@/mixins/Hydrated";
import { defaultTopicObjFB } from "@/utils/constants";
export default {
  props: {
    topicID: {
      type: String,
      required: true,
    },
  },
  mixins: [topicsHydrated],
  computed: {
    ...mapGetters({
      getTopicByID: "topic/getTopicByID",
    }),
    topic() {
      if (this.topics.length) {
        return this.getTopicByID(this.topicID);
      }
      return defaultTopicObjFB();
    },
  },
};
</script>

<style>
</style>