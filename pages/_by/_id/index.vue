<template>
  <div>
    <div v-if="$fetchState.pending">
      <content-placeholders :rounded="true">
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
            :style="[
              article.tags.length > 0
                ? {
                    textShadow: `-4px -1px 0 ${
                      getTagByID(article.tags[0]).bg_color
                    }`
                  }
                : null
            ]"
            class="text-center text-sm-h6 text-md-h4 font-weight-medium"
          >
            {{ article.title }}
          </h1>
          <h3
            class="text-center opacity-7 text-subtitle-1 font-weight-medium font-italic my-4"
          >
            {{ article.description }}
          </h3>
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
                    <nuxt-link :to="{ name: 'by', params: { by: author.uid } }">
                      <p class="purple--text">{{ author.displayName }}</p>
                    </nuxt-link>

                    <p>{{ timeAgo(article.timestamp) }} ago</p>
                  </div>
                </transition>
              </div>
            </template>
          </author-profile>
          <div
            class="d-flex flex-column justify-space-around align-center my-6"
          >
            <div v-if="!!user">
              <div v-if="user.uid === article.by || isDriver">
                <v-btn
                  color="purple"
                  class="white--text my-3"
                  elevation="0"
                  :ripple="false"
                  nuxt
                  :to="{ name: 'by-id-edit', params: { id, by } }"
                  >Edit</v-btn
                >
                <v-btn
                  text
                  color="red"
                  class="white--text my-3"
                  elevation="0"
                  :ripple="false"
                  nuxt
                  :to="{ name: 'by-id-delete', params: { id, by } }"
                  >Delete</v-btn
                >
              </div>
              <div class="d-flex justify-center align-center">
                <v-btn
                  text
                  color="red"
                  class="white--text my-3"
                  elevation="0"
                  :ripple="false"
                  nuxt
                  :to="{ name: 'by-id-report', params: { id, by } }"
                  >Report</v-btn
                >
              </div>
            </div>
          </div>
          <v-container>
            <v-row dense justify="center">
              <social-btn
                v-for="type in ['facebook', 'twitter', 'reddit', 'linkedin']"
                :key="type"
                :type="type"
                :article="article"
                class="px-1 my-1"
              ></social-btn
            ></v-row>
          </v-container>

          <v-sheet
            v-if="article.photo.url"
            height="400px"
            :style="{
              backgroundImage: `url(${article.photo.url})`,

              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }"
            class="mb-6"
          ></v-sheet>
        </div>

        <vue-markdown :content="article.content"></vue-markdown>
        <div class="mb-2 d-flex justify-center align-center" v-if="!!user">
          <like-btn :data="article" type="article" :user="user">
            <template v-slot="{ like, isLiked }">
              <div class="d-flex flex-column justify-center align-center">
                <v-btn
                  icon
                  :ripple="false"
                  text
                  @click="like"
                  class="opacity-7"
                >
                  <v-icon size="30" v-if="!isLiked" left
                    >mdi-heart-outline</v-icon
                  >
                  <v-icon size="30" color="red" v-else left>mdi-heart</v-icon>
                  <span>{{ !isLiked ? article.likesNo : "" }}</span>
                </v-btn>
                <transition name="fade" mode="out-in">
                  <liked-people
                    v-if="isLiked"
                    :peopleID="article.likes"
                    class="pa-2"
                  >
                    <template #header>People who reacted to this post</template>
                    <template #button>
                      <span v-if="article.likesNo > 1" class="text-caption">
                        {{
                          isLiked
                            ? "You and " + (article.likesNo - 1) + " others"
                            : ""
                        }}
                      </span>
                      <span v-else class="text-caption">
                        {{ isLiked ? "You liked this article" : "" }}
                      </span>
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
                <div v-if="loadingAuthor" class="full-width white">
                  <transition name="fade" mode="out-in">
                    <content-placeholders :rounded="true">
                      <content-placeholders-img />
                      <content-placeholders-heading />
                    </content-placeholders>
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
      <div v-if="article.tags.length > 0">
        <v-container class="pa-0">
          <v-row dense>
            <v-col cols="12" sm="12">
              <related-articles :articleToExclude="article">
                <template v-slot="{ loading, relatedArticles }">
                  <div>
                    <div v-if="loading">
                      <content-placeholders :rounded="true">
                        <content-placeholders-img />
                        <content-placeholders-text :lines="3" />
                      </content-placeholders>
                    </div>

                    <div v-else>
                      <div
                        v-if="relatedArticles.length > 0"
                        class="white bs-border my-3 pa-md-8 pa-sm-4"
                      >
                        <h3 class="text-h5 text-md-h4 pa-4 text-center">
                          Related Articles
                        </h3>
                        <v-divider></v-divider>
                        <related-articles-card
                          v-for="relatedArticle in relatedArticles"
                          :key="relatedArticle.id"
                          :article="relatedArticle"
                        ></related-articles-card>
                      </div>
                    </div>
                  </div>
                </template>
              </related-articles>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div>
        <div v-if="!!user" class="white pa-md-8 pa-sm-4 bs-border">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <h4
                  class="text-center text-sm-subtitle-2 text-md-h6 font-weight-medium"
                >
                  Add a Comment
                </h4>
                <create-comment
                  :show="true"
                  :parent="{ ...article }"
                ></create-comment>
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
          v-if="article.kids.length > 0"
          class="comment-section white bs-border pa-md-8 pa-sm-4 my-6"
        >
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <div v-if="!loading">
                  <comment v-for="kid in article.kids" :key="kid" :id="kid" />
                </div>
                <div v-else class="d-flex justify-center align-center">
                  <v-progress-circular
                    indeterminate
                    color="purple"
                  ></v-progress-circular>
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
import RelatedArticlesModel from "@/components/Article/RelatedArticlesModel";
import RelatedArticlesCard from "@/components/Article/ArticleCardBlockRelated";
import SocialButton from "@/components/Button/SocialBtn";
import { defaultCommentObjFB, defaultMeta } from "@/utils/constants";
import { timeAgo, isDriver, createSEOMeta } from "@/utils/utils";
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
    "related-articles": RelatedArticlesModel,
    "related-articles-card": RelatedArticlesCard,
    "social-btn": SocialButton
  },
  head() {
    return this.meta;
  },
  mixins: [authHydrated],
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
  watch: {
    article: "loadComments"
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
    }
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
    by() {
      return this.$route.params.by;
    },
    ...mapGetters({
      getTagByID: "tag/getTagByID"
    }),
    isDriver() {
      return this.user ? isDriver(this.user) : false;
    },
    path() {
      return this.$route.fullPath;
    },

    meta() {
      if (this.article) {
        const title = this.article.title;
        return { title, meta: createSEOMeta(this.article, this.path) };
      }
      return defaultMeta(this.path);
    }
  }
};
</script>

<style></style>
