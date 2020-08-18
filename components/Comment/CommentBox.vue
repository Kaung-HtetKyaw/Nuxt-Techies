<template>
  <v-container class="white">
    <v-row dense>
      <v-col cols="12" sm="12">
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
                  <v-form v-model="valid" v-if="!!user">
                    <v-textarea placeholder="Add a comment" outlined v-model="new_comment.message"></v-textarea>
                    <div class="d-flex justify-sm-center align-center">
                      <v-btn text color="purple" @click="cancel">Cancel</v-btn>
                      <v-btn
                        text
                        color="purple"
                        :loading="creatingComment"
                        @click="createComment(writeFB)"
                      >Submit</v-btn>
                    </div>
                  </v-form>
                </div>
              </template>
            </create-comment>
          </transition>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { mapState } from "vuex";
import { defaultCommentObjFB } from "@/utils/constants";
import { authHydrated } from "@/mixins/authHydrated";
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
  mixins: [authHydrated],
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
