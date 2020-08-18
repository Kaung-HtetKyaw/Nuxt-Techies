<template>
  <div class="bs-border pa-md-8 pa-sm-4">
    <h1>{{author.displayName}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>