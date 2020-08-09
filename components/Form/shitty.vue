<template>
  <v-card color="blue-grey darken-1" dark>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="selected"
              :items="tags"
              filled
              chips
              deletable-chips
              color="blue-grey lighten-2"
              label="Select"
              item-value="id"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :style="{backgroundColor:`${data.item.bg_color}`,color:`${data.item.text_color}`}"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >{{ data.item.name }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState({
      tags: (state) => state.tag.tags,
    }),
  },
  watch: {
    selected: function (newVal, oldVal) {
      this.$emit("tagSelect", newVal);
    },
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.id);
      if (index >= 0) this.friends.splice(index, 1);
    },
  },
};
</script>