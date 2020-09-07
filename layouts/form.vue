<template>
  <v-app>
    <nav class="nav-border-bottom">
      <plain-nav></plain-nav>
    </nav>
    <v-main class="bg">
      <v-container>
        <transition name="vertical" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PlainNav from "@/components/Nav/PlainNav";
export default {
  scrollToTop: true,
  components: {
    "plain-nav": PlainNav,
  },
};
</script>

