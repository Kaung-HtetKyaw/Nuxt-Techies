<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col aria-colspan="12" sm="12">
          <div v-html="md"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      md: "",
    };
  },
  mounted() {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
    this.md = marked(this.content);
    console.log(this.md);
  },
  watch: {
    content(value) {
      this.md = marked(value);
      console.log("changed md", this.md);
    },
  },
};
</script>
<style></style>
