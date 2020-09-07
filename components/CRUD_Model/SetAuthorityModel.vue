<script>
import { updateUser } from "@/services/Firebase/userAuth";
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
      return updateUser(user)
        .then(() => {
          this.loading = false;
          this.changedType = this.type;
        })
        .catch((e) => console.log(e));
    },
  },
  computed: {
    claim() {
      let claim;
      switch (this.type) {
        case "driver":
          claim = { d: true, type: "driver" };
          break;
        case "admin":
          claim = { a: true, type: "admin" };
          break;
        default:
          claim = { c: true, type: "customer" };
          break;
      }
      return claim;
    },
  },

  render() {
    return this.$scopedSlots.default({
      loading: this.loading,
      setUserAsAuthority: this.setUserAsAuthority,
      changedType: this.changedType,
    });
  },
};
</script>

<style>
</style>