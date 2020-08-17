<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col aria-colspan="12" sm="12">
          <div v-html="processedMarkdown"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/tomorrow-night.css";
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    processedMarkdown() {
      return marked(this.content, {
        highlight(md) {
          return highlight.highlightAuto(md).value;
        }
      });
    }
  },
  methods: {
    update: function() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    }
  }
};
</script>
<style scoped></style>
