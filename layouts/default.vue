<template>
  <v-app dark>
    <nav class="nav-border-bottom">
      <default-nav />
    </nav>
    <v-main class="bg">
      <v-container>
        <transition name="vertical" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import DefaultNav from "@/components/Nav/DefaultNav";
import Footer from "@/components/UI/Footer";

export default {
  scrollToTop: true,
  components: {
    DefaultNav,
    Footer,
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
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Test",
          to: "/test",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
<style></style>
