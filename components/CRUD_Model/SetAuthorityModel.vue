<script>
import { typeToClaim } from "@/utils/utils";
export default {
  props: {
    type: {
      type: String,
      default: "customer",
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    const vm = this;
    return {
      loading: false,
      changedType: vm.user.claims.type,
    };
  },
  methods: {
    setUserAsAuthority() {
      let user = { ...this.user };
      let claim = { ...this.claim };
      user.claims = claim;
      this.loading = true;
      return this.$store
        .dispatch("user/changeClaim", { user })
        .then(() => {
          this.loading = false;
          this.$emit("changedClaim", claim);
        })
        .catch((e) => console.log(e));
    },
  },
  computed: {
    claim() {
      return typeToClaim(this.type);
    },
  },

  render() {
    return this.$scopedSlots.default({
      loading: this.loading,
      setUserAsAuthority: this.setUserAsAuthority,
    });
  },
};
</script>

<style>
</style>