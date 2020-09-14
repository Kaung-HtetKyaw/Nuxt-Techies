<template>
  <transition name="fade">
    <div v-if="!!tags">
      <ShareNetwork
        :network="type"
        :url="url"
        :title="article.title"
        :description="article.description"
        :quote="article.description"
        :hashtags="hashtags"
      >
        <v-btn
          depressed
          :ripple="false"
          :color="network.color"
          class="white--text d-flex justify-space-between align-center"
          x-small
        >
          <v-icon class="px-1" small>{{ network.icon }}</v-icon>
          <span class="px-1">{{ type }}</span>
        </v-btn>
      </ShareNetwork>
    </div>
  </transition>
</template>

<script>
import { tagsHydrated } from "@/mixins/Hydrated";
import { mapGetters } from "vuex";
import { getHashTags } from "@/utils/utils";
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    article: {
      type: Object,
      required: true,
    },
  },
  mixins: [tagsHydrated],
  data() {
    return {
      facebook: {
        color: "#1877f2",
        icon: "mdi-facebook",
      },
      twitter: {
        color: "#08a0e9",
        icon: "mdi-twitter",
      },
      linkedin: {
        color: "#0077b5",
        icon: "mdi-linkedin",
      },
      reddit: {
        color: "#ff4301",
        icon: "mdi-reddit",
      },
    };
  },
  computed: {
    network() {
      return this[this.type];
    },
    url() {
      return process.env.appUrl + "/" + this.$route.fullPath;
    },
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    hashtags() {
      let tags = [];
      if (this.tags.length > 0) {
        tags = this.article.tags.map((id) => this.getTagByID(id));

        return getHashTags(tags);
      }
      return "";
    },
  },
};
</script>

<style></style>
