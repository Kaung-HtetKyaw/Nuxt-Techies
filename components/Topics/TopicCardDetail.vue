<template>
  <div>
    <v-card class="article-card-block bs-border my-2 pa-0" outlined>
      <div>
        <v-sheet
          height="300px"
          :style="{
          backgroundImage: `url(${
            topic.cover.url?topic.cover.url:defaultTopicCover
             
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
                md="4"
                class="d-flex justify-center justify-md-start align-center mb-2"
              >
                <div class="text-subtitle-2 text-subtitle-md-1">
                  <span>{{topic.members.length}} members</span>
                  <span>-</span>
                  <members :peopleID="topic.members" class="d-inline-block">
                    <template #header>Members</template>
                    <template #button>
                      <span class="purple--text text-capitalize">See all members</span>
                    </template>
                  </members>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="8"
                class="d-flex justify-center justify-md-end align-center mb-2"
              >
                <div v-if="!!user">
                  <v-container>
                    <v-row dense>
                      <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        class="d-flex justify-center align-center my-1"
                      >
                        <follow-btn :topic="topic">
                          <template v-slot="{follow,loading:following,isFollowed}">
                            <div>
                              <v-btn
                                depressed
                                :loading="following"
                                :ripple="false"
                                color="purple"
                                class="white--text"
                                @click="follow"
                              >{{isFollowed?'Following':'Follow'}}</v-btn>
                            </div>
                          </template>
                        </follow-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        class="d-flex justify-center align-center my-1"
                      >
                        <div>
                          <v-btn
                            nuxt
                            depressed
                            :to="{name:'topics-id-edit',params:{id:topic.id}}"
                            text
                            color="purple"
                          >Update Topic</v-btn>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        class="d-flex justify-center align-center my-1"
                      >
                        <div>
                          <v-btn
                            nuxt
                            :to="{name:'topics-id-delete',params:{id:topic.id}}"
                            depressed
                            text
                            color="red"
                          >Delete Topic</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <div v-else>
                  <sign-in-modal type="follow"></sign-in-modal>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
import FollowBtn from "@/components/Button/FollowTopicsModelBtn";
import SignInModal from "@/components/Button/SignInModal";
import PeopleList from "@/components/UI/PeopleListModal";
import { authHydrated } from "@/mixins/Hydrated";
import { timeAgo } from "@/utils/utils";
import { defaultTopicObjFB, defaultTopicCover } from "@/utils/constants";
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  components: {
    "follow-btn": FollowBtn,
    "sign-in-modal": SignInModal,
    members: PeopleList,
  },
  mixins: [authHydrated],
  data() {
    return {
      defaultTopicCover: defaultTopicCover,
    };
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