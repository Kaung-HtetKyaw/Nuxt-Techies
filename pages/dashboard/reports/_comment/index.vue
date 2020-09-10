<template>
  <div>
    <comment :action="true" :id="commentID"></comment>
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
    let comment = this.getCommentByID(this.commentID);
    if (comment) {
      this.comment = comment;
    } else {
      this.comment = await fetchComment(this.commentID);
    }
  },
  data() {
    return {
      comment: {},
    };
  },
  computed: {
    commentID() {
      return this.$route.params.comment;
    },
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
  },
};
</script>

<style>
</style>