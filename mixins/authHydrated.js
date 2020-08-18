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

  mounted() {
    this.isHydrated = true;
  }
};
