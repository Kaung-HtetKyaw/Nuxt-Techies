<template>
  <div class="py-2">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="1" class="d-flex justify-center">
          <nuxt-link :to="{name:'by',params:{by:article.by}}">
            <v-avatar size="40" v-if="isEmptyAuthor">
              <img :src="defaultUserObjFB.photo.url" :alt="defaultUserObjFB.displayName" />
            </v-avatar>
            <v-avatar size="40" v-else>
              <img :src="author.photo.url" :alt="author.displayName" />
            </v-avatar>
          </nuxt-link>
        </v-col>
        <v-col cols="12" sm="12" md="11">
          <div class="d-flex flex-column justify-center align-center align-md-start">
            <nuxt-link :to="{name:'by-id',params:{by:article.by,id:article.id}}">
              <p class="text-h5 font-weight-bold my-0 py-1">{{article.title}}</p>
            </nuxt-link>

            <div class="text--secondary">
              <nuxt-link :to="{name:'by',params:{by:article.by}}">
                <span class="text-body-2">{{author.displayName}}</span>
              </nuxt-link>

              <span>-</span>
              <span class="text-body-2">{{timeAgo}} ago</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
  mixins: [authHydrated],
  data() {
    return {
      author: {},
      defaultUserObjFB,
    };
  },
  async fetch() {
    return fetchUser(this.article.by)
      .then((user) => {
        this.author = user;
      })
      .catch((e) => console.log(e));
  },
  computed: {
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    isEmptyAuthor() {
      return isEmptyObj(this.author);
    },
    timeAgo() {
      return timeAgo(this.article.timestamp);
    },
  },
};
</script>
