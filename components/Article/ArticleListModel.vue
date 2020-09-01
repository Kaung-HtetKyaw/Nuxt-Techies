<script>
import { mapState } from "vuex";
import { authHydrated } from "@/mixins/Hydrated";
import { priortizeFollowingArticles } from "@/utils/sort";
export default {
  props: {
    lazy: { type: Boolean },
    params: {
      type: Object,
      required: true,
      validator: function (value) {
        return (
          ["all", "user", "tag", "popular", "topic"].indexOf(value.type) !== -1
        );
      },
    },
  },
  mixins: [authHydrated],
  async fetch() {
    const articles = await this.$store.dispatch("article/getArticles", {
      params: this.params,
      lazy: this.lazyLoad,
    });

    //set lazy loading state
    if (articles.length > 0) {
      if (this.lazy) {
        this.lazyLoad = this.lazy;
      }
    } else {
      this.lazyLoad = false;
      this.empty = true;
    }
    //emit ready custom event to parent
    this.$emit("dataReady", this.articles);
  },
  data() {
    return {
      lazyLoad: false,
      empty: false,
    };
  },

  methods: {
    lazyLoadArticles(isVisible) {
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
      storedArticles: (state) => state.article.articles,
    }),
    articles() {
      if (this.user) {
        return priortizeFollowingArticles(
          this.storedArticles,
          this.user.following
        );
      }
      return this.storedArticles;
    },
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$fetchState.pending,
      articles: this.articles,
      lazyLoadArticles: this.lazyLoadArticles,
      empty: this.empty,
    });
  },
};
</script>
