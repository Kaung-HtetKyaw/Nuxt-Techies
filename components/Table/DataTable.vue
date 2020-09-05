<template>
  <div>
    <v-data-table
      v-if="loading"
      :headers="headers"
      :loading="loading"
      loading-text="Loading....Please wait"
      class="elevation-1"
    ></v-data-table>
    <v-data-table
      v-else
      :headers="headers"
      :items="dataItems"
      :items-per-page="itemsPerPage"
      item-key="id"
      :loading="loading"
      loading-text="Loading....Please wait"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import {
  dataItemArticles,
  dataItemUsers,
  dataItemComments,
  dataItemReports,
  dataItemTags,
} from "@/utils/utils";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    type: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
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
        case "comments":
          dataItems = dataItemComments(this.data);
          break;
        case "reports":
          dataItems = dataItemReports(this.data);
          break;
        case "tags":
          dataItems = dataItemTags(this.data);
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
        case "comments":
          headers = commentHeaders;
          break;
        case "reports":
          headers = reportHeaders;
          break;
        case "tags":
          headers = tagHeaders;
          break;
      }
      return headers;
    },
  },
};
const articleHeaders = [
  {
    text: "Articles",
    align: "start",
    sortable: true,
    value: "id",
  },
  { text: "by", value: "by" },
  { text: "comments", value: "kids" },
  { text: "created", value: "created" },
];
const userHeaders = [
  {
    text: "Users",
    align: "start",
    sortable: true,
    value: "displayName",
  },
  { text: "ID", value: "uid" },
  { text: "Followers", value: "followers" },
  { text: "Following", value: "following" },
  { text: "Joined at", value: "joined_at" },
];
const commentHeaders = [
  {
    text: "Comments",
    align: "start",
    sortable: true,
    value: "id",
  },
  { text: "By", value: "by" },
  { text: "Replies", value: "kids" },
  { text: "Likes", value: "likes" },
  { text: "Created", value: "created" },
];
const reportHeaders = [
  {
    text: "Reports",
    align: "start",
    sortable: true,
    value: "id",
  },
  { text: "By", value: "by" },
  { text: "Reported Item", value: "reported_item" },
  { text: "Reported Type", value: "reported_type" },
  { text: "Created", value: "timestamp" },
];
const tagHeaders = [
  {
    text: "Tags",
    align: "start",
    sortable: true,
    value: "id",
  },
  { text: "Text Color", value: "text_color" },
  { text: "Bg Color", value: "bg_color" },
];
</script>
