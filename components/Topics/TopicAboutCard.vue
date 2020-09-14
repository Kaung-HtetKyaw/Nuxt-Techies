<template>
  <div>
    <v-card outlined class="article-card-block bs-border my-2">
      <v-card-text>
        <h3 class="text-center text-h6 text-md-h5 font-weight-medium my-4">About</h3>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{topic.members.length}} members</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-newspaper-variant-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{topic.kids.length}} articles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account-hard-hat</v-icon>
          </v-list-item-action>
          <author-card :id="topic.about.by">
            <template v-slot="{data:creator,loading:fetchingCreator}">
              <v-list-item-content>
                <v-list-item-title v-if="fetchingCreator">Loading...</v-list-item-title>
                <v-list-item-title v-else>
                  <nuxt-link :to="{name:'by',params:{by:creator.uid}}">
                    <span class="black--text">Created by</span>

                    <span class="purple--text">{{creator.displayName}}</span>
                  </nuxt-link>
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </author-card>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-clock-time-eight-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Created {{timeAgo}} ago</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserModel from "@/components/Author/UserModelFB";
import { timeAgo } from "@/utils/utils";
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  components: {
    "author-card": UserModel,
  },
  computed: {
    timeAgo() {
      return timeAgo(this.topic.about.timestamp);
    },
  },
};
</script>

<style>
</style>