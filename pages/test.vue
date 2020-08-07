<template>
  <div>
    <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="Fresh" value="fresh"></v-radio>
      <v-radio label="Rising" value="rising"></v-radio>
      <v-radio label="All" value="all"></v-radio>
    </v-radio-group>
    <article-list-model :lazy="true" :params="{state:radios}">
      <template v-slot="{articles,loading,lazyLoadArticles}">
        <v-container class="px-0 pt-0">
          <v-row v-if="articles.length>0" dense>
            <v-col
              v-for="(article,i) in articles"
              v-observe-visibility="i===articles.length-1?lazyLoadArticles:false"
              :key="article.id"
              cols="12"
              sm="12"
              class="pt-0"
            >
              <article-card :article="article" />
            </v-col>
          </v-row>
          <v-row dense v-if="articles.length===0">
            <h1>No Articles yet</h1>
          </v-row>
          <v-row dense v-if="loading">
            <v-col cols="12" sm="12" v-for="i in 10" :key="i">
              <content-placeholders rounded>
                <content-placeholders-img />
                <content-placeholders-text :lines="3" />
              </content-placeholders>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </article-list-model>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel.vue";
import ArticleCard from "@/components/Article/ArticleCardBlockHorizontal";
export default {
  components: {
    "article-list-model": ArticleListModel,
    "article-card": ArticleCard,
  },
  data() {
    return { radios: "fresh" };
  },
};
</script>

<style>
</style>