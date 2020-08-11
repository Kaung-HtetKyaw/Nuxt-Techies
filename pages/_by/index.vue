<template>
  <div>
    <h1>This is {{user.displayName}} 's page</h1>
    <v-btn nuxt :to="{name:'by-settings',params:{by}}">Update Settings</v-btn>
    <article-list :lazy="true" :params="{ type: 'user', param: by }">
      <template v-slot="{ articles, loading, lazyLoadArticles, empty }">
        <div>
          <div>
            <v-col v-for="article in articles" :key="article.id" cols="12" sm="12" class="pt-0">
              <nuxt-link
                :to="{
                  name: 'by-id',
                  params: { by: article.by, id: article.id }
                }"
              >
                <h1>{{ article.title }}</h1>
              </nuxt-link>
              <like-btn :data="article" type="article" :user="user">
                <template v-slot="{ like, isLiked }">
                  <div>
                    <v-btn @click="like">
                      {{
                      isLiked ? "Unlike" : "Like"
                      }}
                    </v-btn>
                  </div>
                </template>
              </like-btn>
            </v-col>
          </div>
          <div v-if="loading">
            <h1>#Loading.......</h1>
          </div>
          <div v-if="empty">
            <h1>#Empty</h1>
          </div>
          <v-btn @click="lazyLoadArticles">Load More</v-btn>
        </div>
      </template>
    </article-list>
  </div>
</template>

<script>
import ArticleListModelFB from "@/components/Article/ArticleListModel";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  components: {
    "article-list": ArticleListModelFB,
    "like-btn": LikeBtnFB,
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    by() {
      return this.$route.params.by;
    },
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style></style>
