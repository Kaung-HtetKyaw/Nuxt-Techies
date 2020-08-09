<template>
  <div>
    <h1>This is delete page</h1>
    <write-fb type="delete" collection="article" :params="{id:id,fetch:true}">
      <template v-slot="{data,writeFB,loading}">
        <div>
          <div>
            <v-btn @click="deleteArticle(writeFB,data)">Delete Article</v-btn>
            <v-btn @click="cancel">Cancel</v-btn>
          </div>
          <div v-if="loading">
            <h1>#Deleting.....</h1>
          </div>
        </div>
      </template>
    </write-fb>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { deleteFile } from "~/services/file";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
  },
  methods: {
    async deleteArticle(callback, article) {
      await callback().then(() => {
        return deleteFile({ folder: "articles", id: article.photo.id }).then(
          () => {
            this.$router.replace({ name: "by", params: { by: this.by } });
          }
        );
      });
    },
    cancel() {
      this.$router.replace({ name: "by", params: { by: this.by } });
    },
  },
};
</script>

<style>
</style>