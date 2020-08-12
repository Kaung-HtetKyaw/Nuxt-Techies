<template>
  <div>
    <h1>Comment</h1>
    <h1 v-if="$fetchState.pending">#Loading....</h1>
    <div v-else>
      <div v-if="comment.kids.length > 0">
        <comment v-for="id in comment.kids" :key="id" :id="id" />
      </div>
      <div v-else>
        <p>No comment...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchComment } from "@/services/Firebase/comment";
export default {
  name: "comment",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: null
    };
  },
  async fetch() {
    const comment = await fetchComment(this.id);
    this.comment = comment;
    console.log("comment.id", comment.id);
    console.log("has kids", this.comment.kids.length !== 0);
  }
};
</script>

<style></style>
