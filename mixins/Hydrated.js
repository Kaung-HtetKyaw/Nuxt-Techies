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

export const tagsHydrated = {
  data() {
    return {
      isHydrated: false
    };
  },
  computed: {
    ...mapState({
      storedTags: state => state.tag.tags
    }),
    tags() {
      return this.isHydrated ? this.storedTags : [];
    }
  },

  mounted() {
    this.isHydrated = true;
  }
};
