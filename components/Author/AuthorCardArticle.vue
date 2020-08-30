<template>
  <v-container class="bs-border">
    <v-row dense>
      <v-col cols="12" sm="12">
        <div class="pa-md-8 pa-sm-4">
          <v-container>
            <v-row dense class="d-flex justify-center align-center">
              <v-col cols="12" sm="12" md="2" class="d-flex justify-center">
                <div>
                  <v-avatar size="60">
                    <img :src="author.photo.url" :alt="author.displayName" />
                  </v-avatar>
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="10">
                <p
                  class="text-center text-md-left text-sm-subtitle-1 text-md-h5 font-weight-medium purple--text"
                >{{author.displayName}}</p>

                <div
                  class="d-flex flex-column justify-center align-center align-md-start font-italic"
                >
                  <p>{{author.bio}}</p>

                  <div v-if="!!user">
                    <follow-btn :object="author" v-if="user.uid!==author.uid">
                      <template v-slot="{follow,isFollowed,loading}">
                        <v-btn
                          small
                          color="purple"
                          elevation="0"
                          :ripple="false"
                          @click="follow"
                          :loading="loading"
                          class="white--text"
                        >{{isFollowed?'Following':'Follow'}}</v-btn>
                      </template>
                    </follow-btn>

                    <span v-for="key in Object.keys(author.profile_url)" :key="key">
                      <v-btn
                        :ripple="false"
                        v-if="!!author.profile_url[key]"
                        icon
                        :href="author.profile_url[key]"
                        target="_blank"
                      >
                        <v-icon class="px-1">mdi-{{key}}</v-icon>
                      </v-btn>
                    </span>
                  </div>

                  <div v-else>
                    <sign-in type="follow"></sign-in>
                  </div>
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
import { authHydrated } from "@/mixins/Hydrated";
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
  },
  mixins: [authHydrated],
};
</script>

<style>
</style>