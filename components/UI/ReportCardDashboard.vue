<template>
  <div class="white bs-border">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="5">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Report ID</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{report.id}}</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">By</span>
              </v-col>
              <v-col cols="12" sm="8">
                <nuxt-link :to="{name:'by',params:{by:report.by}}">
                  <span class="text-body-2 opacity-7">{{report.by}}</span>
                </nuxt-link>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Reported Item</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{report.reported_item.id}}</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Reported type</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{report.reported_item.type}}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row dense justify="center" class="pa-4">
        <v-btn
          depressed
          color="indigo lighten-2"
          nuxt
          :to="reviewLink"
          class="white--text my-2 mx-1"
        >Review</v-btn>
        <v-btn depressed color="red" class="white--text my-2 mx-1">Delete Account</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { timeAgo } from "@/utils/utils";
export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  computed: {
    timeAgo() {
      return timeAgo(this.report.timestamp);
    },
    reviewLink() {
      const type = this.report.reported_item.type;
      const name = `dashboard-reports-${type}`;
      let params = {};
      params[type] = this.report.reported_item.id;
      return { name, params };
    },
  },
};
</script>

<style>
</style>