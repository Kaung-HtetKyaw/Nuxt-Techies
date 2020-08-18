<template>
  <div>
    <div v-if="$fetchState.pending">
      <content-placeholders :rounded="true">
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="3" />
        <content-placeholders-text :lines="3" />
        <content-placeholders-text :lines="3" />
      </content-placeholders>
    </div>
    <div v-else>
      <div class="white pa-sm-6 pa-md-12 rounded-xl article-view">
        <div class="pa-4">
          <h1
            :style="{
            textShadow: `-4px -1px 0 ${getTagByID(article.tags[0]).bg_color}`
          }"
            class="text-center text-sm-h6 text-md-h3 font-weight-medium"
          >{{ article.title }}</h1>
          <h3
            class="text-center opacity-7 text-sm-subtitle-2 text-md-h5 font-weight-medium font-italic"
          >{{article.description}}</h3>
        </div>

        <div class="my-4 text-center">
          <nuxt-link
            v-for="(tag, i) in article.tags"
            :key="i"
            class="monospace opacity-7 pr-2 py-1"
            :to="{ name: 't-tag', params: { tag: tag } }"
          >
            <span
              :style="{
                backgroundColor: `${getTagByID(tag).bg_color}`,
                color: `${getTagByID(tag).text_color}`
              }"
              class="hover-blue rounded px-2 py-1 font-weight-medium"
            >{{ getTagByID(tag).name }}</span>
          </nuxt-link>
        </div>
        <div>
          <author-profile :id="by" class="my-3">
            <template v-slot="{ data: author, loading: loadingAuthor }">
              <div>
                <transition name="fade" mode="out-in">
                  <div v-if="loadingAuthor">
                    <transition name="fade" mode="out-in">
                      <p>#Loading...</p>
                    </transition>
                  </div>
                  <div
                    v-else
                    class="d-flex flex-column justify-space-between align-center font-italic text-subtitle-1"
                  >
                    <nuxt-link :to="{name:'by',params:{by:author.uid}}">
                      <p class="purple--text">{{author.displayName}}</p>
                    </nuxt-link>

                    <p>{{timeAgo(article.timestamp)}} ago</p>
                  </div>
                </transition>
              </div>
            </template>
          </author-profile>
          <v-sheet
            height="400px"
            :style="{
            backgroundImage: `url(${article.photo.url})`,
            filter:`8px 8px 10px ${getTagByID(article.tags[0]).bg_color}`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
          }"
            class="mb-6"
          ></v-sheet>
        </div>

        <vue-markdown :content="article.content"></vue-markdown>
        <div class="mb-2 d-flex justify-center align-center" v-if="!!user">
          <like-btn :data="article" type="article" :user="user">
            <template v-slot="{ like, isLiked }">
              <v-btn :ripple="false" text @click="like" class="opacity-7">
                <v-icon size="30" v-if="!isLiked" left>mdi-heart-outline</v-icon>
                <v-icon size="30" color="red" v-else left>mdi-heart</v-icon>
                <span>{{ article.likesNo }}</span>
              </v-btn>
            </template>
          </like-btn>

          <v-btn :ripple="false" text class="opacity-7">
            <v-icon size="30" left>mdi-comment-outline</v-icon>
            <span>{{ article.kids.length }}</span>
          </v-btn>
        </div>
      </div>
      <div class="white author-card">
        <author-profile :id="by" class="my-3">
          <template v-slot="{ data: author, loading: loadingAuthor }">
            <div>
              <transition name="fade" mode="out-in">
                <div v-if="loadingAuthor">
                  <transition name="fade" mode="out-in">
                    <p>#Loading...</p>
                  </transition>
                </div>
                <div v-else>
                  <author-card :author="author" />
                </div>
              </transition>
            </div>
          </template>
        </author-profile>
      </div>
      <div>
        <div v-if="!!user" class="white pa-md-8 pa-sm-4 bs-border">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <h4
                  class="text-center text-sm-subtitle-2 text-md-h6 font-weight-medium"
                >Add a Comment</h4>
                <create-comment :show="true" :parent="{ ...article }"></create-comment>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <!-- <v-btn nuxt :to="{ name: 'by-id-edit', params: { id, by } }">Edit</v-btn>
        <v-btn nuxt :to="{ name: 'by-id-delete', params: { id, by } }">Delete</v-btn>-->
        <div
          v-if="article.kids.length>0"
          class="comment-section white bs-border pa-md-8 pa-sm-4 my-6"
        >
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <div v-if="!loading">
                  <comment v-for="kid in article.kids" :key="kid" :id="kid" />
                </div>
                <div v-else>
                  <h1>#Loading.....</h1>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkDown from "@/components/UI/MarkDown";
import Comment from "@/components/Comment/Comment";
import UserModelFB from "@/components/Author/UserModelFB";
import CommentBox from "@/components/Comment/CommentBox";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import AuthorCard from "@/components/Author/AuthorCardArticle";
import { defaultCommentObjFB } from "@/utils/constants";
import { timeAgo } from "@/utils/utils";
import { mapState, mapGetters } from "vuex";
import { authHydrated } from "@/mixins/authHydrated";
export default {
  components: {
    "vue-markdown": MarkDown,
    comment: Comment,
    "author-profile": UserModelFB,
    "create-comment": CommentBox,
    "like-btn": LikeBtnFB,
    "author-card": AuthorCard,
  },
  mixins: [authHydrated],
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
  watch: {
    article: "loadComments",
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
      return writeFB().then(() => {
        this.new_comment = defaultCommentObjFB();
      });
    },
    timeAgo(time) {
      return timeAgo(time);
    },
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
};
</script>

<style></style>
