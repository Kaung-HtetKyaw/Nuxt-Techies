<template>
  <div>
    <comment :action="false" :id="cid"></comment>
  </div>
</template>

<script>
import { fetchComment } from "@/services/Firebase/comment";
import { mapGetters } from "vuex";
import Comment from "@/components/Comment/Comment";
export default {
  components: {
    comment: Comment,
  },
  async fetch() {
    let comment = this.getCommentByID(this.cid);
    if (comment) {
      this.comment = comment;
    } else {
      this.comment = await fetchComment(this.cid);
    }
  },
  data() {
    return {
      comment: {},
    };
  },
  computed: {
    cid() {
      return this.$route.params.cid;
    },
    articleID() {
      return this.$route.params.id;
    },
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
  },
};
</script>

<style>
</style>