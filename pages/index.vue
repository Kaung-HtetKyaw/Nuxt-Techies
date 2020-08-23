<template>
  <div>
    <v-container fluid class="px-0">
      <v-row dense>
        <v-col cols="12" md="3" sm="0" class="d-none d-md-block flex-column">
          <div class="py-4 white bs-border">
            <div v-if="!!user">
              <user-avatar :user="user"></user-avatar>
            </div>
            <user-info></user-info>
            <v-divider class="mt-4"></v-divider>
            <tag-group class="mt-4"></tag-group>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12" class="pt-0">
          <v-container class="px-0 pt-0">
            <v-row dense>
              <article-list-model :lazy="true" :params="{type:'all'}">
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
                          <h1>#Empty.....</h1>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-container>
                </template>
              </article-list-model>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" sm="0" md="3" class="red d-none d-md-flex">
          <h1>Posts</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel.vue";
import ArticleCard from "@/components/Article/ArticleCardBlockHorizontal";
import SignInBtnModelFB from "@/components/Button/SignInBtnModelFB";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import UserModelFB from "@/components/Author/UserModelFB";
import TagGroup from "@/components/UI/TagGroup";
import NavigationDrawer from "@/components/UI/NavigationDrawer";
import UserAvatar from "@/components/UI/UserAvatarDrawer";
import { mapState } from "vuex";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  components: {
    "article-list-model": ArticleListModel,
    "article-card": ArticleCard,
    "signin-btn-model": SignInBtnModelFB,
    "write-fb": WriteModelFB,
    "like-btn": LikeBtnFB,
    "user-model": UserModelFB,
    "tag-group": TagGroup,
    "user-info": NavigationDrawer,
    "user-avatar": UserAvatar,
  },
  middleware: ["log"],
  mixins: [authHydrated],
  data() {
    return { isHydrated: false };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.user.isAuthenticated,
    }),
  },
};
</script>

<style></style>
