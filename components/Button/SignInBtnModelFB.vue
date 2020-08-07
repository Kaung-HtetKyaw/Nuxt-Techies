<script>
import { signInFB, signOutFB } from "@/services/userAuth";
export default {
  props: {
    types: {
      type: [Array, String],
      required: false,
      validator: (value) => {
        const reservedType = ["facebook", "github", "google"];
        const types = Array.isArray(value) ? value : [value];
        types.forEach((type) => {
          if (!reservedType.includes(type)) {
            return false;
          }
        });
        return true;
      },
    },
  },

  computed: {
    normalizedTypes() {
      return Array.isArray(this.types) ? this.types : [this.types];
    },
  },
  methods: {},
  render() {
    if (this.types) {
      return this.$scopedSlots.default({
        ...signInFB(this.normalizedTypes),
        signout: signOutFB,
      });
    }
    return this.$scopedSlots.default({
      signout: signOutFB,
    });
  },
};
</script>