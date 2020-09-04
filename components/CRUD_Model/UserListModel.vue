<script>
import { mapState } from "vuex";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  props: {
    lazy: { type: Boolean },
    params: {
      type: Object,
      required: true,
      validator: function (value) {
        return ["all", "popular", "topic"].indexOf(value.type) !== -1;
      },
    },
  },
  mixins: [authHydrated],
  async fetch() {
    const users = await this.$store.dispatch("user/getUsers", {
      params: this.params,
      lazy: this.lazyLoad,
    });

    //set lazy loading state
    if (users.length > 0) {
      if (this.lazy) {
        this.lazyLoad = this.lazy;
      }
    } else {
      this.lazyLoad = false;
      this.empty = true;
    }
    //emit ready custom event to parent
    this.$emit("dataReady", this.storedUsers);
  },
  data() {
    return {
      lazyLoad: false,
      empty: false,
    };
  },

  methods: {
    lazyLoadUsers(isVisible) {
      if (isVisible && !this.$fetchState.pending && !this.empty) {
        this.$fetch();
      }
    },
  },
  watch: {
    params: function () {
      this.empty = false;
      this.lazyLoad = false;
      this.$fetch();
    },
  },
  computed: {
    ...mapState({
      storedUsers: (state) => state.user.users,
    }),
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$fetchState.pending,
      users: this.storedUsers,
      lazyLoadUsers: this.lazyLoadUsers,
      empty: this.empty,
    });
  },
};
</script>
