<template>
  <div>
    <v-card height="450px" elevation="0" class="bs-border d-flex justify-center align-center">
      <write-fb
        type="delete"
        @dataReady="setArticle"
        collection="article"
        :params="{ id: id, fetch: true }"
      >
        <template v-slot="{ data, writeFB, loading }">
          <div>
            <v-container class="white">
              <v-row v-if="!loading" dense class="text-center">
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <div class="d-flex flex-column justify-center align-center">
                    <div class="my-2">
                      <h1
                        class="d-inline-block pa-2 text-h6 text-md-4"
                        :style="
                  [data.tags.length>0?{backgroundColor:`${getTagByID(data.tags[0]).bg_color.hex}`,color:`${getTagByID(data.tags[0]).text_color.hex}`}:null]
                  "
                      >{{data.title}}</h1>
                    </div>
                    <div class="my-2 font-weight-medium">
                      <h1 class="text-h5 text-md-h4">Are you sure you want to delete this article?</h1>
                    </div>
                    <div class="my-2">
                      <v-btn
                        color="red"
                        class="white--text"
                        depressed
                        :loading="deleting"
                        @click="deleteArticle(writeFB)"
                      >Delete Article</v-btn>
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
import { mapGetters } from "vuex";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware: ["auth"],
  data() {
    return {
      article: {},
      deleting: false,
    };
  },
  computed: {
    id() {
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
    setArticle(article) {
      this.article = article;
    },
    async deleteArticle(callback) {
      const vm = this;
      vm.deleting = true;
      await callback().then(() => {
        //delete file if only url exists
        if (!vm.article.photo.url) {
          vm.deleting = false;
          vm.$router.replace({ name: "by", params: { by: vm.by } });
        } else {
          return deleteFile({
            folder: "articles",
            id: vm.article.photo.id,
          }).then(() => {
            vm.deleting = false;
            vm.$router.replace({ name: "by", params: { by: vm.by } });
          });
        }
      });
    },
    cancel() {
      this.$router.replace({ name: "by", params: { by: this.by } });
    },
  },
};
</script>

<style></style>
