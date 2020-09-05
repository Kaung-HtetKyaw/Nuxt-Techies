import * as firebase from "firebase/app";
import "firebase/firestore";
import commentFactory from "@/utils/factory/comment";
import { normalizeDataFB, normalizeFetchFB } from "@/utils/fb";

let fetchMethods = {
  all: fetchAll,
  user: fetchUser
};
const limit = 10;
export async function fetchCommentsByType({ params, lvState }) {
  return normalizeFetchFB({ params, lvState }, fetchMethods, "comment", 10);
}
function fetchAll({ param }) {
  return firebase
    .firestore()
    .collection("comments")
    .orderBy("timestamp", "desc");
}

export function fetchUser({ param }) {
  return firebase
    .firestore()
    .collection("articles")
    .orderBy("timestamp", "desc")
    .where("by", "==", param);
}

export function fetchComment(id) {
  return firebase
    .firestore()
    .collection("comments")
    .doc(id)
    .get()
    .then(response => {
      const comment = commentFactory.createComment({
        data: response
      });
      return comment;
    });
}
export function fetchComments(ids) {
  return Promise.all(ids.map(id => fetchComment(id)));
}
export function createComment(commentData) {
  return firebase
    .firestore()
    .collection("comments")
    .add({ ...commentData })
    .then(res => {
      const comment = normalizeDataFB(
        { id: res.id, ...commentData },
        "comment"
      );

      return comment;
    });
}
export function updateComment(params) {
  return firebase
    .firestore()
    .collection("comments")
    .doc(params.id)
    .set({ ...params.data })
    .then(() => {
      const comment = normalizeDataFB({ ...params.data }, "comment");
      return comment;
    })
    .catch(e => console.log(e));
}

export function deleteComment(id) {
  return firebase
    .firestore()
    .collection("comments")
    .doc(id)
    .delete();
}

export function deleteComments(ids) {
  return Promise.all(ids.map(id => deleteComment(id)));
}
