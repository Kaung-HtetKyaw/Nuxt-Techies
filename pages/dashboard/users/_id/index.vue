<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading</h1>
    <div v-else>
      <user-info :user="user"></user-info>
      <user-links :user="user" class="my-4"></user-links>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/Author/UserInfoDashboard";
import UserSocialLinks from "@/components/Author/UserSocialLinksDashboard";
import { fetchUser } from "@/services/Firebase/userAuth";
import { mapGetters } from "vuex";
export default {
  components: {
    "user-info": UserInfo,
    "user-links": UserSocialLinks,
  },
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