<template>
  <div>
    <h1>This is article page</h1>
    <div v-if="$fetchState.pending">
      <h1>#Loading......</h1>
    </div>
    <div v-else>
      <author-profile :id="by">
        <template v-slot="{data:author,loading:loadingAuthor,}">
          <div>
            <h1 v-if="loadingAuthor">#Loading...</h1>
            <h1 v-else>{{author.displayName}}</h1>
          </div>
        </template>
      </author-profile>
      <img :src="article.photo.url" alt />
      <vue-markdown :content="article.content"></vue-markdown>
      <v-btn nuxt :to="{ name: 'by-id-edit', params: { id, by } }">Edit</v-btn>
      <v-btn nuxt :to="{ name: 'by-id-delete', params: { id, by } }">Delete</v-btn>
      <create-comment
        type="create"
        collection="comment"
        :params="{data:new_comment,parent:article}"
      >
        <template v-slot="{writeFB,creatingComment}">
          <div>
            <v-text-field v-model="new_comment.message"></v-text-field>
            <v-btn :loading="creatingComment" @click="writeFB">Comment</v-btn>
          </div>
        </template>
      </create-comment>
      <div v-if="!loading">
        <comment v-for="kid in article.kids" :key="kid" :id="kid" />
      </div>
    </div>
  </div>
</template>

<script>
import MarkDown from "@/components/UI/MarkDown";
import Comment from "@/components/Comment/Comment";
import UserModelFB from "@/components/Author/UserModelFB";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { defaultCommentObjFB } from "@/utils/constants";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  components: {
    "vue-markdown": MarkDown,
    comment: Comment,
    "author-profile": UserModelFB,
    "create-comment": WriteModelFB,
  },
  async fetch() {
    this.loading = true;
    const article = await this.$store.dispatch("article/fetchArticle", {
      id: this.id,
    });
    this.article = article;
    this.loading = false;
  },
  data() {
    return {
      article: null,
      loading: false,
      new_comment: defaultCommentObjFB(),
    };
  },
  created() {
    this.new_comment.by = this.user.uid;
  },
  watch: {
    article: "loadComments",
  },
  methods: {
    loadComments(article) {
      this.loading = true;
      return this.$store
        .dispatch("comment/fetchComment", article.kids)
        .then(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  beforeDestroy() {
    this.$store.dispatch("comment/clearComment");
  },
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
