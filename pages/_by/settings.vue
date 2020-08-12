<template>
  <div>
    <h1>This is {{user.displayName}}'s page</h1>
    <div>
      <write-fb type="update" collection="user" :params="{id:user.uid,data:user,fetch:false}">
        <template v-slot="{writeFB}">
          <div>
            <v-text-field v-model="user.displayName" label="Title"></v-text-field>
            <v-text-field v-model="user.bio" label="Bio"></v-text-field>
            <img :src="user.photo.url" alt />
            <v-file-input
              @change="previewImg"
              v-model="file"
              show-size
              value="any"
              label="File input"
            ></v-file-input>
            <v-btn :loading="updating" @click="update(writeFB)">Update</v-btn>
          </div>
        </template>
      </write-fb>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fileUpload } from "@/services/Firebase/file";
import { previewImg, isEmptyObj } from "@/utils/utils";
import WriteModelFB from "@/components/CRUD_Model/WriteModelFB";
export default {
  components: {
    "write-fb": WriteModelFB,
  },
  middleware:['auth'],
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
      if (!isEmptyObj(this.file)) {
        console.log(this.file);
        fileUpload({
          folder: "users",
          file: this.file,
          id: this.user.photo.id,
          success,
        });
      } else {
        callback();
      }
      //function invocation context of success will be in the fileUpload function
      function success(url) {
        vm.user.photo.url = url;
        vm.updating = false;
        callback();
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