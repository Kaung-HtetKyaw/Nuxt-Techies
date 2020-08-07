<template>
  <div>
    <write-fb collection="article" type="create" :params="{data:article}">
      <template v-slot="{writeFB,loading}">
        <div v-if="loading">
          <h1>#Loading.......</h1>
        </div>
        <div v-else>
          <v-text-field v-model="article.title" label="Title"></v-text-field>
          <v-textarea v-model="article.description" label="Description"></v-textarea>
          <v-btn @click="writeFB">Create Article</v-btn>
        </div>
      </template>
    </write-fb>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  data() {
    return {
      article: {
        title: "",
        description: "",
        timestamp: Date.now(),
        by: "bz666satanicshit",
      },
    };
  },
};
</script>

<style>
</style>