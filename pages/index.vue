<template>
  <div>
    <signin-btn-model :types="['github','facebook']">
      <template v-slot="{github,facebook,signout}">
        <div>
          <v-btn @click="github">SignIn With GitHub</v-btn>
          <v-btn @click="facebook">SignIn With Facebook</v-btn>
          <v-btn @click="signout">Sign Out</v-btn>
        </div>
      </template>
    </signin-btn-model>

    <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="All" :value="{type:'all'}"></v-radio>
      <v-radio label="Popular" :value="{type:'popular'}"></v-radio>
      <v-radio label="Discuss Tag" :value="{type:'tag',param:'discuss'}"></v-radio>
    </v-radio-group>
    <article-list-model :lazy="true" :params="radios">
      <template v-slot="{articles,lazyLoadArticles,loading,empty}">
        <transition :key="radios.type" name="slide-right">
          <v-container class="px-0 pt-0">
            <v-row v-if="articles.length>0" dense>
              <transition-group tag="div" name="item">
                <v-col
                  v-for="(article) in articles"
                  :key="article.id"
                  cols="12"
                  sm="12"
                  class="pt-0"
                >
                  <nuxt-link :to="{name:'by-id',params:{by:article.by,id:article.id}}">
                    <h1>{{article.title}}</h1>
                  </nuxt-link>

                  <v-btn
                    nuxt
                    :to="{name:'by-id-delete',params:{by:article.by,id:article.id}}"
                  >Delete</v-btn>
                </v-col>
              </transition-group>
            </v-row>
            <v-row dense v-if="articles.length===0">
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
import { signInGithubFB, signOutFB } from "@/services/userAuth";
import ArticleListModel from "@/components/Article/ArticleListModel.vue";
import ArticleCard from "@/components/Article/ArticleCardBlockHorizontal";
import SignInBtnModelFB from "@/components/Button/SignInBtnModelFB";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  components: {
    "article-list-model": ArticleListModel,
    "article-card": ArticleCard,
    "signin-btn-model": SignInBtnModelFB,
    "write-fb": WriteModelFB,
  },
  middleware: ["log"],
  data() {
    return { radios: { type: "all" } };
  },
  methods: {
    async signIn() {
      await signInGithubFB();
    },
    async signOut() {
      await signOutFB();
    },
  },
};
</script>

<style>
</style>