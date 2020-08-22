<template>
  <v-container class="bs-border white">
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
                    <v-btn
                      v-if="user.uid===by"
                      color="grey darken-4"
                      elevation="0"
                      :ripple="false"
                      large
                      class="white--text text-capitalize my-2"
                      nuxt
                      :to="{ name: 'by-settings', params: { by } }"
                    >Edit Profile</v-btn>
                    <v-btn
                      v-else
                      large
                      color="grey darken-4"
                      elevation="0"
                      :ripple="false"
                      class="white--text text-capitalize my-2"
                    >Follow</v-btn>
                    <div class="my-2">
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
              <v-col cols="12" sm="12" md="2" class="px-6">shit</v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignInModal from "@/components/Button/SignInModal";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
    by: {
      type: String,
      required: true,
    },
  },
  components: {
    "sign-in": SignInModal,
  },
  mixins: [authHydrated],
};
</script>

<style>
</style>