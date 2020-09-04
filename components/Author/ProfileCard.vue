<template>
  <v-container class="bs-border white pa-0">
    <v-row dense>
      <v-col cols="12" sm="12">
        <div class="pa-md-8 pa-sm-4">
          <v-container>
            <v-row dense class="d-flex justify-center align-center">
              <v-col cols="12" sm="12" md="2" class="d-flex justify-center">
                <div>
                  <v-avatar size="180" class="d-none d-md-flex">
                    <img :src="author.photo.url" :alt="author.displayName" />
                  </v-avatar>
                  <v-avatar size="100" class="d-flex d-md-none">
                    <img :src="author.photo.url" :alt="author.displayName" />
                  </v-avatar>
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="8" class="px-4 px-md-12">
                <p
                  class="text-center text-md-left text-h6 text-md-h3 font-weight-medium my-1"
                >{{author.displayName}}</p>

                <div class="d-flex flex-column justify-center align-center align-md-start">
                  <p class="text-subtitle-1 font-italic my-2">{{author.bio}}</p>

                  <div v-if="!!user">
                    <div
                      class="d-flex flex-column flex-md-row justify-center align-center justify-md-start align-md-center"
                    >
                      <v-btn
                        v-if="user.uid===author.uid"
                        color="grey darken-4 my-2 my-md-1"
                        elevation="0"
                        :ripple="false"
                        large
                        class="white--text text-capitalize my-2"
                        nuxt
                        :to="{ name: 'by-settings', params: { by:author.uid } }"
                      >Edit Profile</v-btn>
                      <follow-btn v-else :object="author">
                        <template v-slot="{follow,isFollowed,loading}">
                          <v-btn
                            small
                            color="purple"
                            elevation="0"
                            :ripple="false"
                            :loading="loading"
                            @click="follow"
                            class="white--text my-2 my-md-1"
                          >{{isFollowed?'Following':'Follow'}}</v-btn>
                        </template>
                      </follow-btn>
                    </div>

                    <div class="my-2 text-center text-md-left">
                      <span v-for="key in Object.keys(author.profile_url)" :key="key">
                        <v-btn
                          :ripple="false"
                          v-if="!!author.profile_url[key]"
                          icon
                          :href="author.profile_url[key]"
                          target="_blank"
                          color="grey darken-4"
                        >
                          <v-icon size="30" class="px-1">mdi-{{key}}</v-icon>
                        </v-btn>
                      </span>
                    </div>
                  </div>

                  <div v-else>
                    <sign-in type="follow"></sign-in>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="2"
                class="text-center text-md-left text-subtitle-2 text-md-subtitle-1"
              >
                <div class="mb-2 opacity-7">
                  <people-list :peopleID="author.followers">
                    <template #header>Followed By</template>
                    <template #button>
                      <span>{{author.followers.length}} Followers</span>
                    </template>
                  </people-list>
                </div>
                <div class="mb-2 opacity-7">
                  <people-list :peopleID="author.following">
                    <template #header>Following</template>
                    <template #button>
                      <span>{{author.following.length}} Followers</span>
                    </template>
                  </people-list>
                </div>
                <div>
                  <p>Joined {{timeAgo}} ago</p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignInModal from "@/components/Button/SignInModal";
import FollowBtn from "@/components/Button/FollowUserModelBtn";
import PeopleListModal from "@/components/UI/PeopleListModal";
import { authHydrated } from "@/mixins/Hydrated";
import { timeAgo } from "@/utils/utils";
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  components: {
    "sign-in": SignInModal,
    "follow-btn": FollowBtn,
    "people-list": PeopleListModal,
  },
  mixins: [authHydrated],
  computed: {
    timeAgo() {
      return timeAgo(user.joined_at);
    },
  },
};
</script>

<style>
</style>