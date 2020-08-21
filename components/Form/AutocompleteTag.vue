<template>
  <v-autocomplete
    v-model="selected"
    :items="tags"
    solo
    chips
    deletable-chips
    color="grey lighten-1"
    label="Add up to 4 tags"
    item-value="id"
    item-text="name"
    multiple
    height="50px"
    class="text-subtitle-2 text-md-h6"
    @change="$emit('input',selected)"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
        :style="{backgroundColor:`${data.item.bg_color}`,color:`${data.item.text_color}`}"
      >{{ data.item.name }}</v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content
          class="bs-border"
          :style="{backgroundColor:`${data.item.bg_color}`,color:`${data.item.text_color}`}"
        >
          <v-list-item-title class="d-flex justify-center align-center" v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    article_tags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  created() {
    this.selected = [...this.article_tags];
  },

  computed: {
    ...mapState({
      tags: (state) => state.tag.tags,
    }),
  },
  methods: {
    remove(item) {
      const index = this.selected.indexOf(item.id);
      if (index >= 0) this.selected.splice(index, 1);
    },
  },
};
</script>

<style>
.box-shadow {
  box-shadow: 4px 4px 0px #111;
  border: 2px solid #111;
}
</style>