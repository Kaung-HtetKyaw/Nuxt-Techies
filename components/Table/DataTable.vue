<template>
  <v-data-table
    :headers="headers"
    :items="dataItems"
    :items-per-page="itemsPerPage"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <h1 class="text-center text-h6 text-md-h3">Articles</h1>
    </template>
  </v-data-table>
</template>

<script>
import { dataItemArticles, dataItemUsers } from "@/utils/utils";
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      expanded: [],
      singleExpand: false
    };
  },
  computed: {
    dataItems() {
      let dataItems = [];
      switch (this.type) {
        case "articles":
          dataItems = dataItemArticles(this.data);
          break;
        case "users":
          dataItems = dataItemUsers(this.data);
          break;
      }
      return dataItems;
    },
    headers() {
      let headers = [];
      switch (this.type) {
        case "articles":
          headers = articleHeaders;
          break;
        case "users":
          headers = userHeaders;
          break;
      }
      return headers;
    }
  }
};
const articleHeaders = [
  {
    text: "Articles",
    align: "start",
    sortable: true,
    value: "id"
  },
  { text: "by", value: "by" },
  { text: "comments", value: "kids" },
  { text: "created", value: "created" }
];
const userHeaders = [
  {
    text: "Users",
    align: "start",
    sortable: true,
    value: "displayName"
  },
  { text: "ID", value: "id" },
  { text: "Followers", value: "followers" },
  { text: "Following", value: "following" },
  { text: "Joined at", value: "joined_at" }
];
</script>
