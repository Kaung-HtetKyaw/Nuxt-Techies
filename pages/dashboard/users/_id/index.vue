<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading</h1>
    <div v-else>
      <h1>{{user.displayName}}</h1>
    </div>
  </div>
</template>

<script>
import { fetchUser } from "@/services/Firebase/userAuth";
import { mapGetters } from "vuex";
export default {
  async fetch() {
    const user = await fetchUser(this.userID);
    this.user = user;
  },
  created() {
    console.log(this.$route);
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapGetters({
      getTopicByID: "topic/getTopicByID",
    }),
    userID() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>