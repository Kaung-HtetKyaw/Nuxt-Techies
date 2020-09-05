<script>
import { capitalize } from "@/utils/utils";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  props: {
    collection: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: function (value) {
        return ["update", "create", "delete"].indexOf(value) !== -1;
      },
    },
    params: {
      type: Object,
      required: true,
    },
  },
  mixins: [authHydrated],
  data() {
    return {
      data: {},
      loading: false,
    };
  },
  async created() {
    console.log(this.type);
    if (this.params.id && this.params.fetch) {
      this.loading = true;
      await this.$store
        .dispatch(`${this.collection}/fetch${capitalize(this.collection)}`, {
          id: this.params.id,
        })
        .then((data) => {
          this.data = data;
          this.$emit("dataReady", this.data);
          this.loading = false;
        });
    }
  },
  methods: {
    writeFB() {
      if (!!this.user) {
        this.loading = true;
        const collection_name = `${this.collection}s`;
        const action_name = `${this.type}${capitalize(this.collection)}`;
        return this.$store
          .dispatch(`${this.collection}/${action_name}`, this.params)
          .then((res) => {
            this.loading = false;
            return res;
          })
          .catch((e) => console.log(e));
      }
    },
  },
  render() {
    return this.$scopedSlots.default({
      writeFB: this.writeFB,
      data: this.data,
      loading: this.loading,
    });
  },
};
</script>
