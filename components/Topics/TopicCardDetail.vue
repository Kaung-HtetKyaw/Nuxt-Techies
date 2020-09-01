<template>
  <div>
    <v-card class="article-card-block bs-border my-2 pa-0" outlined>
      <div>
        <v-sheet
          height="300px"
          :style="{
          backgroundImage: `url(${
            topic.cover.url
             
          })`
        }"
          class="center-background-img"
        ></v-sheet>

        <v-card-text>
          <v-container>
            <v-row dense class="pa-0">
              <v-col cols="12" sm="12">
                <h3
                  class="mb-2 text-h6 text-md-h4 font-weight-medium text-center text-md-left"
                >{{ topic.name }}</h3>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col
                cols="12"
                sm="12"
                md="6"
                class="d-flex justify-center justify-md-start align-center mb-2"
              >
                <div class="text-subtitle-2 text-subtitle-md-1">
                  <span>{{topic.members.length}} members</span>
                  <span>-</span>
                  <span class="purple--text">See all members</span>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="6"
                class="d-flex justify-center justify-md-end align-center mb-2"
              >
                <follow-btn :topic="topic">
                  <template v-slot="{follow,loading:following,isFollowed}">
                    <v-btn
                      depressed
                      :loading="following"
                      :ripple="false"
                      color="purple"
                      class="white--text"
                      @click="follow"
                    >{{isFollowed?'Following':'Follow'}}</v-btn>
                  </template>
                </follow-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <!-- <v-card-actions v-if="!!user">
          <follow-btn :topic="topic">
            <template v-slot="{follow,loading:following,isFollowed}">
              <v-btn
                depressed
                :loading="following"
                :ripple="false"
                color="grey lighten-2"
                block
                @click="follow"
              >{{isFollowed?'Following':'Follow'}}</v-btn>
            </template>
          </follow-btn>
        </v-card-actions>-->
      </div>
    </v-card>
    <author-card :id="topic.about.by">
      <template v-slot="{data:creator,loading:fetchingCreator}">
        <div>
          <span v-if="fetchingCreator">#Loading.....</span>
          <span v-else>{{creator.displayName}}</span>
        </div>
      </template>
    </author-card>
  </div>
</template>

<script>
import UserModel from "@/components/Author/UserModelFB";
import FollowBtn from "@/components/Button/FollowTopicsModelBtn";
import { authHydrated } from "@/mixins/Hydrated";
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
    "follow-btn": FollowBtn,
  },
  mixins: [authHydrated],
  computed: {
    timeAgo() {
      return timeAgo(this.topic.about.timestamp);
    },
  },
};
</script>

<style>
</style>