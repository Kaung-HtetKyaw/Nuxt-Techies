import * as firebase from "firebase/app";
import "firebase/firestore";
import commentFactory from "@/utils/factory/comment";

let fetchMethods = {
  all: fetchAll,
  user: fetchUser
};
const limit = 10;
export async function fetchCommentsByType({ params, lvState }) {
  return normalizeFetch({ params, lvState });
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

function normalizeFetch({ params, lvState }) {
  if (lvState) {
    return fetchMethods[params.type]({ param: params.param })
      .startAfter(lvState)
      .limit(limit)
      .get()
      .then(response => {
        const comments = normalizeComments(response.docs);

        return comments;
      });
  }
  return fetchMethods[params.type]({ param: params.param })
    .limit(limit)
    .get()
    .then(response => {
      const comments = normalizeComments(response.docs);
      return comments;
    });
}

export function normalizeComments(comments) {
  if (Array.isArray(comments)) {
    let arr = [];
    comments.forEach(comment => {
      let comment_obj = commentFactory.createComment({ data: comment });
      arr.push({ ...comment_obj });
    });
    return arr;
  }
  const comment = commentFactory.createComment({ data: comments });
  return comment;
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

export function deleteComments(ids) {
  return Promise.all(ids.map(id => deleteComment(id)));
}
