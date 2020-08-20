<template>
  <v-app>
    <nav class="nav-border-bottom">
      <plain-nav></plain-nav>
    </nav>
    <v-main class="bg white">
      <v-container>
        <transition name="vertical" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import PlainNav from "@/components/Nav/PlainNav";
export default {
  components: {
    "plain-nav": PlainNav,
  },
};
</script>

