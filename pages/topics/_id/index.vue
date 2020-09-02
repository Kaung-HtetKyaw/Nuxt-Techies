<template>
  <div>
    <v-container class="pa-0">
      <v-row dense>
        <v-col cols="12" sm="12" md="12" class="pa-0">
          <div v-if="!$fetchState.pending">
            <topic-card :topic="topic"></topic-card>
            <div>
              <v-container class="pa-0">
                <v-row dense v-if="!!user">
                  <v-col cosl="12" sm="12" md="8" offset-md="2">
                    <v-card outlined rounded height="100px" class="bs-border">
                      <div
                        class="full-height d-flex justify-center align-center"
                      >
                        <v-list-item class="d-flex justify-center align-center">
                          <nuxt-link
                            :to="{ name: 'by', params: { by: user.uid } }"
                          >
                            <v-avatar size="40">
                              <img
                                :src="user.photo.url"
                                :alt="user.displayName"
                              />
                            </v-avatar>
                          </nuxt-link>

                          <v-list-item-title class="ml-4 body-1">
                            <v-btn
                              nuxt
                              :to="{
                                name: 'topics-id-new',
                                params: { id: topic.id }
                              }"
                              color="grey lighten-2"
                              block
                              depressed
                              >Creat an article</v-btn
                            >
                          </v-list-item-title>
                        </v-list-item>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" sm="12" md="4">
                    <about-card :topic="topic"></about-card>
                  </v-col>
                  <v-col cols="12" sm="12" md="8" class="pa-3">
                    <h1
                      class="text-center text-md-left text-h5 text-md-h4 font-weight-medium"
                    >
                      Discussions
                    </h1>
                    <article-list
                      :lazy="true"
                      :params="{ type: 'topic', param: topicID }"
                    >
                      <template
                        v-slot="{ articles, lazyLoadArticles, loading, empty }"
                      >
                        <div>
                          <v-container class="px-0 pt-0">
                            <v-col cols="12" sm="12" class="pt-0">
                              <v-container class="px-0 pt-0">
                                <v-row dense>
                                  <transition-group
                                    name="vertical"
                                    tag="div"
                                    class="full-width"
                                  >
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
                                      class="pa-0"
                                    >
                                      <article-card :article="article" />
                                    </v-col>
                                  </transition-group>
                                </v-row>
                                <v-row dense v-if="loading">
                                  <v-col
                                    cols="12"
                                    sm="12"
                                    v-for="i in 10"
                                    :key="i"
                                  >
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
                        </div>
                      </template>
                    </article-list>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
          <div v-else>
            <h1>#Loading</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleListModel from "@/components/Article/ArticleListModel";
import TopicCardDetail from "@/components/Topics/TopicCardDetail";
import ArticleCard from "@/components/Article/ArticleCardBlockHorizontal";
import UserModel from "@/components/Author/UserModelFB";
import TopicAboutCard from "@/components/Topics/TopicAboutCard";
import { mapState, mapGetters } from "vuex";
import { fetchArticlesByID } from "@/services/Firebase/article";
import { authHydrated } from "@/mixins/Hydrated";
export default {
  components: {
    "article-list": ArticleListModel,
    "topic-card": TopicCardDetail,
    "article-card": ArticleCard,
    "author-card": UserModel,
    "about-card": TopicAboutCard
  },
  mixins: [authHydrated],
  async fetch() {
    if (!this.topic) {
      return this.$store.dispatch("topic/fetchAllTopics");
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getTopicByID: "topic/getTopicByID"
    }),
    topic() {
      return this.getTopicByID(this.topicID);
    },
    topicID() {
      return this.$route.params.id;
    }
  }
};
</script>

<style></style>
