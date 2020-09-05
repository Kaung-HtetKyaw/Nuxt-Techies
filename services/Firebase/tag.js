import * as firebase from "firebase/app";
import "firebase/firestore";
import { normalizeDataFB, normalizeFetchFB } from "@/utils/fb";

export function fetchAllTags() {
  return firebase
    .firestore()
    .collection("tags")
    .get()
    .then(res => {
      const tags = normalizeDataFB(res.docs, "tag");
      return tags;
    });
}

let fetchMethods = {
  all: fetchAll
};

export async function fetchTagsByType({ params, lvState }) {
  return normalizeFetchFB({ params, lvState }, fetchMethods, "tag", 10);
}
function fetchAll({ param }) {
  return firebase.firestore().collection("tags");
}

export function createTag(params) {
  return firebase
    .firestore()
    .collection("tags")
    .add({ ...params.data })
    .then(res => {
      const tag = normalizeDataFB({ id: res.id, ...params.data }, "tag");
      console.log("normalize", tag);
      return tag;
    });
}

export function updateTag(params) {
  return firebase
    .firestore()
    .collection("tags")
    .doc(params.id)
    .set({ ...params.data });
}

export function deleteTag(id) {
  return firebase
    .firestore()
    .collection("tags")
    .doc(id)
    .delete();
}
