<template>
  <div>
    <delete-topic type="delete" collection="topic" :params="{id:topicID,fetch:false}">
      <template v-slot="{writeFB}">
        <div>
          <v-container class="white bs-border">
            <v-row dense class="text-center">
              <v-col cols="12" sm="12" md="8" offset-md="2">
                <div class="d-flex flex-column justify-center align-center">
                  <div class="my-2">
                    <v-container>
                      <v-row dense class="white">
                        <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
                          <img :src="topic.cover.url" :alt="topic.name" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
                          <h3 class="text-h5 text-md-h4 font-weight-medium">{{topic.name}}</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <div class="my-2 font-weight-medium">
                    <h1
                      class="text-h6 text-md-h5 font-weight-medium"
                    >Are you sure you want to delete this topic?</h1>
                    <p
                      class="text-body-1 opacity-7"
                    >Deleting a topic will premanently delete all articles for the topic</p>
                  </div>
                  <div class="my-2">
                    <v-btn
                      color="red"
                      class="white--text"
                      depressed
                      :loading="deleting"
                      @click="deleteTopic(writeFB)"
                    >Delete Topic</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </delete-topic>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { mapGetters } from "vuex";
import { deleteFile } from "@/services/Firebase/file";
import { isFile } from "@/utils/utils";
export default {
  components: {
    "delete-topic": WriteModelFB,
  },
  middleware: ["auth"],
  data() {
    return {
      deleting: false,
    };
  },
  methods: {
    deleteTopic(writeFB) {
      const vm = this;
      const topic = { ...this.topic };
      vm.deleting = true;
      return writeFB().then(() => {
        //delete kids file
        vm.deleteArticleFiles(topic.kids);
        //delete topic file
        if (!topic.cover.url) {
          vm.$router.replace({ name: "topics" });
          vm.deleting = false;
        } else {
          deleteFile({
            folder: "topics",
            id: topic.cover.id,
          });
          vm.$router.replace({ name: "topics" });
          vm.deleting = false;
        }
      });
    },
    deleteArticleFiles(articlesID) {
      const vm = this;
      articlesID.forEach((id) => {
        const article = vm.getArticleByID(id);
        if (!!article.photo.url) {
          deleteFile({
            folder: "articles",
            id: article.photo.id,
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      getTopicByID: "topic/getTopicByID",
      getArticleByID: "article/getArticleByID",
    }),
    topic() {
      return this.getTopicByID(this.topicID);
    },
    topicID() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>