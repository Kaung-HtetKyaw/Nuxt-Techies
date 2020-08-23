<script>
import { isSaved, capitalize } from "@/utils/utils";
import { authHydrated } from "@/mixins/Hydrated";
import { mapState } from "vuex";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  methods: {
    save() {
      if (this.isAuthenticated) {
        if (!this.isSaved) {
          return this.$store.dispatch("user/saveArticle", {
            id: this.id,
          });
        } else {
          return this.$store.dispatch("user/unsaveArticle", {
            id: this.id,
          });
        }
      }
    },
  },
  computed: {
    isSaved() {
      return isSaved(this.user.saved, this.id);
    },
    ...mapState({
      isAuthenticated: (state) => state.user.isAuthenticated,
      user: (state) => state.user.user,
    }),
  },
  render() {
    return this.$scopedSlots.default({
      save: this.save,
      isSaved: this.isSaved,
    });
  },
};
</script>
