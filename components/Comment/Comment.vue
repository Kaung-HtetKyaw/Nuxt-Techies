<template>
  <div class="comment">
    <comment-stack :size="2" v-if="!$fetchState.pending && comment">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" sm="0" md="1" class="d-none d-md-inline-block">
            <div v-if="comment.kids.length > 0">
              <v-btn @click="show_comments = false" icon :ripple="false" v-if="show_comments">
                <v-icon>mdi-arrow-down-drop-circle</v-icon>
              </v-btn>
              <v-btn @click="show_comments = true" icon :ripple="false" v-else>
                <v-icon>mdi-arrow-right-drop-circle</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="11" class="pa-0">
            <v-card elevation="0" class="pa-0">
              <v-card-text class="pa-0">
                <div class="d-flex flex-row justify-space-between align-center">
                  <div>
                    <nuxt-link :to="{ name: 'by', params: { by: author.uid } }">
                      <v-avatar size="35">
                        <img :src="author.photo.url" :alt="author.displayName" />
                      </v-avatar>
                      <span class="pl-3 d-inline-block text-caption text-md-body-2">
                        {{
                        author.displayName
                        }}
                      </span>
                    </nuxt-link>
                  </div>
                  <div class="d-flex flex-row justify-space-between align-center">
                    <p class="text-caption text-md-body-2 ma-0">{{ timeAgo }} ago</p>
                  </div>
                </div>
                <markdown-container
                  :content="comment.message"
                  class="text-sm-body-2 text-md-subtitle-1 font-weight-medium pt-3"
                ></markdown-container>
              </v-card-text>
              <v-card-actions class="d-flex justify-center align-center pa-0">
                <div v-if="!!user">
                  <div class="d-none d-md-block">
                    <v-btn
                      v-if="comment.by === user.uid"
                      text
                      color="deep-purple accent-4"
                      nuxt
                      :to="{name:'by-comment-cid-edit',params:{by:comment.id,cid:comment.id}}"
                    >Edit</v-btn>

                    <v-btn @click="show_form = !show_form" text color="deep-purple accent-4">Reply</v-btn>
                    <v-btn
                      v-if="comment.by === user.uid"
                      text
                      color="red accent-4"
                      nuxt
                      :to="{
                    name: 'by-comment-cid-delete',
                    params: { by: comment.by, cid: comment.id }
                  }"
                    >Delete</v-btn>
                    <v-btn
                      text
                      color="red"
                      nuxt
                      :to="{name:'by-comment-cid-report',params:{by:comment.id,cid:comment.id}}"
                    >Report Abuse</v-btn>
                  </div>
                  <div class="d-block d-md-none justify-center">
                    <div class="d-flex justify-center align-center">
                      <v-menu transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            x-small
                            :ripple="false"
                            text
                            color="purple"
                            v-bind="attrs"
                            v-on="on"
                          >Manage</v-btn>
                        </template>
                        <v-list elevation="0">
                          <v-list-item>
                            <v-list-item-title>
                              <v-btn
                                x-small
                                @click="show_form = !show_form"
                                text
                                color="deep-purple accent-4"
                              >Reply</v-btn>
                            </v-list-item-title>
                            <v-list-item-title>
                              <v-btn
                                v-if="comment.by === user.uid"
                                text
                                x-small
                                color="deep-purple accent-4"
                                :to="{name:'by-comment-cid-edit',params:{by:comment.id,cid:comment.id}}"
                              >Edit</v-btn>
                            </v-list-item-title>
                            <v-list-item-title>
                              <v-btn
                                v-if="comment.by === user.uid"
                                x-small
                                text
                                color="red accent-4"
                                nuxt
                                :to="{
                    name: 'by-comment-cid-delete',
                    params: { by: comment.by, cid: comment.id }
                  }"
                              >Delete</v-btn>
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                  <div class="d-block d-md-none justify-center my-1">
                    <div class="d-flex justify-center align-center my-1">
                      <v-btn
                        x-small
                        :ripple="false"
                        text
                        color="red"
                        nuxt
                        :to="{name:'by-comment-cid-report',params:{by:comment.id,cid:comment.id}}"
                      >Report Abuse</v-btn>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <sign-in type="reply"></sign-in>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <create-comment
        @commentCanceled="show_form = false"
        @commentCreated="show_form = false"
        :show="show_form"
        :parent="{ ...comment }"
      ></create-comment>
      <div v-if="show_comments">
        <comment v-for="kid in comment.kids" :key="kid" :id="kid"></comment>
      </div>
    </comment-stack>
  </div>
</template>

<script>
import { fetchComment } from "@/services/Firebase/comment";
import { fetchUser } from "@/services/Firebase/userAuth";
import { mapState, mapGetters } from "vuex";
import { defaultCommentObjFB, defaultUserObjFB } from "@/utils/constants";
import { timeAgo } from "@/utils/utils";
import { authHydrated } from "@/mixins/Hydrated";
import CommentBox from "@/components/Comment/CommentBox";
import Stack from "@/components/UI/Stack";
import Markdonwn from "@/components/UI/MarkDown";
import SignInModal from "@/components/Button/SignInModal";
export default {
  name: "comment",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    "create-comment": CommentBox,
    "comment-stack": Stack,
    "markdown-container": Markdonwn,
    "sign-in": SignInModal,
  },
  mixins: [authHydrated],
  async fetch() {
    const comment = this.getCommentByID(this.id);

    return fetchUser(comment.by).then((res) => {
      const author = res;
      this.comment = comment;
      this.author = author;
    });
  },
  data() {
    return {
      open: true,
      comment: null,
      show_form: false,
      show_comments: true,
      author: null,
      default_user: defaultUserObjFB,
    };
  },
  computed: {
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
    timeAgo() {
      return timeAgo(this.comment.timestamp);
    },
  },
  methods: {
    pluralize: (n) => n + (n === 1 ? " reply" : " replies"),
  },
};
</script>

<style scoped></style>
