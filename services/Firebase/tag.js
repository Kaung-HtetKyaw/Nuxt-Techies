import * as firebase from "firebase/app";
import "firebase/firestore";
import tagFactory from "@/utils/factory/tag";

export function fetchAllTags() {
  return firebase
    .firestore()
    .collection("tags")
    .get();
}

export function normalizeTag(tags) {
  if (Array.isArray(tags)) {
    let arr = [];
    tags.forEach(tag => {
      let tag_obj = tagFactory.createArticle({ data: tag });
      arr.push({ ...tag_obj });
    });
    return arr;
  }

  const tag = tagFactory.createArticle({ data: tags });
  return tag;
}
