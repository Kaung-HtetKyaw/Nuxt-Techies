<template>
  <div class="comment">
    <comment-stack :size="3" v-if="!$fetchState.pending">
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="1">
            <div v-if="comment.kids.length>0">
              <v-btn @click="show_comments=false" icon :ripple="false" v-if="show_comments">
                <v-icon>mdi-arrow-down-drop-circle</v-icon>
              </v-btn>
              <v-btn @click="show_comments=true" icon :ripple="false" v-else>
                <v-icon>mdi-arrow-right-drop-circle</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="11" class="pa-0">
            <v-card elevation="0" class="pa-0">
              <v-card-text>
                <div class="d-flex flex-row justify-space-between align-start">
                  <div>
                    <nuxt-link :to="{name:'by',params:{by:author.uid}}">
                      <v-avatar size="35">
                        <img :src="author.photo.url" :alt="author.displayName" />
                      </v-avatar>
                      <span class="pl-3 d-none d-md-inline-block">{{author.displayName}}</span>
                    </nuxt-link>
                  </div>
                  <div>
                    <p class="text-caption">{{timeAgo}} ago</p>
                  </div>
                </div>
                <markdown-container
                  :content="comment.message"
                  class="text-sm-body-2 text-md-subtitle-1 font-weight-medium pt-3"
                ></markdown-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="comment.by===user.uid"
                  text
                  color="red accent-4"
                  nuxt
                  :to="{name:'by-comment-id-delete',params:{by:comment.by,id:comment.id}}"
                >Delete</v-btn>
                <v-btn
                  v-if="comment.by===user.uid"
                  @click="show_form=!show_form"
                  text
                  color="deep-purple accent-4"
                >Edit</v-btn>
                <v-btn @click="show_form=!show_form" text color="deep-purple accent-4">Reply</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <create-comment
        @commentCanceled="show_form = false"
        @commentCreated="show_form= false"
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
import CommentBox from "@/components/Comment/CommentBox";
import Stack from "@/components/UI/Stack";
import Markdonwn from "@/components/UI/MarkDown";
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
  },
  async fetch() {
    const comment = this.getCommentByID(this.id);
    return fetchUser(comment.by).then((res) => {
      const author = res.data();
      this.comment = comment;
      this.author = author;
    });
  },
  data() {
    return {
      open: true,
      comment: {},
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
    ...mapState({
      user: (state) => state.user.user,
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

<style  scoped>
</style>