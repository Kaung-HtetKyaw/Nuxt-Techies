<template>
  <div class="white bs-border">
    <h1 class="text-h5 text-md-h3 pa-4 text-center">Review User</h1>
    <div v-if="$fetchState.pending">
      <content-placeholders :rounded="true" class="white">
        <content-placeholders-img />
        <content-placeholders-text :lines="3" />
        <content-placeholders-text :lines="3" />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
    </div>
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
  layout: "dashboard",
  components: {
    "user-info": UserInfo,
    "user-links": UserSocialLinks,
  },
  async fetch() {
    const user = await fetchUser(this.userID);
    this.user = user;
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