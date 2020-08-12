<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col aria-colspan="12" sm="12">
          <vue-markdown
            :linkify="true"
            :toc="true"
            :source="content"
            @rendered="update"
          ></vue-markdown>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // theme
import "prismjs/components/prism-go.min"; // language

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  components: {
    VueMarkdown
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
