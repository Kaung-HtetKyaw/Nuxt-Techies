<template>
  <div>
    <v-form ref="form">
      <div class="d-flex align-center px-2 mb-8">
        <v-btn elevation="0" color="grey lighten-1" class="white--text" :ripple="false">
          <v-file-input
            show-size
            value="any"
            label="Choose a file"
            hide-input
            class="pa-0 ma-0 white--text"
            @change="emitFile"
            v-model="clonedFile"
            :rules="fileRules"
          ></v-file-input>
        </v-btn>
        <span class="text-sm-subtitle-2 text-md-h6 grey--text lighten-1 ml-3">Add a Cover image</span>
      </div>
      <img :src="clonedArticle.photo.url" class="my-2" />
      <div>
        <v-textarea
          label="Solo"
          placeholder="Article title here..."
          solo
          v-model="clonedArticle.title"
          :rules="titleRules"
          @change="emitArticle"
          class="text-h6 text-md-h5 font-weight-medium grey--text darken-2"
        ></v-textarea>
      </div>
      <div>
        <autocomplete-tag v-model="clonedArticle.tags" :article_tags="clonedArticle.tags"></autocomplete-tag>
      </div>
      <div>
        <v-textarea
          label="Solo"
          placeholder="Describe your article in short here..."
          solo
          auto-grow
          class="text-subtitle-1 font-weight-medium grey--text darken-2"
          v-model="clonedArticle.description"
          :rules="descriptionRules"
          @change="emitArticle"
        ></v-textarea>
      </div>
      <div>
        <v-textarea
          label="Solo"
          placeholder="Write your article here..."
          solo
          auto-grow
          class="text-subtitle-1 font-weight-medium grey--text darken-1"
          v-model="clonedArticle.content"
          :rules="textRules"
          @change="emitArticle"
        ></v-textarea>
      </div>
    </v-form>
  </div>
</template>

<script>
import AutoCompleteTag from "@/components/Form/AutocompleteTag";
import { previewImg } from "@/utils/utils";
import { rules } from "@/mixins/validation_rules";
import { mapState } from "vuex";

export default {
  components: {
    "autocomplete-tag": AutoCompleteTag,
  },
  middleware: ["auth"],
  mixins: [rules],
  props: {
    article: {
      type: Object,
      required: true,
    },
    file: {
      //accept any type
      required: true,
      validator: (v) => true,
    },
  },
  data() {
    return {
      clonedFile: {},
      tags: [],
      clonedArticle: {},
    };
  },
  watch: {
    "clonedArticle.tags": {
      deep: true,
      handler: function (v1, v2) {
        this.$emit("articleChanged", this.clonedArticle);
      },
    },
  },
  created() {
    this.clonedArticle = { ...this.article };
    this.clonedFile = this.file;
  },

  methods: {
    emitArticle() {
      this.$emit("articleChanged", this.clonedArticle);
    },
    emitFile(file) {
      this.previewImg(file);
      this.$emit("fileChaged", this.clonedFile);
    },
    previewImg(file) {
      if (file) {
        let vm = this;

        previewImg(file, callback);
        function callback(preview) {
          vm.clonedArticle.photo.url = preview;
        }
      }
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style>
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
  padding: auto 0;
}
</style>
