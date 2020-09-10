<template>
  <div>
    <h1>This is admin article page</h1>
    <comment-list :lazy="true" :params="{type:'all'}">
      <template v-slot="{comments,lazyLoadComments,loading,empty}">
        <div>
          <h1 v-if="loading">#Loading.....</h1>
          <div v-else>
            <h1 v-for="comment in comments" :key="comment.id">{{comment.message}}</h1>
            <v-btn @click="lazyLoadComments">Load More</v-btn>
            <h1 v-if="empty">#Empty</h1>
          </div>
        </div>
      </template>
    </comment-list>
  </div>
</template>

<script>
import CommentListModel from "@/components/CRUD_Model/CommentListModel";
export default {
  layout: "dashboard",
  middleware: ["auth", "driver"],
  components: {
    "comment-list": CommentListModel,
  },
};
</script>

<style>
</style>