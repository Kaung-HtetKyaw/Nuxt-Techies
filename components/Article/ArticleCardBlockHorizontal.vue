<template>
  <v-card class="article-card-block bs-border" outlined>
    <nuxt-link
      :to="{
        name: 'by-id',
        params: { by: article.by, id: article.id }
      }"
    >
      <v-sheet
        height="200px"
        :style="{
          backgroundImage: `url(${
            article.photo.url
              ? article.photo.url
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'
          })`
        }"
        class="center-background-img"
      ></v-sheet>
    </nuxt-link>

    <div class="px-6 py-6">
      <v-card-text>
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
          <p class="mb-2 text-subtitle-2">{{article.description}}</p>
        </nuxt-link>

        <div class="mb-2" v-if="!!user">
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
        </div>
      </v-card-text>
    </div>

    <!-- <v-card-actions>
      <v-btn color="orange" text>Share</v-btn>

      <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>-->
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { fetchUser } from "@/services/Firebase/userAuth";
import { isEmptyObj, timeAgo } from "@/utils/utils";
import { defaultUserObjFB } from "@/utils/constants";
import { authHydrated } from "@/mixins/authHydrated";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import TagSlider from "@/components/UI/TagSlider";
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {
    "like-btn": LikeBtnFB,
    "tag-slider": TagSlider,
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
      .then((res) => {
        this.author = res.data();
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
