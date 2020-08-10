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
  methods: {
    remove(item) {
      const index = this.selected.indexOf(item.id);
      if (index >= 0) this.selected.splice(index, 1);
    },
  },
};
</script>