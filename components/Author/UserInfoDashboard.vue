<template>
  <div class="white bs-border">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="2" class="d-flex justify-center align-center">
          <div>
            <img :src="user.photo.url" :alt="user.displayName" />
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Username</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{user.displayName}}</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Uid</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{user.uid}}</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Role</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{user.claims.type}}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Folowers</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{user.followers.length}}</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Following</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{user.following.length}}</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">Topics Followed</span>
              </v-col>
              <v-col cols="12" sm="8">
                <span class="text-body-2 opacity-7">{{user.topics.length}}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row dense justify="center" class="pa-4">
        <v-btn depressed color="red" class="white--text">Delete Account</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>