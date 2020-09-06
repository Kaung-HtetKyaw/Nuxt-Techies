<template>
  <div>
    <v-container>
      <v-row dense class="white pa-6" :style="{boxShadow:`5px 6px 0px ${tag.bg_color.hex}`}">
        <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
          <div class="d-flex flex-row align-center">
            <span v-if="!!tag.logo.url" class="pa-4">
              <v-img width="80px" :src="tag.logo.url"></v-img>
            </span>
            <span
              class="text-h5 text-md-h3 font-weight-medium text-capitalize black--text pa-4"
            >{{tag.name}}</span>
          </div>
        </v-col>
        <v-col
          v-if="isDriver"
          cols="12"
          sm="12"
          class="d-flex flex-column flex-md-row justify-center justify-md-center align-center align-md-center"
        >
          <v-btn
            text
            depressed
            color="purple"
            nuxt
            :to="{name:'t-tag-edit',params:{tag:tagID}}"
            class="my-2"
          >Edit</v-btn>
          <v-btn
            text
            depressed
            color="red"
            nuxt
            :to="{name:'t-tag-delete',params:{tag:tagID}}"
            class="my-2"
          >Delete</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="px-0">
      <v-row dense>
        <v-col cols="12" sm="0" md="3"></v-col>
        <v-col cols="12" sm="12" md="6">
          <div class="text-center my-2">
            <h3 class="text-h5 font-weight-medium black--text">Posts</h3>
          </div>
          <article-list-model :lazy="true" :params="{ type: 'tag', param: tag.id }">
            <template v-slot="{ articles, lazyLoadArticles, loading, empty }">
              <v-container class="px-0 pt-0">
                <v-col cols="12" sm="12" class="pt-0">
                  <v-container class="px-0 pt-0">
                    <v-row dense>
                      <v-col
                        v-for="(article, i) in articles"
                        v-observe-visibility="
                              i === articles.length - 1
                                ? lazyLoadArticles
                                : false
                            "
                        :key="article.id"
                        cols="12"
                        sm="12"
                        class="pt-0"
                      >
                        <article-card :article="article" />
                      </v-col>
                    </v-row>
                    <v-row dense v-if="loading">
                      <v-col cols="12" sm="12" v-for="i in 10" :key="i">
                        <content-placeholders rounded>
                          <content-placeholders-img />
                          <content-placeholders-text :lines="3" />
                        </content-placeholders>
                      </v-col>
                    </v-row>
                    <v-row dense v-if="empty">
                      <empty-alert></empty-alert>
                    </v-row>
                  </v-container>
                </v-col>
              </v-container>
            </template>
          </article-list-model>
        </v-col>
        <v-col cols="12" sm="0" md="3"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleListModelFB from "@/components/Article/ArticleListModel";
import ArticleCard from "@/components/Article/ArticleCardBlockBrief";
import EmptyAlert from "@/components/Alert/EmptyAlert";
import { mapGetters } from "vuex";
import { authHydrated } from "@/mixins/Hydrated";
import { authority } from "@/mixins/authority";
export default {
  components: {
    "article-list-model": ArticleListModelFB,
    "article-card": ArticleCard,
    "empty-alert": EmptyAlert,
  },
  mixins: [authHydrated, authority],
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    tag() {
      return this.getTagByID(this.$route.params.tag);
    },
    tagID() {
      return this.$route.params.tag;
    },
  },
};
</script>

<style></style>
