<template>
  <div>
    <v-app-bar color="white" elevation="0" fixed app class="nav-border-bottom pr-md-12 pl-sm-6">
      <nuxt-link to="/" class="px-6">
        <v-toolbar-title v-text="title" />
      </nuxt-link>

      <v-spacer></v-spacer>
      <v-btn small elevation="0" :ripple="false" to="/">Close</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "MCL",
    };
  },
};
</script>
