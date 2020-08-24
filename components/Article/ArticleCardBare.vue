<template>
  <v-card class="article-card-block bs-border my-2" outlined>
    <div class="px-6 py-3">
      <v-card-text>
        <div>
          <div v-if="isEmptyObj">
            <transition name="fade" mode="out-in">
              <div class="mb-2 d-flex flex-row">
                <div class="d-flex flex-column justify-center px-4 opacity-7">
                  <div class="hover-blue">Loading...</div>
                  <div class="caption py-1"></div>
                </div>
              </div>
            </transition>
          </div>
          <div v-else>
            <transition name="fade" mode="out-in">
              <nuxt-link
                :to="{
                  name: 'by',
                  params: { by: article.by }
                }"
              >
                <div class="mb-2 d-flex flex-row">
                  <div class="d-flex flex-column justify-center opacity-7">
                    <div class="hover-blue font-weight-medium">{{ author.displayName }}</div>
                    <div class="caption py-1 black--text">
                      <span>({{ timeAgo }} ago)</span>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </transition>
          </div>
        </div>
        <div class="my-4">
          <tag-slider :tags="article.tags" />
        </div>
        <nuxt-link
          :to="{
            name: 'by-id',
            params: { by: article.by, id: article.id }
          }"
        >
          <h3 class="mb-2 text-h6">{{ article.title }}</h3>
        </nuxt-link>
      </v-card-text>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { fetchUser } from "@/services/Firebase/userAuth";
import { isEmptyObj, timeAgo } from "@/utils/utils";
import { defaultUserObjFB } from "@/utils/constants";
import { authHydrated } from "@/mixins/Hydrated";
import LikeBtnFB from "@/components/Button/LikeBtnFB";
import TagSlider from "@/components/UI/TagSlider";
import SaveBtn from "@/components/Button/SaveArticleModelFB";
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {
    "like-btn": LikeBtnFB,
    "tag-slider": TagSlider,
    "save-btn": SaveBtn,
  },
  mixins: [authHydrated],
  data() {
    return {
      author: {},
      defaultUserObjFB,
    };
  },
  async fetch() {
    return fetchUser(this.article.by)
      .then((res) => {
        this.author = res.data();
      })
      .catch((e) => console.log(e));
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    isEmptyObj() {
      return isEmptyObj(this.author);
    },
    timeAgo() {
      return timeAgo(this.article.timestamp);
    },
  },
};
</script>
