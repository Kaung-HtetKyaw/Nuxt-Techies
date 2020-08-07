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
      article: {},
      loading: false,
    };
  },
  async created() {
    if (this.params.id && this.collection === "article") {
      this.loading = true;
      await this.$store
        .dispatch(`${this.collection}/fetch${capitalize(this.collection)}`, {
          id: this.params.id,
        })
        .then((article) => {
          this.article = article;
          this.$emit("articleReady", this.article);
          this.loading = false;
        });
    }
  },
  methods: {
    async writeFB() {
      this.loading = true;
      const collection_name = `${this.collection}s`;
      const action_name = `${this.type}${capitalize(this.collection)}`;
      await this.$store
        .dispatch(`${this.collection}/${action_name}`, this.params)
        .then((res) => {
          this.loading = false;
        });
    },
  },
  render() {
    return this.$scopedSlots.default({
      writeFB: this.writeFB,
      article: this.article,
      loading: this.loading,
    });
  },
};
</script>
