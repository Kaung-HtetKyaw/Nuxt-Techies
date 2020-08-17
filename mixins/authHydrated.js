import { mapState } from "vuex";
export const authHydrated = {
  data() {
    return {
      isHydrated: false
    };
  },
  computed: {
    ...mapState({
      userAuth: state => state.user.user
    }),
    user() {
      return this.isHydrated ? this.userAuth : null;
    }
  },
  watch: {
    user: function(v1, v2) {
      console.log("new", v1);
      console.log("old", v2);
    }
  },
  mounted() {
    this.isHydrated = true;
  }
};
