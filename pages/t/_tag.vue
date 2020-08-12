<template>
  <div>
    <h1
      :style="{
        backgroundColor: `${tag.bg_color}`,
        color: `${tag.text_color}`
      }"
    >
      This is {{ tag.name }} tag
    </h1>
    <article-list-model :lazy="true" :params="{ type: 'tag', param: tag.id }">
      <template v-slot="{ articles, lazyLoadArticles, loading, empty }">
        <transition name="slide-right">
          <v-container class="px-0 pt-0">
            <v-row v-if="articles.length > 0" dense>
              <transition-group tag="div" name="item">
                <v-col
                  v-for="article in articles"
                  :key="article.id"
                  cols="12"
                  sm="12"
                  class="pt-0"
                >
                  <nuxt-link
                    :to="{
                      name: 'by-id',
                      params: { by: article.by, id: article.id }
                    }"
                  >
                    <h1>{{ article.title }}</h1>
                  </nuxt-link>

                  <v-btn
                    nuxt
                    :to="{
                      name: 'by-id-delete',
                      params: { by: article.by, id: article.id }
                    }"
                    >Delete</v-btn
                  >
                </v-col>
              </transition-group>
            </v-row>
            <v-row dense v-if="articles.length === 0">
              <h1>No Articles yet</h1>
            </v-row>
            <v-row dense v-if="empty">
              <h1>#Empty</h1>
            </v-row>
            <transition name="fade">
              <v-row dense v-if="loading">
                <h1>#Loading......</h1>
              </v-row>
            </transition>

            <v-btn @click="lazyLoadArticles">Load More</v-btn>
          </v-container>
        </transition>
      </template>
    </article-list-model>
  </div>
</template>

<script>
import ArticleListModelFB from "@/components/Article/ArticleListModel";
import { mapGetters } from "vuex";
export default {
  components: {
    "article-list-model": ArticleListModelFB
  },
  data() {
    return {
      articles: []
    };
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID"
    }),
    tag() {
      return this.getTagByID(this.$route.params.tag);
    }
  }
};
</script>

<style></style>
