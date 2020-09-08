<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="purple"
          class="white--text"
          elevation="0"
          :ripple="false"
          v-bind="attrs"
          v-on="on"
          small
        >Create an account to {{type}}</v-btn>
      </template>
      <v-card class="py-2">
        <v-card-title class="headline text-center my-4 d-flex justify-center">Join MTU Code Lab</v-card-title>

        <v-card-text class="caption text-center">
          Create an account to receive great articles in your inbox, and
          follow authors and topics that you love.
        </v-card-text>

        <v-card-actions class="d-flex flex-column justify-center align-center my-4">
          <sign-in :types="['facebook','google','github']">
            <template v-slot="{facebook,google,github}">
              <div class="d-flex flex-column justify-center align-center">
                <v-btn width="200px" outlined class="mb-6 p-4" @click="google">
                  <v-img class="mx-1" width="15" :src="signInLogo.google"></v-img>
                  <span class="caption ml-2">Sign In with Google</span>
                </v-btn>
                <v-btn width="200px" outlined class="mb-6 p-4" @click="facebook">
                  <v-img class="mx-1" width="15" :src="signInLogo.facebook"></v-img>
                  <span class="caption ml-2">Sign In with Facebook</span>
                </v-btn>
                <v-btn width="200px" outlined class="mb-6 p-4" @click="github">
                  <v-img class="mx-1" width="15" :src="signInLogo.github"></v-img>
                  <span class="caption ml-2">Sign In with Github</span>
                </v-btn>
              </div>
            </template>
          </sign-in>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SignBtnModel from "@/components/Button/SignInBtnModelFB";
import { signInLogo } from "@/utils/constants";
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    "sign-in": SignBtnModel,
  },
  data() {
    return {
      dialog: false,
      signInLogo,
    };
  },
};
</script>