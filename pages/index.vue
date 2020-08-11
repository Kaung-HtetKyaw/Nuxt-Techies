<template>
  <div>
    <signin-btn-model :types="['github', 'facebook']">
      <template v-slot="{ github, facebook, signout }">
        <div>
          <v-btn @click="github">SignIn With GitHub</v-btn>
          <v-btn @click="facebook">SignIn With Facebook</v-btn>
          <v-btn @click="signout">Sign Out</v-btn>
        </div>
      </template>
    </signin-btn-model>
    <user-model id="tpUmhxXm3WRLZTguGgtXOtp5xYS2">
      <template v-slot="{data,loading}">
        <div>
          <div v-if="!loading&&!!data">
            <h1>{{data.displayName}}</h1>
          </div>
        </div>
      </template>
    </user-model>
    <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="All" :value="{ type: 'all' }"></v-radio>
      <v-radio label="Popular" :value="{ type: 'popular' }"></v-radio>
      <v-radio label="Javascript Tag" :value="{ type: 'tag', param: '2gE4P4RuyGiT4KwrUtOh' }"></v-radio>
    </v-radio-group>
    <article-list-model :lazy="true" :params="radios">
      <template v-slot="{ articles, lazyLoadArticles, loading, empty }">
        <transition :key="radios.type" name="slide-right">
          <v-container class="px-0 pt-0">
            <v-row v-if="articles.length > 0" dense>
              <transition-group tag="div" name="item">
                <v-col v-for="article in articles" :key="article.id" cols="12" sm="12" class="pt-0">
                  <article-card :article="article"></article-card>

                  <v-btn
                    nuxt
                    :to="{
                      name: 'by-id-delete',
                      params: { by: article.by, id: article.id }
                    }"
                  >Delete</v-btn>
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
import ArticleListModel from "@/components/Article/ArticleListModel.vue";
import ArticleCard from "@/components/Article/ArticleCardBlockHorizontal";
import SignInBtnModelFB from "@/components/Button/SignInBtnModelFB";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import UserModelFB from "@/components/Author/UserModelFB";
import { mapState } from "vuex";
import { authHydrated } from "@/mixins/authHydrated";
export default {
  components: {
    "article-list-model": ArticleListModel,
    "article-card": ArticleCard,
    "signin-btn-model": SignInBtnModelFB,
    "write-fb": WriteModelFB,
    "like-btn": LikeBtnFB,
    "user-model": UserModelFB,
  },
  middleware: ["log"],
  mixins: [authHydrated],
  data() {
    return { radios: { type: "all" }, isHydrated: false };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.user.isAuthenticated,
    }),
  },
};
</script>

<style></style>
