<script>
import { mapState } from "vuex";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  props: {
    lazy: { type: Boolean },
    params: {
      type: Object,
      required: true,
      validator: function (value) {
        return ["all"].indexOf(value.type) !== -1;
      },
    },
  },
  mixins: [authHydrated],
  async fetch() {
    const tags = await this.$store.dispatch("tag/getTags", {
      params: this.params,
      lazy: this.lazyLoad,
    });

    //set lazy loading state
    if (tags.length > 0) {
      if (this.lazy) {
        this.lazyLoad = this.lazy;
      }
    } else {
      this.lazyLoad = false;
      this.empty = true;
    }
    //emit ready custom event to parent
    this.$emit("dataReady", this.storedTags);
  },
  data() {
    return {
      lazyLoad: false,
      empty: false,
    };
  },

  methods: {
    lazyLoadTags(isVisible) {
      if (isVisible && !this.$fetchState.pending && !this.empty) {
        this.$fetch();
      }
    },
  },
  watch: {
    params: function () {
      this.empty = false;
      this.lazyLoad = false;
      this.$fetch();
    },
  },
  computed: {
    ...mapState({
      storedTags: (state) => state.tag.tags,
    }),
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$fetchState.pending,
      tags: this.storedTags,
      lazyLoadTags: this.lazyLoadTags,
      empty: this.empty,
    });
  },
};
</script>
