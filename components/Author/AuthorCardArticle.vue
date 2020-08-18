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

                <div class="d-flex flex-column justify-center align-center align-md-start">
                  <p>{{author.bio}}</p>

                  <div v-if="!!user">
                    <v-btn
                      small
                      color="purple"
                      elevation="0"
                      :ripple="false"
                      class="white--text"
                    >Follow</v-btn>
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
                    <v-btn
                      small
                      color="purple"
                      class="white--text"
                      :ripple="false"
                      elevation="0"
                    >Create acoount To Follow</v-btn>
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
import { authHydrated } from "@/mixins/authHydrated";
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  mixins: [authHydrated],
};
</script>

<style>
</style>