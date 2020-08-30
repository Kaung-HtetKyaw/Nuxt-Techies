<script>
import { includes } from "@/utils/utils";
import { mapState } from "vuex";
export default {
  props: {
    topic: {
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
      if (this.isAuthenticated && !this.loading) {
        this.loading = true;
        if (!this.isFollowed) {
          return this.$store
            .dispatch("user/followTopic", {
              topic: this.topic,
            })
            .then(() => {
              this.loading = false;
            });
        } else {
          return this.$store
            .dispatch("user/unfollowTopic", {
              topic: this.topic,
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
        includes(this.topic.members, this.user.uid) &&
        includes(this.user.topics, this.topic.id)
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
