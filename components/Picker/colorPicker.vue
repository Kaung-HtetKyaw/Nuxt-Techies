<template>
  <div>
    <v-color-picker v-model="picker" flat></v-color-picker>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "hex",
    },
  },
  data() {
    return {
      picker: null,
    };
  },
  watch: {
    picker: function (v1, v2) {
      this.$emit("colorPick", v1[this.type]);
    },
  },
};
</script>