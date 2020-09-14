<template>
  <div>
    <v-color-picker v-model="picker" flat></v-color-picker>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
      required: false,
    },
  },
  created() {
    if (this.color) {
      this.picker = { ...this.color };
    }
  },
  data() {
    return {
      picker: null,
    };
  },
  watch: {
    picker: function (v1, v2) {
      this.$emit("colorPick", v1);
    },
  },
};
</script>