<template>
  <v-card class="article-card-block bs-border my-2" outlined>
    <div>
      <nuxt-link :to="{
        name: 'topics-id',
        params: { id: topic.id }
      }">
        <v-sheet
          height="200px"
          :style="{
          backgroundImage: `url(${
            topic.cover.url
             
          })`
        }"
          class="center-background-img"
        ></v-sheet>
      </nuxt-link>
      <v-card-text>
        <nuxt-link
          :to="{
            name: 'topics-id',
            params: { id: topic.id }
          }"
        >
          <h3 class="mb-2 text-h6">{{ topic.name }}</h3>
          <p>{{topic.members.length}} members</p>
          <p>Created {{timeAgo}} ago</p>
        </nuxt-link>
      </v-card-text>
      <v-card-actions v-if="!!user">
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
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
import FollowTopicsModelBtn from "@/components/Button/FollowTopicsModelBtn";
import { mapGetters } from "vuex";
import { fetchUser } from "@/services/Firebase/userAuth";
import { isEmptyObj, timeAgo } from "@/utils/utils";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  mixins: [authHydrated],
  components: {
    "follow-btn": FollowTopicsModelBtn,
  },
  data() {
    return {};
  },
  computed: {
    timeAgo() {
      return timeAgo(this.topic.about.timestamp);
    },
  },
};
</script>
