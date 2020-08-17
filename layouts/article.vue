<template>
  <v-app>
    <nav class="nav-border-bottom">
      <default-nav />
    </nav>
    <v-main class="bg white ">
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
import DefaultNav from "@/components/Nav/DefaultNav";

export default {
  components: {
    DefaultNav
  },
  data() {
    return {
      clipped: false,

      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Test",
          to: "/test"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  }
};
</script>
<style scoped></style>
