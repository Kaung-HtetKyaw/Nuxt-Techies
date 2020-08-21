<template>
  <div>
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

      <div v-if="article.tags.length>0" class="my-4 text-center d-flex justify-center align-center">
        <tag-slider :tags="article.tags" />
      </div>
      <div>
        <author-profile :id="article.by" class="my-3">
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
    </div>
  </div>
</template>

<script>
import MarkDown from "@/components/UI/MarkDown";
import TagSlider from "@/components/UI/TagSlider";
import UserModelFB from "@/components/Author/UserModelFB";
import { timeAgo } from "@/utils/utils";
import { mapGetters } from "vuex";
export default {
  components: {
    "vue-markdown": MarkDown,
    "tag-slider": TagSlider,
    "author-profile": UserModelFB,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log("PREVIEW", this.article);
  },
  methods: {
    timeAgo(time) {
      return timeAgo(time);
    },
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
  },
};
</script>

<style>
</style>