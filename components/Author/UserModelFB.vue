<script>
import { fetchUsersByID } from "@/services/Firebase/userAuth";
export default {
  props: {
    id: {
      type: [String, Array],
      required: true,
    },
  },
  data() {
    return {
      data: null,
      loading: false,
    };
  },
  async fetch() {
    this.loading = true;
    const ids = Array.isArray(this.id) ? this.id : [this.id];
    let users = [];
    return fetchUsersByID(ids)
      .then((response) => {
        users = response.map((res) => res.data());
        this.data = Array.isArray(this.id) ? users : users[0];
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  render() {
    return this.$scopedSlots.default({
      data: this.data,
      loading: this.loading,
    });
  },
};
</script>

<style>
</style>