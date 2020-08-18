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
      renderer: new marked.Renderer(),
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    this.md = marked(this.content);
  },
};
</script>
<style></style>
