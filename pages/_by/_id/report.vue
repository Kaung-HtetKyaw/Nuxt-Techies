<template>
  <div>
    <div v-if="$fetchState.pending">
      <h1>#Loading.....</h1>
    </div>
    <v-card v-else elevation="0" class="bs-border d-flex justify-center align-center">
      <write-fb type="create" collection="report" :params="{ data:report }">
        <template v-slot="{ writeFB, loading }">
          <div>
            <v-container class="white">
              <v-row dense class="text-center">
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <h1>Report Abuse</h1>
                </v-col>
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <div class="d-flex flex-column justify-center align-center">
                    <div class="my-2 font-weight-medium">
                      <h1 class="text-h5 text-md-h4">Are you sure you want to report this article?</h1>
                    </div>
                    <div class="my-2 full-width">
                      <h3 class="text-left text-subtitle-1 font-weight-medium my-1">Reported Article</h3>
                      <v-text-field disabled outlined dense v-model="article.title"></v-text-field>
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
                        @click="reportArticle(writeFB)"
                      >Report Article</v-btn>
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
import { deleteFile } from "@/services/Firebase/file";
import { isFile } from "@/utils/utils";
import { defaultReportObj } from "@/utils/constants";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware: ["auth"],
  async fetch() {
    const article = await this.$store.dispatch("article/fetchArticle", {
      id: this.articleID,
    });
    //set the reported article
    this.article = article;
    //set the report
    this.report.reported_item.id = this.articleID;
    this.report.by = this.by;
  },
  data() {
    return {
      article: {},
      report: defaultReportObj(),
      reporting: false,
    };
  },
  computed: {
    articleID() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
  },
  methods: {
    async reportArticle(callback) {
      const vm = this;
      vm.reporting = true;
      await callback().then(() => {
        vm.reporting = false;
        vm.$router.replace({ name: "by", params: { by: vm.by } });
      });
    },
    cancel() {
      this.$router.replace({ name: "by", params: { by: this.by } });
    },
  },
};
</script>

<style></style>
