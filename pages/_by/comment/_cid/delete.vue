<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading....</h1>
    <div v-else>
      <markdown-container :content="comment.message"></markdown-container>
      <delete-comment type="delete" collection="comment" :params="{id:comment_id}">
        <template v-slot="{writeFB,loading:deleting}">
          <v-btn :loading="deleting" @click="deleteComment(writeFB)">Delete</v-btn>
        </template>
      </delete-comment>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Markdown from "@/components/UI/MarkDown";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  middleware: ["auth"],
  components: {
    "markdown-container": Markdown,
    "delete-comment": WriteModelFB,
  },
  async fetch() {
    const comment = this.getCommentByID(this.comment_id);
    this.comment = comment;
  },
  data() {
    return {
      comment: null,
    };
  },
  methods: {
    deleteComment(writeFB) {
      return writeFB().then(() => {
        //redirect to the article
        this.$router.replace({
          name: "by-id",
          params: { by: this.by, id: this.post_id },
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
    ...mapState({
      article: (state) => state.article.article,
    }),
    comment_id() {
      return this.$route.params.cid;
    },
    post_id() {
      return this.article.id;
    },
    by() {
      return this.article.by;
    },
  },
};
</script>

<style>
</style>