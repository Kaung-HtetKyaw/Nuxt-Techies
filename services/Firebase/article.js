import * as firebase from "firebase/app";
import "firebase/firestore";
import articleFactory from "@/utils/factory/articles";
import { normalizeDataFB, normalizeFetchFB } from "@/utils/fb";

//*Fetch Methods
let limit = 10;

let fetchMethods = {
  all: fetchAll,
  tag: fetchTag,
  user: fetchUser,
  popular: fetchPopular,
  topic: fetchTopic
};

export function fetchArticle(id) {
  return firebase
    .firestore()
    .collection("articles")
    .doc(id)
    .get()
    .then(res => {
      const article = normalizeDataFB(res, "article");
      return article;
    });
}
export function fetchArticlesByID(ids) {
  return Promise.all(ids.map(id => fetchArticle(id)));
}
export async function fetchArticlesByType({ params, lvState }) {
  return normalizeFetchFB({ params, lvState }, fetchMethods, "article", 10);
}

export function fetchArticlesByLimit(limit) {
  return firebase
    .firestore()
    .collection("articles")
    .limit(limit)
    .get()
    .then(res => {
      const article = normalizeDataFB(res.docs, "article");
      return article;
    });
}

export function fetchAll({ param }) {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc");
}
export function fetchPopular() {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .orderBy("likesNo", "desc");
}

export function fetchTag({ param }) {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .where("tags", "array-contains", param);
}
export function fetchTags(tags) {
  return firebase
    .firestore()
    .collection("articles")
    .where("tags", "array-contains-any", tags)
    .get()
    .then(response => {
      const article = normalizeDataFB(response.docs, "article");
      return article;
    });
}
export function fetchUser({ param }) {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .where("by", "==", param);
}

export function fetchTopic({ param }) {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .where("topics", "==", param);
}

//*Create Methods

export function createArticle(params) {
  return firebase
    .firestore()
    .collection("articles")
    .add({ ...params.data })
    .then(res => {
      const article = normalizeDataFB(
        { id: res.id, ...params.data },
        "article"
      );
      return article;
    });
}

//*Update Methods
export function updateArticle(params) {
  return firebase
    .firestore()
    .collection("articles")
    .doc(params.id)
    .set({ ...params.data });
}

//*Delete Methods
export function deleteArticle(id) {
  return firebase
    .firestore()
    .collection("articles")
    .doc(id)
    .delete();
}

export function deleteArticles(ids) {
  return Promise.all(ids.map(id => deleteArticle(id)));
}
