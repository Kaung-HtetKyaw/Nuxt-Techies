<template>
  <div>
    <h1>This is article page</h1>
    <div v-if="$fetchState.pending">
      <h1>#Loading......</h1>
    </div>
    <div v-else>
      <author-profile :id="by">
        <template v-slot="{ data: author, loading: loadingAuthor }">
          <div>
            <h1 v-if="loadingAuthor">#Loading...</h1>
            <h1 v-else>{{ author.displayName }}</h1>
          </div>
        </template>
      </author-profile>
      <img :src="article.photo.url" alt />
      <vue-markdown :content="article.content"></vue-markdown>
      <v-btn nuxt :to="{ name: 'by-id-edit', params: { id, by } }">Edit</v-btn>
      <v-btn nuxt :to="{ name: 'by-id-delete', params: { id, by } }"
        >Delete</v-btn
      >
      <create-comment :show="true" :parent="{ ...article }"></create-comment>
      <div v-if="!loading">
        <comment v-for="kid in article.kids" :key="kid" :id="kid" />
      </div>
      <div v-else>
        <h1>#Loading.....</h1>
      </div>
    </div>
  </div>
</template>

<script>
import MarkDown from "@/components/UI/MarkDown";
import Comment from "@/components/Comment/Comment";
import UserModelFB from "@/components/Author/UserModelFB";
import CommentBox from "@/components/Comment/CommentBox";
import { defaultCommentObjFB } from "@/utils/constants";
import { mapState } from "vuex";
export default {
  components: {
    "vue-markdown": MarkDown,
    comment: Comment,
    "author-profile": UserModelFB,
    "create-comment": CommentBox
  },
  async fetch() {
    this.loading = true;
    const article = await this.$store.dispatch("article/fetchArticle", {
      id: this.id
    });
    this.article = article;
    this.loading = false;
  },
  data() {
    return {
      article: null,
      loading: false,
      new_comment: defaultCommentObjFB()
    };
  },
  created() {},
  watch: {
    article: "loadComments",
    "article.kids": function() {
      console.log("created an article");
    }
  },
  methods: {
    loadComments(article) {
      this.loading = true;
      return this.$store.dispatch("comment/clearComment").then(() => {
        return this.$store
          .dispatch("comment/fetchComment", article.kids)
          .then(() => {
            this.loading = false;
          });
      });
    },
    createComment(writeFB) {
      this.new_comment.by = this.user.uid;
      console.log("article before createing comment", this.article);
      console.log("comment before going to renderless", this.new_comment);
      return writeFB().then(() => {
        this.new_comment = defaultCommentObjFB();
      });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>

<style></style>
