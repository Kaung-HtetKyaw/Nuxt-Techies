<template>
  <div>
    <div>
      <write-fb type="update" collection="user" :params="{id:user.uid,data:user,fetch:false}">
        <template v-slot="{writeFB}">
          <div>
            <v-container>
              <v-row dense class="mb-4">
                <v-col cols="12" sm="12" class="text-center">
                  <div class="text-h6 text-md-h4 font-weight-medium">
                    <span>Settings for</span>
                    <span class="purple--text">{{user.displayName}}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" sm="12" md="8" offset-md="2" class="white pa-4 pa-md-8 bs-border">
                  <div>
                    <v-text-field outlined v-model="user.displayName" label="Name"></v-text-field>
                    <v-text-field outlined v-model="user.bio" label="Bio"></v-text-field>
                    <div>
                      <p>Profile Image</p>
                      <v-avatar size="50">
                        <img :src="user.photo.url" :alt="user.displayName" />
                      </v-avatar>
                      <v-btn
                        small
                        elevation="0"
                        color="grey lighten-1 ml-2"
                        class="white--text"
                        :ripple="false"
                      >
                        <v-file-input
                          show-size
                          value="any"
                          label="Choose a file"
                          hide-input
                          class="pa-0 ma-0 white--text"
                          @change="previewImg"
                          v-model="file"
                        ></v-file-input>
                        <span>Choose a file</span>
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                  offset-md="2"
                  class="white pa-4 pa-md-8 my-4 bs-border"
                >
                  <div class="mb-4">
                    <h3 class="text-h6 text-md-h5 font-weight-medium">Links</h3>
                  </div>
                  <div>
                    <v-text-field
                      outlined
                      v-model="user.profile_url.facebook"
                      label="Facebook profile URL"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      v-model="user.profile_url.github"
                      label="Github profile URL"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      v-model="user.profile_url.twitter"
                      label="Twitter profile URL"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      v-model="user.profile_url.stackoverflow"
                      label="Stackoverflow profile URL"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      v-model="user.profile_url.instagram"
                      label="Instagram profile URL"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" sm="12" md="8" offset-md="2" class="white pa-4 pa-md-8 my-4">
                  <v-btn
                    depressed
                    color="purple"
                    class="white--text"
                    :loading="updating"
                    @click="update(writeFB)"
                  >Update</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </write-fb>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fileUpload } from "@/services/Firebase/file";
import { previewImg, isEmptyObj, isFile } from "@/utils/utils";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware: ["auth"],
  data() {
    return {
      file: {},
      updating: false,
    };
  },
  methods: {
    update(callback) {
      let vm = this;
      this.updating = true;
      //update the image only when user update it
      if (isFile(this.file)) {
        console.log(this.file);
        fileUpload({
          folder: "users",
          file: this.file,
          id: this.user.uid,
          success,
        });
      } else {
        return callback()
          .then(() => {
            vm.$router.push({ name: "by", params: { by: vm.user.uid } });
          })
          .catch((e) => console.log(e));
      }
      //function invocation context of success will be in the fileUpload function
      function success(url) {
        vm.user.photo.url = url;
        vm.user.photo.id = vm.user.uid;
        vm.updating = false;
        return callback()
          .then(() => {
            vm.$router.push({ name: "by", params: { by: vm.user.uid } });
          })
          .catch((e) => console.log(e));
      }
    },
    cancel() {
      this.$router.push({ name: "by", params: { by: this.user.uid } });
    },
    previewImg(file) {
      if (file) {
        let vm = this;
        previewImg(file, callback);
        function callback(preview) {
          vm.user.photo.url = preview;
        }
      }
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style>
</style>