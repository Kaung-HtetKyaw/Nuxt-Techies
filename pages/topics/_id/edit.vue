<template>
  <div>
    <create-topic type="update" collection="topic" :params="{data:topic,id:topicID,fetch:false}">
      <template v-slot="{writeFB}">
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="12" md="8" offset-md="2" class="white pa-4 pa-md-8 bs-border">
              <div>
                <div class="text-h6 text-md-h4 text-center font-weight-medium">
                  <span>Update a Topic</span>
                </div>
                <div class="pa-4">
                  <div>
                    <v-text-field outlined v-model="topic.name" label="Name"></v-text-field>
                  </div>
                  <div>
                    <v-textarea outlined v-model="topic.about.description" label="Description"></v-textarea>
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
                      >Add a Cover image</span>
                    </div>
                    <img :src="topic.cover.url" :alt="topic.name" />
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
                :loading="updating"
                class="white--text"
                @click="updateTopic(writeFB)"
              >Update a Topic</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </create-topic>
  </div>
</template>

<script>
import WriteModelCrudFB from "@/components/CRUD_Model/WriteModelFB";
import { defaultTopicObjFB } from "@/utils/constants";
import { uniqueId, isFile, previewImg } from "@/utils/utils";
import { fileUpload } from "@/services/Firebase/file";
import { mapState, mapGetters } from "vuex";
export default {
  middleware: ["auth"],
  layout: "form",
  components: {
    "create-topic": WriteModelCrudFB,
  },
  data() {
    return {
      topic: defaultTopicObjFB(),
      file: {},
      updating: false,
    };
  },
  created() {
    this.topic = { ...this.getTopicByID(this.topicID) };
  },
  methods: {
    updateTopic(callback) {
      let vm = this;
      this.updating = true;
      //update the image only when user update it
      if (isFile(this.file)) {
        console.log(this.file);
        fileUpload({
          folder: "topics",
          file: this.file,
          id: this.topic.cover.id,
          success,
        });
      } else {
        return callback()
          .then((res) => {
            vm.$router.replace({ name: "topics-id", params: { id: res.id } });
          })
          .catch((e) => console.log(e));
      }
      //function invocation context of success will be in the fileUpload function
      function success(url) {
        vm.topic.cover.url = url;
        vm.updating = false;
        return callback()
          .then((res) => {
            vm.$router.replace({ name: "topics-id", params: { id: res.id } });
          })
          .catch((e) => console.log(e));
      }
    },
    previewImg(file) {
      if (file) {
        let vm = this;
        previewImg(file, callback);
        function callback(preview) {
          vm.topic.cover.url = preview;
        }
      }
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    ...mapGetters({
      getTopicByID: "topic/getTopicByID",
    }),
    topicID() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>