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
    const reports = await this.$store.dispatch("report/getReports", {
      params: this.params,
      lazy: this.lazyLoad,
    });

    //set lazy loading state
    if (reports.length > 0) {
      if (this.lazy) {
        this.lazyLoad = this.lazy;
      }
    } else {
      this.lazyLoad = false;
      this.empty = true;
    }
    //emit ready custom event to parent
    this.$emit("dataReady", this.storedReports);
  },
  data() {
    return {
      lazyLoad: false,
      empty: false,
    };
  },

  methods: {
    lazyLoadReports(isVisible) {
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
      storedReports: (state) => state.report.reports,
    }),
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$fetchState.pending,
      reports: this.storedReports,
      lazyLoadReports: this.lazyLoadReports,
      empty: this.empty,
    });
  },
};
</script>
