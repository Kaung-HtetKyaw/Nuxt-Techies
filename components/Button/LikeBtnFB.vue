<script>
import { isLiked, capitalize } from "@/utils/utils";
import { authHydrated } from "@/mixins/authHydrated";
import { mapState } from "vuex";
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return ["article", "comment"].indexOf(value) !== -1;
      }
    },

    data: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    async like() {
      if (this.isAuthenticated) {
        let moduleName, actionName;
        moduleName = this.type;
        if (!isLiked(this.data.likes, this.user.uid)) {
          actionName = `like${capitalize(this.type)}`;
          await this.$store.dispatch(`${moduleName}/${actionName}`, {
            id: this.data.id,
            by: this.user.uid
          });
        } else {
          actionName = `unlike${capitalize(this.type)}`;
          await this.$store.dispatch(`${moduleName}/${actionName}`, {
            id: this.data.id,
            by: this.user.uid
          });
        }
      }
    }
  },
  computed: {
    isLiked() {
      return isLiked(this.data.likes, this.user.uid);
    },
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated
    })
  },
  render() {
    return this.$scopedSlots.default({
      like: this.like,
      isLiked: this.isLiked
    });
  }
};
</script>
