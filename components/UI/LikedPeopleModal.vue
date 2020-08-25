<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed :ripple="false" text @click="dialog = !dialog">
          <slot></slot>
        </v-btn>
      </template>
      <v-card class="rounded">
        <v-card-title class="pa-2 text-center">
          <h5 class="text-body-2 font-weight-medium">People who reacted to this post</h5>
        </v-card-title>
        <v-divider></v-divider>
        <div v-if="$fetchState.pending">
          <v-progress-circular indeterminate color="purple"></v-progress-circular>
        </div>
        <div v-else>
          <v-card-text style="height: 300px;">
            <v-list subheader>
              <div v-for="person in people" :key="person.uid">
                <nuxt-link :to="{name:'by',params:{by:person.uid}}">
                  <v-list-item class="px-0">
                    <v-list-item-avatar>
                      <v-img :src="person.photo.url" :alt="person.displayName"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="person.displayName"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon color="red">mdi-heart</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </nuxt-link>

                <v-divider></v-divider>
              </div>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fetchUsersByID } from "@/services/Firebase/userAuth";
export default {
  props: {
    peopleID: {
      type: Array,
      required: true,
    },
  },
  async fetch() {
    const people = await fetchUsersByID(this.peopleID);
    this.people = people;
  },
  data() {
    return {
      dialog: false,
      people: [],
    };
  },
};
</script>
