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
      const comment = commentFactory.createComment({
        data: { id: res.id, ...commentData }
      });
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
      const comment = commentFactory.createComment({ data: params.data });
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
