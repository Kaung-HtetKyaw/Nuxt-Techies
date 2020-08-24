<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <v-list>
        <user-avatar-drawer v-if="!!user" :user="user"></user-avatar-drawer>
        <navigation-drawer></navigation-drawer>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" elevation="0" fixed app class="nav-border-bottom pr-md-12 pl-sm-6">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="px-6">
        <v-toolbar-title v-text="title" />
      </nuxt-link>

      <v-spacer></v-spacer>
      <transition name="fade" mode="out-in">
        <span v-if="user" class="d-flex align-center">
          <v-btn
            color="purple"
            class="white--text d-none d-md-flex mr-2"
            small
            elevation="0"
            :ripple="false"
            :to="{name:'new'}"
          >Write an article</v-btn>
          <v-btn nuxt elevation="0" :ripple="false" icon>
            <user-avatar :user="user" />
          </v-btn>
        </span>
      </transition>
    </v-app-bar>
  </div>
</template>

<script>
import { authHydrated } from "@/mixins/Hydrated";
import UserAvatarMenu from "@/components/UI/UserAvatarMenu";
import UserAvatarDrawer from "@/components/UI/UserAvatarDrawer";
import NavigationDrawer from "@/components/UI/NavigationDrawer";
export default {
  mixins: [authHydrated],
  components: {
    "user-avatar": UserAvatarMenu,
    "user-avatar-drawer": UserAvatarDrawer,
    "navigation-drawer": NavigationDrawer,
  },
  data() {
    const vm = this;
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "MTU Code Lab",
    };
  },
};
</script>

<style></style>
