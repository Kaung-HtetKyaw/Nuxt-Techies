<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="d-flex justify-center align-center full-width full-height"
    >
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <v-card v-else elevation="0" class="bs-border d-flex justify-center align-center">
      <write-fb type="create" collection="report" :params="{ data:report }">
        <template v-slot="{ writeFB }">
          <div>
            <v-container class="white">
              <v-row dense class="text-center">
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <h1>Report Abuse</h1>
                </v-col>
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <div class="d-flex flex-column justify-center align-center">
                    <div class="my-2 font-weight-medium">
                      <h1 class="text-h5 text-md-h4">Are you sure you want to report this comment?</h1>
                    </div>
                    <div class="my-2 full-width">
                      <h3 class="text-left text-subtitle-1 font-weight-medium my-1">Reported Comment</h3>
                      <v-text-field disabled outlined dense v-model="comment.id"></v-text-field>
                    </div>
                    <div class="my-2 full-width">
                      <markdown :content="comment.message"></markdown>
                    </div>
                    <div class="my-2 full-width">
                      <h3 class="text-left text-subtitle-1 font-weight-medium my-1">Message</h3>
                      <p
                        class="text-left text-body-2 opacity-7"
                      >Please provide any additional information or context that will help us understand and handle the situation.</p>
                      <v-textarea outlined v-model="report.message"></v-textarea>
                    </div>
                    <div class="my-2">
                      <v-btn
                        color="red"
                        class="white--text"
                        depressed
                        :loading="reporting"
                        @click="reportComment(writeFB)"
                      >Report Comment</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </write-fb>
    </v-card>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import MarkDown from "@/components/UI/MarkDown";
import { deleteFile } from "@/services/Firebase/file";
import { isFile } from "@/utils/utils";
import { defaultReportObj } from "@/utils/constants";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    "write-fb": WriteModelFB,
    markdown: MarkDown,
  },
  middleware: ["auth"],
  async fetch() {
    const comment = this.getCommentByID(this.commentID);
    //set the reported article
    this.comment = comment;
    //set the report
    this.report.reported_item.id = this.commentID;
    this.report.by = this.by;
    this.report.reported_item.type = "comment";
  },
  data() {
    return {
      comment: {},
      report: defaultReportObj(),
      reporting: false,
    };
  },
  computed: {
    commentID() {
      return this.$route.params.cid;
    },
    by() {
      return this.$route.params.by;
    },
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
  },
  methods: {
    async reportComment(callback) {
      const vm = this;
      vm.reporting = true;
      await callback().then(() => {
        vm.reporting = false;
        vm.$router.go(-1);
      });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
