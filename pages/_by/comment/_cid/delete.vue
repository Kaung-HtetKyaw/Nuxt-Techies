<template>
  <div>
    <v-card height="450px" elevation="0" class="bs-border d-flex justify-center align-center">
      <write-fb type="delete" collection="comment" :params="{ id: cid}">
        <template v-slot="{  writeFB, loading }">
          <div>
            <v-container class="white">
              <v-row v-if="!loading" dense class="text-center">
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <div class="d-flex flex-column justify-center align-center">
                    <div class="my-2">
                      <h1 class="d-inline-block pa-2 text-h6 text-md-4 black white--text">{{cid}}</h1>
                    </div>
                    <div class="my-2 font-weight-medium">
                      <h1 class="text-h5 text-md-h4">Are you sure you want to delete this comment?</h1>
                    </div>
                    <div class="my-2">
                      <v-btn
                        color="red"
                        class="white--text"
                        depressed
                        :loading="deleting"
                        @click="deleteComment(writeFB)"
                      >Delete Comment</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col cols="12" sm="12">
                  <div>
                    <v-progress-circular indeterminate color="purple"></v-progress-circular>
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
import { mapGetters } from "vuex";
import { deleteComment } from "~/services/Firebase/comment";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware: ["auth"],
  async fetch() {},
  data() {
    return {
      deleting: false,
    };
  },
  computed: {
    cid() {
      return this.$route.params.cid;
    },
    by() {
      return this.$route.params.by;
    },
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
    comment() {
      return this.getCommentByID(this.cid);
    },
  },
  methods: {
    async deleteComment(callback) {
      const vm = this;
      vm.deleting = true;
      await callback().then(() => {
        vm.deleting = false;
        // vm.$router.replace({ name: "by", params: { by: vm.by } });
        vm.$router.go(-1);
      });
    },
    cancel() {
      vm.$router.go(-1);
      // vm.$router.replace({ name: "by", params: { by: vm.by } });
    },
  },
};
</script>

<style></style>
