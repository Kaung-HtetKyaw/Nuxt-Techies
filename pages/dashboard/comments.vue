<template>
  <div>
    <comment-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{comments,lazyLoadComments,loading,empty}">
        <div>
          <div>
            <comment
              v-for="(comment,i) in comments"
              :key="comment.id"
              :id="comment.id"
              v-observe-visibility="
                              i === comments.length - 1
                                ? lazyLoadComments
                                : false
                            "
            ></comment>
            <div v-if="loading" class="d-flex justify-center align-center">
              <v-progress-circular indeterminate color="purple"></v-progress-circular>
            </div>
            <div v-if="empty" class="d-flex justify-center align-center my-2">
              <empty-alert></empty-alert>
            </div>
          </div>
        </div>
      </template>
    </comment-list>
  </div>
</template>

<script>
import CommentListModel from "@/components/CRUD_Model/CommentListModel";
import Comment from "@/components/Comment/Comment";
import EmptyAlert from "@/components/Alert/EmptyAlert";
export default {
  layout: "dashboard",
  middleware: ["auth", "driver"],
  components: {
    "comment-list": CommentListModel,
    comment: Comment,
    "empty-alert": EmptyAlert,
  },
};
</script>

<style>
</style>