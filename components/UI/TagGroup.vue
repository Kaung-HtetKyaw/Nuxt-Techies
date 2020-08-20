<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="tags.length===0" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </div>
      <div v-else>
        <h5 class="pa-3 text-subtitle-1 font-weight-medium text-uppercase">Tags</h5>
        <transition-group name="list" tag="div">
          <v-list-item
            class="hover-blue"
            v-for="tag in tags"
            :key="tag.id"
            :to="{name:'t-tag',params:{tag:tag.id}}"
            router
            exact
          >
            <v-btn block text :color="tag.bg_color" class="px-0">
              <v-list-item-content class="pa-0">
                <v-list-item-title class="text-capitalize text-left">#{{ tag.name }}</v-list-item-title>
              </v-list-item-content>
            </v-btn>
          </v-list-item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tag.tags,
    }),
  },
};
</script>

<style>
</style>