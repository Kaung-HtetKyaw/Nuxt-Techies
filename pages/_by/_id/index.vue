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
      <div class="white pa-sm-6 pa-md-12 rounded-xl article-view bs-border">
        <div class="pa-4">
          <h1
            :style="[article.tags.length>0?{textShadow:`-4px -1px 0 ${getTagByID(article.tags[0]).bg_color}`}:null]"
            class="text-center text-sm-h6 text-md-h3 font-weight-medium"
          >{{ article.title }}</h1>
          <h3
            class="text-center opacity-7 text-sm-subtitle-2 text-md-h5 font-weight-medium font-italic"
          >{{article.description}}</h3>
        </div>

        <div class="my-4 text-center d-flex justify-center align-center">
          <tag-slider :tags="article.tags" />
        </div>
        <div>
          <author-profile :id="by" class="my-3">
            <template v-slot="{ data: author, loading: loadingAuthor }">
              <div>
                <transition name="fade" mode="out-in">
                  <div
                    v-if="!loadingAuthor"
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
          <div
            v-if="!!user&&user.uid===article.by"
            class="d-flex flex-column justify-space-around align-center my-6"
          >
            <v-btn
              color="purple"
              class="white--text my-3"
              elevation="0"
              :ripple="false"
              nuxt
              :to="{ name: 'by-id-edit', params: { id, by } }"
            >Edit</v-btn>
            <v-btn
              text
              color="red"
              class="white--text my-3"
              elevation="0"
              :ripple="false"
              nuxt
              :to="{ name: 'by-id-delete', params: { id, by } }"
            >Delete</v-btn>
          </div>
          <v-sheet
            height="400px"
            :style="{
            backgroundImage: `url(${article.photo.url})`,
           
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
              <div class="d-flex flex-column justify-center align-center">
                <v-btn icon :ripple="false" text @click="like" class="opacity-7">
                  <v-icon size="30" v-if="!isLiked" left>mdi-heart-outline</v-icon>
                  <v-icon size="30" color="red" v-else left>mdi-heart</v-icon>
                  <span>{{ !isLiked?article.likesNo:'' }}</span>
                </v-btn>
                <transition name="fade" mode="out-in">
                  <liked-people v-if="isLiked" :peopleID="article.likes" class="pa-2">
                    <template #header>People who reacted to this post</template>
                    <template #button>
                      <span
                        v-if="article.likesNo>1"
                        class="text-caption"
                      >{{isLiked?'You and '+(article.likesNo-1)+' others':''}}</span>
                      <span v-else class="text-caption">{{isLiked?'You liked this article':''}}</span>
                    </template>
                    <template #icon>
                      <v-icon color="red">mdi-heart</v-icon>
                    </template>
                  </liked-people>
                </transition>
              </div>
            </template>
          </like-btn>
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
        <div v-else class="white pa-md-8 pa-sm-4 bs-border">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <div class="d-flex justify-center align-center">
                  <sign-in type="comment"></sign-in>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>

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
import SignInModal from "@/components/Button/SignInModal";
import TagSlider from "@/components/UI/TagSlider";
import LikedPeople from "@/components/UI/PeopleListModal";
import { defaultCommentObjFB } from "@/utils/constants";
import { timeAgo } from "@/utils/utils";
import { mapState, mapGetters } from "vuex";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  components: {
    "vue-markdown": MarkDown,
    comment: Comment,
    "author-profile": UserModelFB,
    "create-comment": CommentBox,
    "like-btn": LikeBtnFB,
    "author-card": AuthorCard,
    "sign-in": SignInModal,
    "tag-slider": TagSlider,
    "liked-people": LikedPeople,
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
