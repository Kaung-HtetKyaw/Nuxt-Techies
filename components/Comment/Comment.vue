<template>
  <li v-if="comment" class="comment">
    <div class="by">{{ comment.id }}</div>
    <div class="text">{{comment.message}}</div>
    <div class="toggle" :class="{ open }" v-if="comment.kids && comment.kids.length">
      <a @click="open = !open">
        {{
        open ? "[-]" : "[+] " + pluralize(comment.kids.length) + " collapsed"
        }}
      </a>
    </div>
    <create-comment
      type="create"
      collection="comment"
      :params="{data:new_comment,parent:{...comment}}"
    >
      <template v-slot="{writeFB,loading:creatingComment}">
        <div>
          <v-text-field v-model="new_comment.message"></v-text-field>
          <v-btn :loading="creatingComment" @click="createComment(writeFB)">Comment</v-btn>
        </div>
      </template>
    </create-comment>
    <ul class="comment-children" v-show="open">
      <li v-for="id in comment.kids" :key="id">
        <h1>{{id}}</h1>
        <comment :id="id"></comment>
      </li>
    </ul>
  </li>
</template>

<script>
import { fetchComment } from "@/services/Firebase/comment";
import { mapState, mapGetters } from "vuex";
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
    comment: function () {
      console.log("created a comment");
    },
  },
  async fetch() {
    const comment = this.getCommentByID(this.id);
    this.comment = comment;
  },
  data() {
    return {
      new_comment: defaultCommentObjFB(),
      open: true,
      comment: {},
    };
  },
  computed: {
    ...mapGetters({
      getCommentByID: "comment/getCommentByID",
    }),
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    pluralize: (n) => n + (n === 1 ? " reply" : " replies"),
    createComment(writeFB) {
      this.new_comment.by = this.user.uid;
      return writeFB().then(() => {
        this.new_comment = defaultCommentObjFB();
      });
    },
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
