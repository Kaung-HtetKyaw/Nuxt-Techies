<template>
  <div>
    <create-tag type="create" collection="tag" :params="{data:tag}">
      <template v-slot="{writeFB}">
        <v-container>
          <v-row dense v-if="!valid">
            <v-col cols="12" sm="12">
              <v-alert border="left" color="red " dark>Topic name can't be empty</v-alert>
            </v-col>
          </v-row>
          <v-row else dense>
            <v-col cols="12" sm="12" md="8" offset-md="2" class="white pa-1 pa-md-8 bs-border">
              <div>
                <div class="text-h6 text-md-h4 text-center font-weight-medium">
                  <span>Create a Tag</span>
                </div>
                <div class="pa-4">
                  <div>
                    <v-text-field outlined v-model="tag.name" label="Name"></v-text-field>
                  </div>
                  <div>
                    <v-textarea outlined v-model="tag.description" label="Description"></v-textarea>
                  </div>
                  <div>
                    <div class="d-flex align-center px-2 mb-8">
                      <v-btn
                        elevation="0"
                        color="grey lighten-1"
                        class="white--text"
                        :ripple="false"
                      >
                        <v-file-input
                          show-size
                          value="any"
                          label="Choose a file"
                          hide-input
                          v-model="file"
                          @change="previewImg"
                          class="pa-0 ma-0 white--text"
                        ></v-file-input>
                      </v-btn>
                      <span
                        class="text-sm-subtitle-2 text-md-h6 grey--text lighten-1 ml-3"
                      >Add a Logo image</span>
                    </div>
                    <img :src="tag.logo.url" />
                  </div>
                  <div class="full-width d-flex flex-column justify-center align-center">
                    <h1
                      class="text-h6 text-md-h4 text-center font-weight-medium my-4"
                    >Select Logo Text Color</h1>
                    <color-picker @colorPick="setTextColor"></color-picker>
                  </div>
                  <div class="full-width d-flex flex-column justify-center align-center">
                    <h1
                      class="text-h6 text-md-h4 text-center font-weight-medium my-4"
                    >Select Logo Background Color</h1>
                    <color-picker @colorPick="setBackgroundColor"></color-picker>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="12" md="8" offset-md="2" class="white pa-4 pa-md-8 my-4 bs-border">
              <v-btn
                depressed
                color="purple"
                :loading="creating"
                class="white--text"
                @click="createTag(writeFB)"
              >Create a Tag</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </create-tag>
  </div>
</template>

<script>
import WriteModelCrudFB from "@/components/CRUD_Model/WriteModelFB";
import ColorPicker from "@/components/Picker/colorPicker";
import { defaultTagObjFB } from "@/utils/constants";
import { uniqueId, isFile, previewImg } from "@/utils/utils";
import { fileUpload } from "@/services/Firebase/file";
import { mapState } from "vuex";
export default {
  middleware: ["auth", "driver"],
  layout: "form",
  components: {
    "create-tag": WriteModelCrudFB,
    "color-picker": ColorPicker,
  },
  data() {
    return {
      tag: defaultTagObjFB(),
      file: {},
      creating: false,
      valid: true,
    };
  },

  methods: {
    createTag(callback) {
      let vm = this;
      vm.creating = true;
      vm.valid = true;
      //terminate if title is empty
      if (!vm.tag.name) {
        vm.valid = false;
        vm.creating = false;
        return;
      }
      //update the image only when user update it
      if (isFile(this.file)) {
        fileUpload({
          folder: "tags",
          file: this.file,
          id: this.tag.logo.id,
          success,
        });
      } else {
        return callback()
          .then((res) => {
            vm.$router.push({ name: "t-tag", params: { tag: res.id } });
          })
          .catch((e) => console.log(e));
      }
      //function invocation context of success will be in the fileUpload function
      function success(url) {
        vm.tag.logo.url = url;
        vm.creating = false;
        return callback()
          .then((res) => {
            vm.$router.push({ name: "t-tag", params: { tag: res.id } });
          })
          .catch((e) => console.log(e));
      }
    },
    previewImg(file) {
      if (file) {
        let vm = this;
        previewImg(file, callback);
        function callback(preview) {
          vm.tag.logo.url = preview;
        }
      }
    },
    setTextColor(color) {
      this.tag.text_color = color;
    },
    setBackgroundColor(color) {
      this.tag.bg_color = color;
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