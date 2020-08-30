<script>
import { includes } from "@/utils/utils";
import { mapState } from "vuex";
export default {
  props: {
    object: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    follow() {
      if (
        this.isAuthenticated &&
        !this.loading &&
        this.object.uid !== this.user.uid
      ) {
        this.loading = true;
        if (!this.isFollowed) {
          console.log("isFollowed", this.isFollowed);
          return this.$store
            .dispatch("user/followUser", {
              object: this.object,
            })
            .then(() => {
              this.loading = false;
            });
        } else {
          console.log("isFollowed", this.isFollowed);
          return this.$store
            .dispatch("user/unfollowUser", {
              object: this.object,
            })
            .then(() => {
              this.loading = false;
            });
        }
      }
    },
  },
  computed: {
    isFollowed() {
      return (
        includes(this.object.followers, this.user.uid) &&
        includes(this.user.following, this.object.uid)
      );
    },
    ...mapState({
      isAuthenticated: (state) => state.user.isAuthenticated,
      user: (state) => state.user.user,
    }),
  },
  render() {
    return this.$scopedSlots.default({
      follow: this.follow,
      isFollowed: this.isFollowed,
      loading: this.loading,
    });
  },
};
</script>
