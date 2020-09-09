<template>
  <v-app dark>
    <nav class="nav-border-bottom">
      <default-nav />
    </nav>
    <v-main class="bg">
      <v-container>
        <!-- <div class="white bs-border pa-2 d-flex justify-start align-center my-1">
          <div>
            <span class="font-italic">{{breadCrumb}}</span>
          </div>
        </div>-->

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
import { breadCrumb } from "@/mixins/util";
export default {
  scrollToTop: true,
  components: {
    DefaultNav,
    Footer,
  },
  mixins: [breadCrumb],
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
