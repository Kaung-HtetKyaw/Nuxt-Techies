
<script>
import { isLiked, capitalize } from "@/utils/utils";
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: function (value) {
        return ["article", "comment"].indexOf(value) !== -1;
      },
    },
    by: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async like() {
      let moduleName, actionName;
      moduleName = this.type;
      if (!isLiked(this.data.likes, by)) {
        actionName = `like${capitalize(this.type)}`;
        await this.$store.dispatch(`${moduleName}/${actionName}`);
      }
    },
  },
  render() {
    return this.$scopedSlots.default({
      like: this.like,
    });
  },
};
</script>
