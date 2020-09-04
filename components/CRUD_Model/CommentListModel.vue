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
        return ["all", "user"].indexOf(value.type) !== -1;
      },
    },
  },
  mixins: [authHydrated],
  async fetch() {
    const comments = await this.$store.dispatch("comment/getComments", {
      params: this.params,
      lazy: this.lazyLoad,
    });

    //set lazy loading state
    if (comments.length > 0) {
      if (this.lazy) {
        this.lazyLoad = this.lazy;
      }
    } else {
      this.lazyLoad = false;
      this.empty = true;
    }
    //emit ready custom event to parent
    this.$emit("dataReady", this.storedComments);
  },
  data() {
    return {
      lazyLoad: false,
      empty: false,
    };
  },

  methods: {
    lazyLoadComments(isVisible) {
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
      storedComments: (state) => state.comment.comments,
    }),
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$fetchState.pending,
      comments: this.storedComments,
      lazyLoadComments: this.lazyLoadComments,
      empty: this.empty,
    });
  },
};
</script>
