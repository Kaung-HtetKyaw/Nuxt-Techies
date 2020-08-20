<template>
  <div>
    <transition-group name="list" tag="div">
      <v-list-item v-for="(item) in items" :key="item.title" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </transition-group>

    <sign-in :types="['facebook','github','google']">
      <template v-slot="{facebook,github,google,signout}">
        <div>
          <div v-if="!!user">
            <v-list-item @click="signout">
              <v-list-item-action>
                <v-icon>mdi-account-arrow-right</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item @click="facebook">
              <v-list-item-action>
                <v-icon>mdi-facebook</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sign In With Facebook</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="google">
              <v-list-item-action>
                <v-icon>mdi-google</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sign In With Google</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="github">
              <v-list-item-action>
                <v-icon>mdi-github</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sign In With Github</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </template>
    </sign-in>
  </div>
</template>

<script>
import { authHydrated } from "@/mixins/authHydrated";
import SignInBtnFB from "@/components/Button/SignInBtnModelFB";

const defaultItem = [
  {
    icon: "mdi-chart-bubble",
    title: "Tags",
    to: "/t",
    auth: false,
  },
];
export default {
  mixins: [authHydrated],
  components: {
    "sign-out": SignInBtnFB,
    "sign-in": SignInBtnFB,
  },
  computed: {
    items() {
      const vm = this;

      return !!vm.user
        ? [
            {
              icon: "mdi-format-list-bulleted",
              title: "Reading List",
              to: { name: "by", params: { by: vm.user.uid } },
            },
            {
              icon: "mdi-chart-bubble",
              title: "Create new Article",
              to: "/new",
              auth: true,
            },
            {
              icon: "mdi-chart-bubble",
              title: "Tags",
              to: "/t",
              auth: false,
            },
          ]
        : defaultItem;
    },
  },
};
</script>

<style>
</style>