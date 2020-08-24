<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed :ripple="false" text @click="dialog=!dialog">
          <slot></slot>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <div v-for="person in people" :key="person.uid">{{person.displayName}}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
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
    console.log(people);
    this.people = people;
  },
  data() {
    return {
      dialogm1: "",
      dialog: false,
      people: [],
    };
  },
};
</script>