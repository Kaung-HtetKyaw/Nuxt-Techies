<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary overlay-opacity="0" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" elevation="0" fixed app class="nav-border-bottom d-none d-md-inline">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn v-if="user" text>{{user.displayName}}</v-btn>
    </v-app-bar>
    <v-app-bar color="white" elevation="0" fixed app class="nav-border-bottom d-flex d-md-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn v-if="user" text>{{user.displayName}}</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { authHydrated } from "@/mixins/authHydrated";
export default {
  mixins: [authHydrated],
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
          title: "Create new Article",
          to: "/new",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Tags",
          to: "/t",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Dummy",
          to: "/dummy",
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
