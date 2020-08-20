<template>
  <div>
    <v-form ref="form" v-model="valid">
      <div class="d-flex align-center">
        <v-btn elevation="0" color="grey lighten-1" class="white--text" :ripple="false">
          <v-file-input
            show-size
            value="any"
            label="Choose a file"
            v-model="file"
            hide-input
            class="pa-0 ma-0 white--text"
            @click="onFilePick"
          ></v-file-input>
        </v-btn>
        <span class="text-h6 grey--text lighten-1 ml-3">Add a Cover image</span>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: {},
      valid: true,
    };
  },
  methods: {
    onFilePick() {
      console.log(this.$refs);
    },
  },
  watch: {
    file: function (v1, v2) {
      console.log("new ", v1);
      console.log("old ", v2);
    },
  },
};
</script>

<style>
</style>