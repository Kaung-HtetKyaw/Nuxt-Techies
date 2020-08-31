<template>
  <div>
    <h1>Delete a topic</h1>
    <delete-topic type="delete" collection="topic" :params="{id:topicID,fetch:false}">
      <template v-slot="{writeFB}">
        <div>
          <div>
            <h1 v-if="deleting">#DELETING........</h1>
            <h1 v-else>{{topic.name}}</h1>
          </div>

          <v-btn @click="deleteTopic(writeFB)" :loading="deleting">Delete Topics</v-btn>
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