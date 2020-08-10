<script>
import { isLiked, capitalize } from "@/utils/utils";
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
    }
  },
  methods: {
    async like() {
      let moduleName, actionName;
      moduleName = this.type;
      if (!isLiked(this.data.likes, this.by)) {
        actionName = `like${capitalize(this.type)}`;
        await this.$store.dispatch(`${moduleName}/${actionName}`, {
          id: this.data.id,
          by: this.by
        });
      } else {
        actionName = `unlike${capitalize(this.type)}`;
        await this.$store.dispatch(`${moduleName}/${actionName}`, {
          id: this.data.id,
          by: this.by
        });
      }
    }
  },
  computed: {
    isLiked() {
      return isLiked(this.data.likes, this.by);
    },
    ...mapState({
      by: state => state.user.user.uid
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
