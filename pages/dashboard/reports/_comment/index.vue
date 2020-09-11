<template>
  <div>
    <div>
      <comment :action="false" :id="commentID"></comment>
    </div>
    <v-container>
      <v-row dense justify="center" class="pa-4">
        <delete-comment type="delete" collection="comment" :params="{id:commentID}">
          <template v-slot="{writeFB,loading}">
            <v-btn
              depressed
              :loading="loading"
              :ripple="false"
              color="red"
              class="white--text mx-2 my-2"
              @click="deleteComment(writeFB)"
            >Delete comment</v-btn>
          </template>
        </delete-comment>

        <v-btn
          depressed
          :ripple="false"
          color="indigo lighten-2"
          class="white--text mx-2 my-2"
          @click="cancel"
        >Cancel</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { fetchComment } from "@/services/Firebase/comment";
import { mapGetters } from "vuex";
import Comment from "@/components/Comment/Comment";
import WriteModel from "@/components/CRUD_Model/WriteModelFB";
export default {
  components: {
    comment: Comment,
    "delete-comment": WriteModel,
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
  methods: {
    deleteComment(writeFB) {
      const vm = this;
      return writeFB().then(() => {
        vm.$router.replace({ name: "dashboard-reports" });
      });
    },
    cancel() {
      this.$router.go(-1);
    },
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