<template>
  <v-card class="article-card-block mx-auto" max-width="350" height="500">
    <v-sheet
      height="200px"
      :style="{backgroundImage: `url(${article.cover_image?article.cover_image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'})`}"
      class="center-background-img"
    ></v-sheet>

    <div class="px-6 py-6">
      <v-card-subtitle class="pb-0 mb-2 font-weight-bold opacity-7">
        <slide-chips :tags="article.tag_list" />
      </v-card-subtitle>

      <nuxt-link
        :to="{name:'username-article',  params: { username: article.user.username, article: article }}"
      >
        <v-card-text class="text--primary">
          <h3 class="mb-2 text-h6">{{formattedTitle}}</h3>

          <p class="mb-0 text-subtitle-1 font-weight-medium opacity-7">{{formattedDescription}}</p>
        </v-card-text>
      </nuxt-link>
    </div>

    <!-- <v-card-actions>
      <v-btn color="orange" text>Share</v-btn>

      <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
import SlideChips from "@/components/Article/SlideChips";
import { text_ellipsis } from "@/utils/typo";
export default {
  components: {
    SlideChips
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDescription() {
      return text_ellipsis(this.article.description);
    },
    formattedTitle() {
      return text_ellipsis(this.article.title, 16);
    }
  }
};
</script>

<style>
</style>