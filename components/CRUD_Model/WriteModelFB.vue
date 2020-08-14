<script>
import { capitalize } from "@/utils/utils";
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
  data() {
    return {
      data: {},
      loading: false,
    };
  },
  async created() {
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
      this.loading = true;
      const collection_name = `${this.collection}s`;
      const action_name = `${this.type}${capitalize(this.collection)}`;
      console.log("params in renderless", this.params);
      return this.$store
        .dispatch(`${this.collection}/${action_name}`, this.params)
        .then((res) => {
          this.loading = false;
          console.log("result", res);
          //redirect to the corresponding page
          if (
            (this.collection !== "comment" && this.type === "create") ||
            this.type === "update"
          ) {
            const to_method = `to${capitalize(this.collection)}`;
            this[to_method](res);
          }
        })
        .catch((e) => console.log(e));
    },
    toArticle(res) {
      this.$router.push({
        name: "by-id",
        params: { by: res.by, id: res.id },
      });
    },
    toTag(res) {
      this.$router.push({
        name: "t-tag",
        params: { tag: res.id },
      });
    },
    toUser(res) {
      this.$router.push({
        name: "by",
        params: { by: res.uid },
      });
    },
    toTopics(res) {
      this.$router.push("/");
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
