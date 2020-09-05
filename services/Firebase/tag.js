import * as firebase from "firebase/app";
import "firebase/firestore";
import tagFactory from "@/utils/factory/tag";
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
const limit = 10;
export async function fetchTagsByType({ params, lvState }) {
  return normalizeFetchFB({ params, lvState }, fetchMethods, "tag", 10);
}
function fetchAll({ param }) {
  return firebase.firestore().collection("tags");
}
