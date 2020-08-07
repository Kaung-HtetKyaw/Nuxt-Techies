<template>
  <v-card outlined>
    <nuxt-link
      :to="{
        name: 'username-article',
        params: { username: article.user.username, article: article.id }
      }"
    >
      <v-sheet
        height="200px"
        :style="{
          backgroundImage: `url(${
            article.cover_image
              ? article.cover_image
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'
          })`
        }"
        class="center-background-img"
      ></v-sheet>
    </nuxt-link>

    <div class="px-6 py-6">
      <v-card-text>
        <nuxt-link
          :to="{
            name: 'username',
            params: { username: article.user.username }
          }"
        >
          <div class="mb-2 d-flex flex-row">
            <v-avatar size="35">
              <img :src="article.user.profile_image" :alt="article.user.name" />
            </v-avatar>
            <div class="d-flex flex-column justify-center px-4 opacity-7">
              <div class="hover-blue">{{ article.user.name }}</div>
              <div class="caption py-1">
                <span>June 16</span>
                <span>(3 hours ago)</span>
              </div>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="{
            name: 'username-article',
            params: { username: article.user.username, article: article.id }
          }"
        >
          <h3 class="mb-2 text-h6">{{ article.title }}</h3>
        </nuxt-link>

        <div class="mb-2">
          <nuxt-link
            v-for="(tag, i) in article.tag_list"
            :key="i"
            class="monospace opacity-7"
            :to="{ name: 't-tag', params: { tag } }"
          >
            <span class="hover-blue">
              <span>#</span>
              {{ tag }}
            </span>
          </nuxt-link>
        </div>
        <div class="mb-2">
          <v-btn text class="opacity-7">
            <v-icon left>mdi-heart-outline</v-icon>
            <span>{{ article.public_reactions_count }}</span>
          </v-btn>
          <v-btn text class="opacity-7">
            <v-icon left>mdi-comment-outline</v-icon>
            <span>{{ article.comments_count }}</span>
          </v-btn>
        </div>
      </v-card-text>
    </div>

    <!-- <v-card-actions>
      <v-btn color="orange" text>Share</v-btn>

      <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>-->
  </v-card>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>
