<template>
  <div>
    <v-card height="450px" elevation="0" class="bs-border d-flex justify-center align-center">
      <write-fb type="delete" collection="tag" :params="{ id: tagID, fetch: false }">
        <template v-slot="{  writeFB, loading }">
          <div>
            <v-container class="white">
              <v-row v-if="!loading" dense class="text-center">
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <div class="d-flex flex-column justify-center align-center">
                    <div class="my-2">
                      <v-container>
                        <v-row
                          dense
                          class="white pa-6"
                          :style="{boxShadow:`5px 6px 0px ${tag.bg_color.hex}`}"
                        >
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            class="d-flex justify-center align-center"
                          >
                            <div class="d-flex flex-row align-center">
                              <span v-if="!!tag.logo.url" class="pa-4">
                                <v-img width="80px" :src="tag.logo.url"></v-img>
                              </span>
                              <span
                                class="text-h5 text-md-h3 font-weight-medium text-capitalize black--text pa-4"
                              >{{tag.name}}</span>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </div>
                    <div class="my-2 font-weight-medium">
                      <h1 class="text-h5 text-md-h4">Are you sure you want to delete this tag?</h1>
                    </div>
                    <div class="my-2">
                      <v-btn
                        color="red"
                        class="white--text"
                        depressed
                        :loading="deleting"
                        @click="deleteTag(writeFB)"
                      >Delete Tag</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </write-fb>
    </v-card>
  </div>
</template>

<script>
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
import { deleteFile } from "@/services/Firebase/file";
import { isFile } from "@/utils/utils";
import { mapGetters } from "vuex";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware: ["auth", "driver"],
  data() {
    return {
      deleting: false,
    };
  },
  computed: {
    tagID() {
      return this.$route.params.tag;
    },
    ...mapGetters({
      getTagByID: "tag/getTagByID",
    }),
    tag() {
      return this.getTagByID(this.tagID);
    },
  },
  methods: {
    async deleteTag(callback) {
      const tag = { ...this.tag };
      const vm = this;
      vm.deleting = true;
      await callback().then(() => {
        //delete file if only url exists
        if (!tag.logo.url) {
          vm.deleting = false;
          vm.$router.replace({ name: "t" });
        } else {
          return deleteFile({
            folder: "tags",
            id: tag.logo.id,
          }).then(() => {
            vm.deleting = false;
            vm.$router.replace({ name: "t" });
          });
        }
      });
    },
    cancel() {
      this.$router.replace({ name: "t" });
    },
  },
};
</script>

<style></style>
