import * as firebase from "firebase/app";
import "firebase/firestore";
import commentFactory from "@/utils/factory/comment";

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
      console.log(comment);
      return comment;
    });
}
export function fetchComments(ids) {
  return Promise.all(ids.map(id => fetchComment(id)));
}
export function createComment(comment) {
  return firebase
    .firestore()
    .collection("comments")
    .add({ ...comment });
}
export function updateComment({ id, comment }) {
  return firebase
    .firestore()
    .collection("comments")
    .doc(id)
    .set({ ...comment });
}

export function deleteComment(id) {
  return firebase
    .firestore()
    .collection("comments")
    .doc(id)
    .delete();
}
