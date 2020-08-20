<template>
  <div class="text-center" v-if="!!user">
    <v-menu open-on-hover top offset-y close-on-click>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
          <v-avatar size="40">
            <img :src="user.photo.url" :alt="user.displayName" />
          </v-avatar>
        </v-btn>
      </template>

      <v-card width="200px">
        <v-list>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title>
                <v-btn
                  color="white"
                  class="black--text text-body-2 text-capitalize"
                  link
                  block
                  elevation="0"
                  :ripple="false"
                  nuxt
                  :to="{name:'by',params:{by:user.uid}}"
                >{{user.displayName}}</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="item in items" :key="item.title" class="pa-0">
            <v-list-item-content>
              <v-list-item-title>
                <v-btn
                  color="white"
                  class="black--text text-body-2 text-capitalize"
                  link
                  block
                  elevation="0"
                  :ripple="false"
                  nuxt
                  :to="item.to"
                >{{item.title}}</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title>
                <v-btn
                  color="white"
                  class="black--text text-body-2 text-capitalize"
                  link
                  block
                  elevation="0"
                  :ripple="false"
                  @click="signOut"
                >Sign Out</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { signOutFB } from "@/services/Firebase/userAuth";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    const vm = this;
    console.log(this);
    return {
      items: [
        { title: "Write an article", to: { name: "new" } },
        {
          title: "Reading List",
          to: { name: "by", params: { by: vm.user.uid } },
        },
        {
          title: "Settings",
          to: { name: "by", params: { by: vm.user.uid } },
        },
      ],
    };
  },
  methods: {
    signOut() {
      return signOutFB().then(() => this.$router.push("/"));
    },
  },
};
</script>