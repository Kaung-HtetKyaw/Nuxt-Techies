<template>
  <div>
    <h1 v-if="$fetchState.pending">#Loading....</h1>
    <div v-else>
      <delete-comment
        type="update"
        collection="comment"
        :params="{id:comment_id,data:comment,fetch:false}"
      >
        <template v-slot="{writeFB,loading}">
          <div>
            <v-container class="white">
              <v-row dense>
                <v-col cols="12" sm="12">
                  <markdown-container :content="comment.message"></markdown-container>
                </v-col>
                <v-col cols="12" sm="10" offset-sm="1">
                  <div class="white pa-md-8 pa-sm-4 bs-border">
                    <h1 class="text-center">Editing Comment</h1>
                    <v-form v-model="valid">
                      <v-textarea placeholder="Add a comment" outlined v-model="comment.message"></v-textarea>
                      <div class="d-flex justify-sm-center align-center">
                        <v-btn text color="purple" @click="cancel">Cancel</v-btn>
                        <v-btn
                          text
                          color="purple"
                          :loading="loading"
                          @click="updateComment(writeFB)"
                        >Submit</v-btn>
                      </div>
                    </v-form>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
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
      return this.$route.params.id;
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