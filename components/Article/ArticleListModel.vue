<script>
import { mapState } from "vuex";
export default {
  props: {
    lazy: { type: Boolean },
    params: {
      type: Object,
      required: true,
      validator: function (value) {
        return ["all", "user", "tag", "popular"].indexOf(value.type) !== -1;
      },
    },
  },

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
  },
  data() {
    return {
      lazyLoad: false,
      empty: false,
      loading: false,
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
      articles: (state) => state.article.articles,
    }),
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
