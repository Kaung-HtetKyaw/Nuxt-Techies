<template>
  <v-card class="article-card-block bs-border my-2" outlined>
    <div v-if="banner&&!!article.topics">
      <article-banner class="px-4" :topicID="article.topics"></article-banner>
      <v-divider></v-divider>
    </div>

    <nuxt-link
      :to="{
        name: 'by-id',
        params: { by: article.by, id: article.id }
      }"
    >
      <v-sheet
        v-if="article.photo.url"
        height="200px"
        :style="{
          backgroundImage: `url(${
            article.photo.url
             
          })`
        }"
        class="center-background-img"
      ></v-sheet>
    </nuxt-link>

    <div class="px-4 py-3">
      <v-card-text class="px-0">
        <div>
          <div v-if="isEmptyObj">
            <transition name="fade" mode="out-in">
              <div class="mb-2 d-flex flex-row">
                <v-avatar size="35">
                  <img :src="defaultUserObjFB.photo.url" :alt="defaultUserObjFB.displayName" />
                </v-avatar>
                <div class="d-flex flex-column justify-center px-4 opacity-7">
                  <div class="hover-blue">Loading...</div>
                  <div class="caption py-1"></div>
                </div>
              </div>
            </transition>
          </div>
          <div v-else>
            <transition name="fade" mode="out-in">
              <nuxt-link
                :to="{
                  name: 'by',
                  params: { by: article.by }
                }"
              >
                <div class="mb-2 d-flex flex-row">
                  <v-avatar size="35">
                    <img :src="author.photo.url" :alt="author.displayName" />
                  </v-avatar>
                  <div class="d-flex flex-column justify-center px-4 opacity-7">
                    <div class="hover-blue font-weight-medium">{{ author.displayName }}</div>
                    <div class="caption py-1 black--text">
                      <span>({{ timeAgo }} ago)</span>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </transition>
          </div>
        </div>
        <div class="my-4">
          <tag-slider :tags="article.tags" />
        </div>
        <nuxt-link
          :to="{
            name: 'by-id',
            params: { by: article.by, id: article.id }
          }"
        >
          <h3 class="mb-2 text-h6">{{ article.title }}</h3>
          <p class="mb-2 text-subtitle-2 font-italic opacity-7">{{article.description}}</p>
        </nuxt-link>

        <v-card-actions v-if="!!user">
          <like-btn :data="article" type="article" :user="user">
            <template v-slot="{ like, isLiked }">
              <v-btn :ripple="false" text @click="like" class="opacity-7">
                <v-icon v-if="!isLiked" left>mdi-heart-outline</v-icon>
                <v-icon color="red" v-else left>mdi-heart</v-icon>
                <span>{{ article.likesNo }}</span>
              </v-btn>
            </template>
          </like-btn>

          <v-btn text class="opacity-7">
            <v-icon left>mdi-comment-outline</v-icon>
            <span>{{ article.kids.length }}</span>
          </v-btn>
          <save-btn :id="article.id">
            <template v-slot="{save,isSaved}">
              <v-btn depressed color="white" :ripple="false" @click="save" class="opacity-7">
                <v-icon v-if="!isSaved" left>mdi-bookmark</v-icon>
                <v-icon color="blue" v-else left>mdi-bookmark-check</v-icon>
              </v-btn>
            </template>
          </save-btn>
        </v-card-actions>
      </v-card-text>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { fetchUser } from "@/services/Firebase/userAuth";
import { isEmptyObj, timeAgo } from "@/utils/utils";
import { defaultUserObjFB } from "@/utils/constants";
import { authHydrated } from "@/mixins/Hydrated";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import TagSlider from "@/components/UI/TagSlider";
import SaveBtn from "@/components/Button/SaveArticleModelFB";
import ArticleBanner from "@/components/UI/ArticleBanner";
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    banner: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    "like-btn": LikeBtnFB,
    "tag-slider": TagSlider,
    "save-btn": SaveBtn,
    "article-banner": ArticleBanner,
  },
  mixins: [authHydrated],
  data() {
    return {
      author: {},
      defaultUserObjFB,
    };
  },
  async fetch() {
    return fetchUser(this.article.by)
      .then((user) => {
        this.author = user;
      })
      .catch((e) => console.log(e));
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    isEmptyObj() {
      return isEmptyObj(this.author);
    },
    timeAgo() {
      return timeAgo(this.article.timestamp);
    },
  },
};
</script>
