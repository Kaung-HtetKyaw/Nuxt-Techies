import * as firebase from "firebase/app";
import "firebase/firestore";
import articleFactory from "@/utils/factory/articles";

//*Fetch Methods
let limit = 10;

let fetchMethods = {
  all: fetchAll,
  tag: fetchTag,
  user: fetchUser,
  popular: fetchPopular
};

export function fetchArticle(id) {
  return firebase
    .firestore()
    .collection("articles")
    .doc(id)
    .get()
    .then(res => {
      const article = normalizeArticles(res);
      console.log("shit");
      console.log(article);
      return article;
    });
}
export function fetchArticlesByID(ids) {
  return Promise.all(ids.map(id => fetchArticle(id)));
}
export async function fetchArticlesByType({ params, lvState }) {
  return normalizeFetch({ params, lvState });
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
export function fetchUser({ param }) {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .where("by", "==", param);
}

export function normalizeArticles(articles) {
  if (Array.isArray(articles)) {
    let arr = [];
    articles.forEach(article => {
      let article_obj = articleFactory.createArticle({ data: article });
      arr.push({ ...article_obj });
    });
    return arr;
  }

  const article = articleFactory.createArticle({ data: articles });
  return article;
}

function normalizeFetch({ params, lvState }) {
  if (lvState) {
    return fetchMethods[params.type]({ param: params.param })
      .startAfter(lvState)
      .limit(limit)
      .get();
  }
  return fetchMethods[params.type]({ param: params.param })
    .limit(limit)
    .get();
}

//*Create Methods

export function createArticle(params) {
  return firebase
    .firestore()
    .collection("articles")
    .add({ ...params.data });
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
