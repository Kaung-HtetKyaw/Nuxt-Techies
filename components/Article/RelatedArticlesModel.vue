<script>
import { excludeItems, randomItems } from "@/utils/utils";
import { mapState } from "vuex";
import { fetchTags } from "@/services/Firebase/article";
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    articleToExclude: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    const articles = await fetchTags(this.tags);
    this.relatedArticles = randomItems(
      excludeItems(articles, this.articleToExclude),
      2
    );
  },
  data() {
    return {
      relatedArticles: [],
    };
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.$fetchState.pending,
      relatedArticles: this.relatedArticles,
    });
  },
};
</script>
