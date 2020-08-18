<template>
  <div>
    <transition name="vertical" mode="out-in">
      <create-comment
        v-if="show"
        type="create"
        collection="comment"
        :params="{ data: new_comment, parent }"
      >
        <template v-slot="{ writeFB, loading: creatingComment }">
          <div>
            <v-form v-model="valid">
              <v-textarea placeholder="Add a comment" outlined v-model="new_comment.message"></v-textarea>
              <v-btn :loading="creatingComment" @click="createComment(writeFB)">Submit</v-btn>
              <v-btn @click="cancel">Cancel</v-btn>
            </v-form>
          </div>
        </template>
      </create-comment>
    </transition>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { mapState } from "vuex";
import { defaultCommentObjFB } from "@/utils/constants";
export default {
  props: {
    parent: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    "create-comment": WriteModelFB,
  },
  data() {
    return {
      new_comment: defaultCommentObjFB(),
      comment: {},
      valid: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    createComment(writeFB) {
      this.new_comment.by = this.user.uid;
      return writeFB().then(() => {
        this.new_comment = defaultCommentObjFB();
        this.$emit("commentCreated");
      });
    },
    cancel() {
      this.new_comment = defaultCommentObjFB();
      this.$emit("commentCanceled");
    },
  },
};
</script>

<style></style>
