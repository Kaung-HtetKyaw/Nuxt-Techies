<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>time ago
    </div>
    <div class="text">{{comment.message}}</div>
    <div class="toggle" :class="{ open }" v-if="comment.kids && comment.kids.length">
      <a @click="open = !open">
        {{
        open ? "[-]" : "[+] " + pluralize(comment.kids.length) + " collapsed"
        }}
      </a>
    </div>
    <create-comment type="create" collection="comment" :params="{data:new_comment,parent:comment}">
      <template v-slot="{writeFB,creatingComment}">
        <div>
          <v-text-field v-model="new_comment.message"></v-text-field>
          <v-btn :loading="creatingComment" @click="writeFB">Comment</v-btn>
        </div>
      </template>
    </create-comment>
    <ul class="comment-children" v-show="open">
      <comment v-for="id in comment.kids" :key="id" :id="id"></comment>
    </ul>
  </li>
</template>

<script>
import { fetchComment } from "@/services/Firebase/comment";
import { mapState } from "vuex";
import { defaultCommentObjFB } from "@/utils/constants";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  name: "comment",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    "create-comment": WriteModelFB,
  },
  watch: {
    "comment.kids": function (v1, v2) {
      console.log("new", v1);
      console.log("old", v2);
    },
  },
  created() {
    this.new_comment.by = this.user.uid;
  },
  data() {
    return {
      new_comment: defaultCommentObjFB(),
      open: true,
    };
  },
  computed: {
    comment() {
      return this.$store.state.comment.comments[this.id];
    },
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    pluralize: (n) => n + (n === 1 ? " reply" : " replies"),
  },
};
</script>

<style>
.comment-children .comment-children {
  margin-left: 1.5em;
}
.comment {
  border-top: 1px solid #eee;
  position: relative;
}
.comment .by,
.comment .text,
.comment .toggle {
  font-size: 0.9em;
  margin: 1em 0;
}
.comment .by {
  color: #828282;
}
.comment .by a {
  color: #828282;
  text-decoration: underline;
}
.comment .text {
  overflow-wrap: break-word;
}
.comment .text a:hover {
  color: #f60;
}
.comment .text pre {
  white-space: pre-wrap;
}
.comment .toggle {
  background-color: #fffbf2;
  padding: 0.3em 0.5em;
  border-radius: 4px;
}
.comment .toggle a {
  color: #828282;
  cursor: pointer;
}
.comment .toggle.open {
  padding: 0;
  background-color: transparent;
  margin-bottom: -0.5em;
}
</style>
