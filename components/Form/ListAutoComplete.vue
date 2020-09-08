<template>
  <div>
    <v-form>
      <v-flex xs12>
        <v-autocomplete
          v-model="searchString"
          :items="items"
          solo
          chips
          color="orange"
          label="Search"
          :item-text="value"
          :item-value="value"
          multiple
          clearable
          append-icon="search"
          :open-on-click="false"
        >
          <template slot="no-data">
            <slot name="noData"></slot>
            <!-- <v-list-tile>
                    <v-list-tile-title>
                      Search for your favorite
                      <strong>Product</strong>
                    </v-list-tile-title>
            </v-list-tile>-->
          </template>

          <template slot="item" slot-scope="data">
            <slot name="layout" v-bind:item="data.item"></slot>
          </template>
        </v-autocomplete>
      </v-flex>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchString: "",
    };
  },
};
</script>

<style>
</style>