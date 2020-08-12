<template>
  <div>
    <h1>This is article page</h1>
    <div v-if="$fetchState.pending">
      <h1>#Loading......</h1>
    </div>
    <div v-else>
      <h1>This is {{ article.title }}</h1>
      <img :src="article.photo.url" alt />
      <vue-markdown :content="article.content"></vue-markdown>
      <v-btn nuxt :to="{ name: 'by-id-edit', params: { id, by } }">Edit</v-btn>
      <v-btn nuxt :to="{ name: 'by-id-delete', params: { id, by } }"
        >Delete</v-btn
      >
    </div>
  </div>
</template>

<script>
import MarkDown from "@/components/UI/MarkDown";
export default {
  middleware: ["auth"],
  components: {
    "vue-markdown": MarkDown
  },
  async fetch() {
    const article = await this.$store.dispatch("article/fetchArticle", {
      id: this.id
    });
    this.article = article;
  },
  data() {
    return {
      article: null
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    }
  }
  // async fetch() {
  //   const res = await this.$fireStore.collection("articles").get();

  //   console.log("firestore", res);
  // },
  // created() {
  //   var starCountRef = this.$fireDb.ref("articles/");
  //   starCountRef.on("value", function(snapshot) {
  //     console.log("changed", snapshot.val());
  //   });
  //   this.$fireStore.collection("articles").onSnapshot(function(snapshot) {
  //     snapshot.docChanges().forEach(function(change) {
  //       if (change.type === "added") {
  //         console.log("New article: ", change.doc.data());
  //       }
  //       if (change.type === "modified") {
  //         console.log("Modified article: ", change.doc.data());
  //       }
  //       if (change.type === "removed") {
  //         console.log("Removed article: ", change.doc.data());
  //       }
  //     });
  //   });
  // }
};
</script>

<style></style>
