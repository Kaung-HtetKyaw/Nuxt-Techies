<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="d-flex justify-center align-center full-width full-height"
    >
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <div v-else>
      <update-comment
        type="update"
        collection="comment"
        :params="{id:comment_id,data:comment,fetch:false}"
      >
        <template v-slot="{writeFB,loading}">
          <div>
            <v-container class="white">
              <v-row dense>
                <v-col cols="12" sm="12" class="d-flex justify-center align-center">
                  <markdown-container :content="comment.message"></markdown-container>
                </v-col>
                <v-col cols="12" sm="10" offset-sm="1">
                  <div class="white pa-md-8 pa-sm-4">
                    <h1
                      class="text-h5 text-md-h4 text-center my-2 font-weight-medium"
                    >Editing Comment</h1>
                    <v-divider></v-divider>
                    <v-form v-model="valid">
                      <v-textarea placeholder="Add a comment" outlined v-model="comment.message"></v-textarea>
                      <div class="d-flex justify-sm-center align-center">
                        <v-btn
                          class="white--text"
                          color="purple"
                          depressed
                          :loading="loading"
                          @click="updateComment(writeFB)"
                        >Submit</v-btn>
                        <v-btn
                          depressed
                          color="indigo lighten-4"
                          class="white--text mx-1"
                          @click="cancel"
                        >Cancel</v-btn>
                      </div>
                    </v-form>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </update-comment>
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
    "update-comment": WriteModelFB,
  },
  async fetch() {
    const comment = this.getCommentByID(this.comment_id);
    this.comment = comment;
  },
  data() {
    return {
      comment: null,
      valid: true,
    };
  },
  methods: {
    updateComment(writeFB) {
      return writeFB().then(() => {
        //redirect to the article
        this.$router.replace({
          name: "by-id",
          params: { by: this.by, id: this.post_id },
        });
      });
    },
    cancel() {
      this.$router.replace({
        name: "by-id",
        params: { by: this.by, id: this.post_id },
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