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
  </div>
</template>

<script>
import { authHydrated } from "@/mixins/authHydrated";
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