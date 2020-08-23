<template>
  <div class="white rounded full-height">
    <v-card
      class="mx-auto full-height rounded pa-4"
      :style="{borderTop:`10px solid ${tag.bg_color}`}"
      outlined
    >
      <v-list-item>
        <v-list-item-content>
          <nuxt-link class="hover-blue" :to="{name:'t-tag',params:{tag:tag.id}}">
            <p class="text-subtitle-1 font-weight-black mb-4">#{{tag.name}}</p>
          </nuxt-link>
          <p class="text-body-1 p-line-height">{{tag.description}}</p>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed :color="tag.bg_color" :style="{color:`${tag.text_color}`}">Follow</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>